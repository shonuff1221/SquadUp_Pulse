// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.0;
import "./IERC20.sol";


contract Percentage {
    uint256 public baseValue = 100;

    function onePercent(uint256 _value) internal view returns (uint256) {
        uint256 roundValue = SafeMath.ceil(_value, baseValue);
        uint256 Percent = SafeMath.div(
            SafeMath.mul(roundValue, baseValue),
            10000
        );
        return Percent;
    }
}

contract SQP_Staking is Percentage {
    using SafeMath for uint256;

    uint256 public constant INVEST_MIN_AMOUNT = 0.05 ether;
    uint256[] public REFERRAL_PERCENTS = [50, 25, 5];    
    uint256 public constant PERCENT_STEP = 5;
    uint256 public constant PERCENTS_DIVIDER = 1000;
    uint256 public constant TIME_STEP = 1 days;
    uint256 public constant withDrawFee = 5;
    SquadUp_Pulse public token;
    uint256 public totalStaked;
    uint256 public totalRefBonus;

    struct Plan {
        uint256 time;
        uint256 percent;
    }

    Plan[] internal plans;

    struct Deposit {
        uint8 plan;
        uint256 percent;
        uint256 amount;
        uint256 profit;
        uint256 start;
        uint256 finish;
    }

    struct User {
        Deposit[] deposits;
        uint256 checkpoint;
        address referrer;
        uint256[3] levels;
        uint256 bonus;
        uint256 totalBonus;
        uint256 lastDepositTime;
        uint256 lastWithdrawTime;
    }

    mapping(address => User) internal users;

    uint256 public startUNIX;
    address payable public commissionWallet;

    event Newbie(address user);
    event NewDeposit(
        address indexed user,
        uint8 plan,
        uint256 percent,
        uint256 amount,
        uint256 profit,
        uint256 start,
        uint256 finish
    );
    event Withdrawn(address indexed user, uint256 amount);
    event RefBonus(
        address indexed referrer,
        address indexed referral,
        uint256 indexed level,
        uint256 amount
    );
    event FeePayed(address indexed user, uint256 totalAmount);

    constructor(
        SquadUp_Pulse _token,
        address payable wallet,
        uint256 startDate
    ) public {
        require(!isContract(wallet));
        require(startDate > 0);
        commissionWallet = wallet;
        startUNIX = startDate;
        token = _token;
        plans.push(Plan(1, 1170));
        plans.push(Plan(3, 450));
        plans.push(Plan(7, 400));
        plans.push(Plan(14, 420));
        plans.push(Plan(21, 429));
        plans.push(Plan(28, 430));
    }

    function invest(
        address referrer,
        uint8 plan,
        uint256 _numberOfToken
    ) public {
        require(startUNIX <= now, "Contract hasn't started yet");
        require(
            _numberOfToken >= INVEST_MIN_AMOUNT,
            "Minimum amount is 0.05 SQP"
        );
        require(plan < 6, "Invalid plan");
        require(
            token.balanceOf(msg.sender) >= _numberOfToken,
            "Insufficient Tokens"
        );
        token.transferFrom(msg.sender, address(this), _numberOfToken);
        User storage user = users[msg.sender];

        if (user.referrer == address(0)) {
            if (users[referrer].deposits.length > 0 && referrer != msg.sender) {
                user.referrer = referrer;
            }

            address upline = user.referrer;
            for (uint256 i = 0; i < 3; i++) {
                if (upline != address(0)) {
                    users[upline].levels[i] = users[upline].levels[i].add(1);
                    upline = users[upline].referrer;
                } else break;
            }
        }

        if (user.referrer != address(0)) {
            address upline = user.referrer;
            for (uint256 i = 0; i < 3; i++) {
                if (upline != address(0)) {
                    uint256 amount = _numberOfToken
                        .mul(REFERRAL_PERCENTS[i])
                        .div(PERCENTS_DIVIDER);
                    users[upline].bonus = users[upline].bonus.add(amount);
                    users[upline].totalBonus = users[upline].totalBonus.add(
                        amount
                    );
                    emit RefBonus(upline, msg.sender, i, amount);
                    upline = users[upline].referrer;
                } else break;
            }
        }

        if (user.deposits.length == 0) {
            user.checkpoint = block.timestamp;
            emit Newbie(msg.sender);
        }

        (uint256 percent, uint256 profit, uint256 finish) = getResult(
            plan,
            _numberOfToken
        );
        user.deposits.push(
            Deposit(
                plan,
                percent,
                _numberOfToken,
                profit,
                block.timestamp,
                finish
            )
        );

        totalStaked = totalStaked.add(_numberOfToken);
        emit NewDeposit(
            msg.sender,
            plan,
            percent,
            _numberOfToken,
            profit,
            block.timestamp,
            finish
        );
    }

    function withdraw() public {
        require(
            now >= users[msg.sender].lastDepositTime + 1 days,
            "one Withdraw per 24 hours"
        );
        User storage user = users[msg.sender];

        uint256 totalAmount = getUserDividends(msg.sender);

        uint256 referralBonus = getUserReferralBonus(msg.sender);
        if (referralBonus > 0) {
            user.bonus = 0;
            totalAmount = totalAmount.add(referralBonus);
        }

        require(totalAmount > 0, "User has no dividends");

        uint256 contractBalance = token.balanceOf(address(this));
        if (contractBalance < totalAmount) {
            totalAmount = contractBalance;
        }

        user.checkpoint = block.timestamp;
        uint256 contractFee = SafeMath.mul(
            withDrawFee,onePercent(totalAmount)
        );
        uint256 totalPayouts = SafeMath.sub(totalAmount, contractFee);
        token.transfer(msg.sender, totalPayouts);
        users[msg.sender].lastWithdrawTime = now;
        users[msg.sender].lastDepositTime = now;
        emit Withdrawn(msg.sender, totalAmount);
    }

    function getContractBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getPlanInfo(
        uint8 plan
    ) public view returns (uint256 time, uint256 percent) {
        time = plans[plan].time;
        percent = plans[plan].percent;
    }

    function getIncrement(
        uint256 _totalContractBalance
    ) internal pure returns (uint256) {
        uint256 getActualValue = (_totalContractBalance / 10 ** 18) / 1000;
        return getActualValue;
    }

    function getPercent(uint8 plan) public view returns (uint256) {
        uint256 increment = getIncrement(getContractBalance());
        return (plans[plan].percent + increment);
    }

    function getResult(
        uint8 plan,
        uint256 deposit
    ) public view returns (uint256 percent, uint256 profit, uint256 finish) {
        percent = getPercent(plan);

        profit = deposit.mul(percent).div(PERCENTS_DIVIDER).mul(
            plans[plan].time
        );
        finish = block.timestamp.add(plans[plan].time.mul(TIME_STEP));
    }

    function getUserDividends(
        address userAddress
    ) public view returns (uint256) {
        User storage user = users[userAddress];

        uint256 totalAmount;

        for (uint256 i = 0; i < user.deposits.length; i++) {
            if (user.checkpoint < user.deposits[i].finish) {
                uint256 share = user
                    .deposits[i]
                    .amount
                    .mul(user.deposits[i].percent)
                    .div(PERCENTS_DIVIDER);
                uint256 from = user.deposits[i].start > user.checkpoint
                    ? user.deposits[i].start
                    : user.checkpoint;
                uint256 to = user.deposits[i].finish < block.timestamp
                    ? user.deposits[i].finish
                    : block.timestamp;
                if (from < to) {
                    totalAmount = totalAmount.add(
                        share.mul(to.sub(from)).div(TIME_STEP)
                    );
                }
            }
        }

        return totalAmount;
    }

    function getUserCheckpoint(
        address userAddress
    ) public view returns (uint256) {
        return users[userAddress].checkpoint;
    }

    function getUserWithdrawTime(
        address userAddress
    ) public view returns (uint256) {
        return users[userAddress].lastWithdrawTime;
    }

    function getUserReferrer(
        address userAddress
    ) public view returns (address) {
        return users[userAddress].referrer;
    }

    function getUserDownlineCount(
        address userAddress
    ) public view returns (uint256, uint256, uint256) {
        return (
            users[userAddress].levels[0],
            users[userAddress].levels[1],
            users[userAddress].levels[2]
        );
    }

    function getUserReferralBonus(
        address userAddress
    ) public view returns (uint256) {
        return users[userAddress].bonus;
    }

    function getUserReferralTotalBonus(
        address userAddress
    ) public view returns (uint256) {
        return users[userAddress].totalBonus;
    }

    function getUserReferralWithdrawn(
        address userAddress
    ) public view returns (uint256) {
        return users[userAddress].totalBonus.sub(users[userAddress].bonus);
    }

    function getUserAvailable(
        address userAddress
    ) public view returns (uint256) {
        return
            getUserReferralBonus(userAddress).add(
                getUserDividends(userAddress)
            );
    }

    function getUserAmountOfDeposits(
        address userAddress
    ) public view returns (uint256) {
        return users[userAddress].deposits.length;
    }

    function getUserTotalDeposits(
        address userAddress
    ) public view returns (uint256 amount) {
        for (uint256 i = 0; i < users[userAddress].deposits.length; i++) {
            amount = amount.add(users[userAddress].deposits[i].amount);
        }
    }

    function getUserDepositInfo(
        address userAddress,
        uint256 index
    )
        public
        view
        returns (
            uint8 plan,
            uint256 percent,
            uint256 amount,
            uint256 profit,
            uint256 start,
            uint256 finish
        )
    {
        User storage user = users[userAddress];

        plan = user.deposits[index].plan;
        percent = user.deposits[index].percent;
        amount = user.deposits[index].amount;
        profit = user.deposits[index].profit;
        start = user.deposits[index].start;
        finish = user.deposits[index].finish;
    }

    function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;

        return c;
    }

    function ceil(uint256 a, uint256 m) internal pure returns (uint256) {
        uint256 c = add(a, m);
        uint256 d = sub(c, 1);
        return mul(div(d, m), m);
    }
}
