

var nextWithdraw = 0
async function startUp(){
	checkAllowance()
	$('#reflink')[0].innerHTML = thisURL+"/?ref="+ user.address;
	contractBalances()
	planPercents()
	await getTotalNumberOfDeposits()
	getUserDepositInfo()
	getUserReferrer()
	getUserCheckpoint()
	getUserReferralTotalBonus()
	getUserDownlineCount()
	getUserTotalDeposits()
	getUserAvailable()
	getUserReferralWithdrawn()
	getUserReferralBonus()
	getUserWithdrawTime()
	 
	$('.contract-address')[0].innerHTML = `<a class="btn btn-sm btn-primary display-5" href="https://goerli.etherscan.io/address/`+stakeContractAddress+`" target="_blank"><br>Contract Address\n` + stakeContractAddress + `</a></div>`

	let p2 = user.address.slice(42 - 5)
	
	$('#walletConnet')[0].innerHTML = user.address.slice(0, 4) + "..." + p2
	setTimeout(() => {
		startUp()
	}, 10000)
}

async function stake(planId){
	let tokens = 0
	let ref
	if(validateErcAddress(user.ref))
		ref = user.ref
	else if(user.ref == user.address)
		ref = zeroAdddress
	else 
		ref = zeroAddress
	
	let stakeAmount = toHexString($('#plan'+(planId+1)+'amount')[0].value * 1e18)
  	await stakeContract.methods.invest(ref, planId, stakeAmount).send({
		from: user.address
	}).then(res => {
		alert( 'TX Hash\n https://goerli.etherscan.io/tx/'+res.blockHash+ '\nReferrer\n'+ref );
		getTotalNumberOfDeposits()
		getUserDepositInfo()
		console.log(res)
		//$("#investId").text(res);
	})
}
  
$('#withdraw').on('click', function() {      
  return new Promise(async (resolve, reject) => {
		stakeContract.methods.withdraw().send({
			from:user.address
		}).on("transactionHash", async (hash) => {
			//console.log("transactionHash: ", hash);
			$("#withDrawId").text(hash);
		}).then(getUserDividends())
  })
});
  //Read Function
  async function getUserDividends() {
    
    return new Promise(async (resolve, reject) => {
      let reward=await stakeContract.methods.getUserDividends(user.address).call();
      $("#getUserDividends").text("Dividend:" +web3.utils.fromWei(reward),"ether"+"  "+ "SQP");
    })}
    async function getPercent() {
      let planId=$("#getPercentPlanId").val();
      
      return new Promise(async (resolve, reject) => {
        let percent=await stakeContract.methods.getPercent(planId).call();
        $("#percentage").text("percentage:" +percent/100+"%(Per Day)");
      })
}
let totalUserDeposits
async function getTotalNumberOfDeposits() {
    totalUserDeposits = await stakeContract.methods.getUserAmountOfDeposits(user.address).call();
    $("#TotalNumberOfDeposits").text("Total: "+totalUserDeposits);
}
async function getUserWithdrawTime() {
    lastWithdrawTime = await stakeContract.methods.getUserWithdrawTime(user.address).call();
	nextWithdraw = parseInt(lastWithdrawTime) + 86400;
	getWithdrawTimer();
	console.log("withdraw time",lastWithdrawTime);
}
async function getUserAvailable() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserAvailable(user.address).call();
    dataTrunc = data / 1e18;
    //console.log("available",data);
    $("#getUserAvailable").text(abrNum(dataTrunc, 4)+" "+"SQP");
  })
}
async function getUserReferralBonus() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserReferralBonus(user.address).call();
	dataTrunc = data / 1e18;
    //console.log("data",data);
    $("#getUserReferralBonus").text(abrNum(dataTrunc, 4)+" "+"SQP");
  })
}
async function getUserReferralWithdrawn() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserReferralWithdrawn(user.address).call();
	dataTrunc = data / 1e18;
    //console.log("data",data);
    $("#getUserReferralWithdrawn").text(abrNum(dataTrunc, 4)+" "+"SQP");
  })
}
async function getUserTotalDeposits() {
    let depositData = await stakeContract.methods.getUserTotalDeposits(user.address).call();
	depositDataTrunc = depositData / 1e18;
    //console.log("depositTotal",depositData);
    $("#getUserTotalDeposits").text(abrNum(depositDataTrunc, 4)+" "+"SQP");
	userTokens = await tokenContract.methods.balanceOf(user.address).call() / 1e18;
	$("#user-tokens").text(abrNum(userTokens,2)+" "+"SQP");
}
async function getUserDownlineCount() {
  
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserDownlineCount(user.address).call();
    //console.log("Downline",data);
    downline= $('#getUserDownlineCount')[0].innerHTML = parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]);
    
    $("#getUserDownlineCountIndex1").text("uint:" +data[0]);
    $("#getUserDownlineCountIndex2").text("uint:" +data[1]);
    $("#getUserDownlineCountIndex3").text("uint:" +data[2]);
  })
}
async function getUserDepositInfo() {
	
	$('.active-stakes')[0].innerHTML = `
	<tr class="container-fluid overflow:auto;">
	
	
</tr>
	`
	for(let i = 0; i < totalUserDeposits; i++){
		let data = await stakeContract.methods.getUserDepositInfo(user.address, i).call();
		let now = new Date().getTime();
		let isFinished = false;
		let start = (new Date(data[4] * 1000).getMonth()+1) +'/'+ new Date(data[4] * 1000).getDate() 
		let end = (new Date(data[5] * 1000).getMonth()+1) +'/'+ new Date(data[5] * 1000).getDate() +" @ "+ new Date(data[5] * 1000).getHours() +":"+ new Date(data[5] * 1000 / 60 * 60).getMinutes()
		const stakeEnd = data[5] *1000;		
		let distance = parseInt(stakeEnd) - parseInt(now);
		
		if (distance <= 0 ) {
			isFinished = "Completed";
	   } else {
			isFinished ="Still Collecting";
	   }		
		
		try {
			let newRow = `
		<tr class="container-fluid">
				<td data-cell="Plan" colspan="3"id="getUserDepositInfo1" style="" class="mbr-content-title mbr-light mbr-fonts-style display-me">${parseInt(data[0])+1}</td>
				<td data-cell="Percent" colspan="3"id="getUserDepositInfo2" style="" class="mbr-content-title mbr-light mbr-fonts-style display-me">${data[1]/10+"%"}</td>
				<td data-cell="Amount"colspan="3"id="getUserDepositInfo3" style="" class="mbr-content-title mbr-light mbr-fonts-style display-me">${web3.utils.fromWei(data[2], "ether")}</td>
				<td data-cell="Profit"colspan="3"id="getUserDepositInfo4" style="" class="mbr-content-title mbr-light mbr-fonts-style display-me">${web3.utils.fromWei(data[3], "ether")}</td>
				<td data-cell="Start"colspan="3"id="getUserDepositInfo5" style="" class="mbr-content-title mbr-light mbr-fonts-style display-me">${start}</td>
				<td data-cell="Finish"colspan="3"id="getUserDepositInfo6" style=""class="mbr-content-title mbr-light mbr-fonts-style display-me">${end}</td>
				<td data-cell="Status"colspan="3"id="isFinished" style="color:#fff;"class="mbr-content-title mbr-light mbr-fonts-style display-me">${isFinished}</td>
			</tr>
		`
		$('.active-stakes')[0].innerHTML += newRow;
			
		} catch (error) {
			alert(error);
		}
	}	
}

