$(document).ready(function() {

	window.addEventListener('load', async function () {
		await ethereum.request( {method: 'eth_requestAccounts'} )
		ethereum.request({ method: 'eth_accounts' }).then(function (result) {
			account = result[0]
			getTokenStats()
			console.log("User wallet: " + account)
			$('#walletConnet')[0].innerHTML = '0x' + result[0].slice(2, 5) + '...' + result[0].slice(42 - 5)
			web3 = new Web3(window.web3.currentProvider)
		})
		if(account != undefined){
            runFarm()

        }
		else 
			beginLogins()
	})
})

let attempts = 0
async function beginLogins(){
	await ethereum.request({method: 'eth_requestAccounts'})
	await userLoginAttempt()
	setTimeout(() => {
		if(account == undefined && attempts < 3){
			setTimeout(() => {
				if(account == undefined && attempts < 3){
					attempts++
					beginLogins()
				}
			}, 300)
		}
	}, 300)
}

let web3
let loginInt
async function userLoginAttempt(){
	await ethereum.request({method: 'eth_requestAccounts'})
	ethereum.request({ method: 'eth_accounts' }).then(function (result) {
		account = result[0]
		getTokenStats()
		$('#walletConnet')[0].innerHTML = '0x' + result[0].slice(2, 5) + '...' + result[0].slice(42 - 5)
		web3 = new Web3(window.web3.currentProvider)
        runFarm()
	})
	loginInt = setInterval(async () => {
		ethereum.request({ method: 'eth_accounts' }).then(function (result) {
			if (window.ethereum && account !== result[0]) location.reload()
		})
	}, 5000)

}

function runFarm(){
    initFarmContracts()
}

async function getTokenStats(){
    await autoContract(true)
    await (sqdContract = new web3.eth.Contract(sqdABI, sqd))    
    getUserBalance()
}
