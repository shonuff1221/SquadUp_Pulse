const tokenABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"incomingEthereum","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensMinted","type":"uint256"},{"indexed":true,"internalType":"address","name":"referredBy","type":"address"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokensBurned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"ethereumEarned","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"customerAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethereumWithdrawn","type":"uint256"}],"name":"onWithdraw","type":"event"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"administrators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"basePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_referredBy","type":"address"}],"name":"buy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokensToSell","type":"uint256"}],"name":"calculateEthereumReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_incomingEthereum","type":"uint256"}],"name":"calculateTokensReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disableInitialStage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"onlyAmbassadors","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_identifier","type":"bytes32"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"setAdministrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEthereumBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const mainABI =[ { "type": "constructor", "name": "", "inputs": [ { "type": "address", "name": "_token", "internalType": "contract SquadUp_Pulse" }, { "type": "address", "name": "wallet", "internalType": "address payable" }, { "type": "uint256", "name": "startDate", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "event", "name": "FeePayed", "inputs": [ { "type": "address", "name": "user", "indexed": true, "internalType": "address" }, { "type": "uint256", "name": "totalAmount", "indexed": false, "internalType": "uint256" } ], "outputs": [], "anonymous": false }, { "type": "event", "name": "NewDeposit", "inputs": [ { "type": "address", "name": "user", "indexed": true, "internalType": "address" }, { "type": "uint8", "name": "plan", "indexed": false, "internalType": "uint8" }, { "type": "uint256", "name": "percent", "indexed": false, "internalType": "uint256" }, { "type": "uint256", "name": "amount", "indexed": false, "internalType": "uint256" }, { "type": "uint256", "name": "profit", "indexed": false, "internalType": "uint256" }, { "type": "uint256", "name": "start", "indexed": false, "internalType": "uint256" }, { "type": "uint256", "name": "finish", "indexed": false, "internalType": "uint256" } ], "outputs": [], "anonymous": false }, { "type": "event", "name": "Newbie", "inputs": [ { "type": "address", "name": "user", "indexed": false, "internalType": "address" } ], "outputs": [], "anonymous": false }, { "type": "event", "name": "RefBonus", "inputs": [ { "type": "address", "name": "referrer", "indexed": true, "internalType": "address" }, { "type": "address", "name": "referral", "indexed": true, "internalType": "address" }, { "type": "uint256", "name": "level", "indexed": true, "internalType": "uint256" }, { "type": "uint256", "name": "amount", "indexed": false, "internalType": "uint256" } ], "outputs": [], "anonymous": false }, { "type": "event", "name": "Withdrawn", "inputs": [ { "type": "address", "name": "user", "indexed": true, "internalType": "address" }, { "type": "uint256", "name": "amount", "indexed": false, "internalType": "uint256" } ], "outputs": [], "anonymous": false }, { "type": "function", "name": "INVEST_MIN_AMOUNT", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "PERCENTS_DIVIDER", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "PERCENT_STEP", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "PROJECT_FEE", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "REFERRAL_PERCENTS", "inputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "TIME_STEP", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "baseValue", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "commissionWallet", "inputs": [], "outputs": [ { "type": "address", "name": "", "internalType": "address payable" } ], "stateMutability": "view" }, { "type": "function", "name": "getContractBalance", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getPercent", "inputs": [ { "type": "uint8", "name": "plan", "internalType": "uint8" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getPlanInfo", "inputs": [ { "type": "uint8", "name": "plan", "internalType": "uint8" } ], "outputs": [ { "type": "uint256", "name": "time", "internalType": "uint256" }, { "type": "uint256", "name": "percent", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getResult", "inputs": [ { "type": "uint8", "name": "plan", "internalType": "uint8" }, { "type": "uint256", "name": "deposit", "internalType": "uint256" } ], "outputs": [ { "type": "uint256", "name": "percent", "internalType": "uint256" }, { "type": "uint256", "name": "profit", "internalType": "uint256" }, { "type": "uint256", "name": "finish", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserAmountOfDeposits", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserAvailable", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserCheckpoint", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserDepositInfo", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" }, { "type": "uint256", "name": "index", "internalType": "uint256" } ], "outputs": [ { "type": "uint8", "name": "plan", "internalType": "uint8" }, { "type": "uint256", "name": "percent", "internalType": "uint256" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }, { "type": "uint256", "name": "profit", "internalType": "uint256" }, { "type": "uint256", "name": "start", "internalType": "uint256" }, { "type": "uint256", "name": "finish", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserDividends", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserDownlineCount", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "uint256", "name": "", "internalType": "uint256" }, { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserReferralBonus", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserReferralTotalBonus", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserReferralWithdrawn", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserReferrer", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "address", "name": "", "internalType": "address" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserTotalDeposits", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "amount", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "getUserWithdrawTime", "inputs": [ { "type": "address", "name": "userAddress", "internalType": "address" } ], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "invest", "inputs": [ { "type": "address", "name": "referrer", "internalType": "address" }, { "type": "uint8", "name": "plan", "internalType": "uint8" }, { "type": "uint256", "name": "_numberOfToken", "internalType": "uint256" } ], "outputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "startUNIX", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "token", "inputs": [], "outputs": [ { "type": "address", "name": "", "internalType": "contract SquadUp_Pulse" } ], "stateMutability": "view" }, { "type": "function", "name": "totalRefBonus", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "totalStaked", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "withDrawFee", "inputs": [], "outputs": [ { "type": "uint256", "name": "", "internalType": "uint256" } ], "stateMutability": "view" }, { "type": "function", "name": "withdraw", "inputs": [], "outputs": [], "stateMutability": "nonpayable" } ]

let network;
let connection;
let accounts;

const thisURL = window.location.origin.toString();

let Accounttype = "0";
const tokenAddress = "0xc3D62fe9a67B59AdF0bdd68bE05B2ce64683a520";
let tokenContract = undefined

const stakeContractAddress = "0xa2044a6d54a32B032e4b00E2B3eA36f01b290005";
let stakeContract = undefined

const zeroAddress = "0x1799dADA49693dA4aB9ec838aD29E00F704E8718"
const bscScan = "https://scan.v4.testnet.pulsechain.com/address/"+stakeContractAddress

let plan = {
	time:"time",
	percent:"percent"
}
let deposit = {
	plan: "plan",
	percent: "percent",
	amount: "amount",
	profit: "profit",
	start: "start",
	finish: "finish"
}

let user = {
	ref: undefined,
	deposits: 0,
	checkpoint: 0,
	address: '',
	levels: 0,
	bonus: "bonus",
	tBonus: "totalBonus"
};

let web3
let loginInt

$(document).ready(function() {
	createCookie()
	window.addEventListener('load', async function () {
		await ethereum.request( {method: 'eth_requestAccounts'} )
		ethereum.request({ method: 'eth_accounts' }).then(function (result) {
			
			user.address = result[0]
			//console.log("User wallet: " + user.address)
			$('.user-address')[0].innerHTML = 'Your Address: ' + user.address
			$('.user-address')[0].style.display = ''
			//$('.connect-button')[0].innerHTML = 'Connected!'
			web3 = new Web3(window.web3.currentProvider)
			initContract()
			
			loginInt = setInterval(async () => {
				ethereum.request({method: 'eth_requestAccounts'})
				ethereum.request({ method: 'eth_accounts' }).then(function (result) {
					if(user.address != result[0]){
						location.reload()
					}
				})
			}, 2000)
			
		})
		if(user.address == undefined)
			beginLogins()
	})
	$("#stakeContractAddress").effect("fade", 2500, function() {
		$("#stakeContractAddress").fadeIn();
		$("#stakeContractAddress").on('click',function() {
		window.open(bscScan);
		})
	});
	$("#tokenAddress").effect("fade", 2500, function() {
		$("#tokenAddress").fadeIn();
		$("#tokenAddress").on('click',function() {
		window.open(bscScan);
		})
	});
})
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))
let attempts = 0
async function beginLogins(){
	await ethereum.request({method: 'eth_requestAccounts'})
	window.web3 = new Web3(window.ethereum);
	await userLoginAttempt()
	setTimeout(() => {
		if(user.address == undefined && attempts < 3){
			setTimeout(() => {
				if(user.address == undefined && attempts < 3){
					attempts++
					beginLogins()
				}
			}, 300)
		}
	}, 300)
}
async function userLoginAttempt(){
	await ethereum.request({method: 'eth_requestAccounts'})
	window.web3 = new Web3(window.ethereum);	
	ethereum.request({ method: 'eth_accounts' }).then(function (result) {
		user.address = result[0]		
		$('.user-address')[0].style.display = ''
		location.reload()	
		getMm()
		initContract()
		
		loginInt = setInterval(async () => {
			ethereum.request({method: 'eth_requestAccounts'})
			ethereum.request({ method: 'eth_accounts' }).then(function (result) {
				if(user.address != result[0]) 
					location.reload()
		})
}, 2000)
		
	})
}
async function initContract(){
	try{
		await (stakeContract = new web3.eth.Contract(mainABI, stakeContractAddress))
		await (tokenContract = new web3.eth.Contract(tokenABI, tokenAddress))
		if(stakeContract != undefined){
			checkAllowance()
			//console.log("Contract "+stakeContractAddress+" loaded!")
			if(typeof startUp === 'function') 
				startUp()
			else if(typeof runDash === 'function')
				runDash()
			else
				console.log("wampwampwamp")
		}else{
			console.log('Error initiating contract.')
			setTimeout(() => {
				initContract()
			}, 2000)
		}
	}catch(e){
		console.log(e)
		setTimeout(() => {
			initContract()
		}, 2000)
	}
}
async function checkAllowance(){
	
	let allowance = await tokenContract.methods.allowance(user.address, stakeContractAddress).call()
	if(allowance < 1000000 * 1e18 )
		for(let i = 0; i < $('.invest').length; i++){
			if(typeof startUp === 'function'){
				$('.invest')[i].style.display = 'none'
				$('.approve')[i].style.display = ''
			}
			if(typeof runDash === 'function'){
				$('.sell-token-input')[0].style.display = "none"
				$('.sell-button')[i].onclick = 'approve()'
				$('.sell-button-text')[i].style.display = 'One-Time Approve'
			}
		}
	else
		for(let i = 0; i < $('.invest').length; i++){
			if(typeof startUp === 'function'){
				$('.approve')[i].style.display = 'none'
				$('.invest')[i].style.display = ''
			}
			if(typeof runDash === 'function'){
				$('.sell-token-input')[0].style.display = ""
				$('.sell-button')[i].onclick = 'sellToken()'
				$('.sell-button-text')[i].style.display = 'One-Time Approve'
			}
	}
	setTimeout(() => {
		checkAllowance()
	}, 5000)
}
async function approve(){
	await tokenContract.methods.approve(stakeContractAddress, toHexString(1000000 * 1e18)).send({
		from: user.address
	}).then(
		checkAllowance()
	)
}

function getMM(){
	if (user.address != undefined) {
		connection="Metamask is unlocked";
		$("#metamaskConnection").text(connection);
		window.web3.eth.getChainId((err, netId) => {
		  //console.log("networkId==>",netId);
		  switch (netId?.toString()) {
			
			  
					case "369":
						//console.log("This is the PulseChain network.");
						$("#network").text("This is the PulseChain network.");
						network = "PulseChain";
						break;
					case "943":
						//console.log("This is the PulseChain network.");
						$("#network").text("This is the PulseChain network.");
						network = "PulseChain Testnet";
						break;
			default:
			  //console.log("This is an unknown network.");
			  $("#network").text("This is the unknown test network.");
			  }
			});

	}else{
		connection="Metamask is locked";
		$("#metamaskConnection").text(connection);
	}
}

function isLocked() {
  window.web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
      //console.log(err);
      $("#lock").text(err);
    } else if (accounts.length === 0) {
      //console.log("MetaMask is locked");
      $("#lock").text("MetaMask is locked.");
    } else {
      //console.log("MetaMask is unlocked");
      $("#lock").text("MetaMask is unlocked.");
    }
  });
}

function getBalanceOfAccount() {
  window.web3.eth.getBalance(user.address, (err, wei) => {
    myBalance = web3.utils.fromWei(wei, 'ether')
    //console.log("Balance===>",myBalance);
    $("#getBalance").text("Account Balance:"+myBalance+" "+"BNB");
})
}

//Utility functions
function toHexString(number){
	return '0x'+number.toString(16)
}

function validateErcAddress(address) {
    if (typeof address !== 'string')
        return false;

    if (address[0] === "0" && address[1] === "x"&& address.length == 42)
        return true;

    return false;
}

function abrNum(_num, fixed) {
    let num = parseFloat(_num)
    if (num === null) {
        return null;
    } // terminate early
    if (num === 0) {
        return '0';
    } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k > 0 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c); // enforce -0 is 0
        e = d// + ['', 'K', 'M', 'B', 'T'][k]; // append power

    return e.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");;
}

//ACCESS COOKIE
function accessCookie(cookieName) {
    let name = cookieName + "=";
	let accessedCookie
    let allCookieArray = document.cookie.split(';');
    for (let i = 0; i < allCookieArray.length; i++) {
        let temp = allCookieArray[i].trim();
        if (temp.indexOf(name) == 0){
			accessedCookie = temp.substring(name.length, temp.length)
			if(validateErcAddress(accessedCookie))
				user.ref = accessedCookie
			//console.log("Referrer: " + user.ref)
		}
    }
}
//COOKIE CREATION
function createCookie() {
    if (window.location.href.indexOf("ref=") < 0) {
        user.ref = zeroAddress
    }else{
        const index = window.location.href.indexOf("ref=") + 4
		let ref = window.location.href.slice(index, index + 42)
		if(window.localStorage) {
			localStorage.setItem('referrerAddress', ref);
		}

		let date = new Date();
		date.setTime(date.getTime() + (10000 * 24 * 60 * 60 * 1000))
		document.cookie = "ref=" + ref + "; expires=" + date.toGMTString()
	}
	accessCookie("ref")
}