async function getUserReferrer() {
  
  return new Promise(async (resolve, reject) => {
    let data = await stakeContract.methods.getUserReferrer(user.address).call();
    $("#getUserReferrerAddress").text("refferer:" +data);
  })
}
async function getUserCheckpoint() {
  return new Promise(async (resolve, reject) => {
    let data=await stakeContract.methods.getUserCheckpoint(user.address).call();
    $("#getUserCheckpointdata").text("getUserCheckpoint:" +data);
    checkpoint = data;
  })
}
async function getUserReferralTotalBonus() {
  
  return new Promise(async (resolve, reject) => {
    let dataFull = (await stakeContract.methods.getUserReferralTotalBonus(user.address).call() / 1e18);
	let data = abrNum(dataFull, 4)
    $("#getUserReferralTotalBonus").text(data+" "+"SQP");
  })
}
 
function copyToClipboard(reflink) {
	var aux = document.createElement("input");
	aux.setAttribute("value", document.getElementById(reflink).innerHTML);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	alert("Copied");
}

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges()
    } else if (document.selection) {
        document.selection.empty()
    }
}
async function contractBalances(){
	console.log(web3)
	let contractBalanceFull = (await web3.eth.getBalance(tokenAddress) / 1e18)
	let contractBalance = abrNum(contractBalanceFull, 4)
	$('#balanceContract').text(contractBalance)
	let totalStakedFull = (await stakeContract.methods.totalStaked().call() / 1e18)
	let totalStaked = abrNum(totalStakedFull, 4)
	$('#totalStaked').text(totalStaked)
}
async function planPercents() {
	var plans = []
	for(let i = 0; i < 6; i++){
		plans[i] = {
			percent: 0,
			totalPercent: 0,
			day: 0,
			depositAmount: 0,
			total: 0
		}
		let percent = await stakeContract.methods.getPercent(i).call()
		$('#plan'+(i+1)+'Percent')[0].innerHTML = parseFloat(percent/10)+ "%";
		plans[i].percent = percent/10;
		let c = await stakeContract.methods.getPlanInfo(i).call()                   
		plans[i].totalPercent = $('#plan'+(i+1)+'TPercent')[0].innerHTML = (c.time * plans[i].percent).toFixed(2);
		plans[i].day = $('#plan'+(i+1)+'Day')[0].innerHTML = c.time;
		
		plans[i].depositAmount = $('#plan'+(i+1)+'amount').on('input', function(){
			amount = this.value * plans[i].totalPercent / 100
			$('#plan'+(i+1)+'Total')[0].innerHTML = (parseFloat(amount)).toFixed(3);
		});
	}
}
setTimeout(getWithdrawTimer,500);
function getWithdrawTimer() {

	const timeEnd = parseInt(nextWithdraw);
	const milliseconds = timeEnd * 1000 // 1606073880000
	//console.log("timer time",milliseconds);
	
	var x = setInterval(function () {
	  var now = new Date().getTime();
	  var distance = milliseconds - now;
	  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	  document.getElementById('withdrawTimer').innerHTML = "Withdraw in: "+hours + "h " + minutes + "m " + seconds + "s ";
	
	  if (distance < 0) {
		clearInterval(x);
		document.getElementById('withdrawTimer').innerHTML = "Withdraw SQP";
	  }
	
	}, 1000);
	}
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