async function autoContract(isFarmPage) {
		const HttpProvider = Web3.providers.HttpProvider;
		const fullNode = new HttpProvider(networkURL);
		const solidityNode = new HttpProvider(networkURL);
		const eventServer = new HttpProvider(networkURL);
		
		let web3 = new Web3(fullNode, solidityNode, eventServer)
		
		for(let i = 0; i < pools.length; i++){
			await (pools[i].contract = new web3.eth.Contract(pools[i].ABI, pools[i].addr))
		}	
		
		await (farmAuto = new web3.eth.Contract(farmABI, farmAddress))
		await (sqdAuto = new web3.eth.Contract(sqdABI, sqd))
		await (wbnbAuto = new web3.eth.Contract(wbnbABI, wbnb))
		await (busdAuto = new web3.eth.Contract(wbnbABI, busd))
		
		await (sqdBnbAuto = new web3.eth.Contract(sqdBnbABI, sqdBnbAddress))
		await (sqdBusdAuto = new web3.eth.Contract(sqdBusdABI, sqdBusdAddress))

        //await (priceFeed = new web3.eth.Contract(priceFeedABI, priceFeedAddress))
		
		await (pancakeContract = new web3.eth.Contract(pancakeABI, pancakeAddress))
		

			await getPrices()
			await getSupply()
			for(let i = 0; i < pools.length; i++){
				if(isFarmPage)
					getPoolSqdPerDay(i)
				autoBalances(i)
			}
}
function toHexString(number){
	return '0x'+number.toString(16)
}

function refreshStats(){
	getPrices()
	for(let i = 0; i < pools.length; i++){
		autoBalances(i)
	}
	setTimeout(() => {
		refreshStats()
	}, 1000 * 5)
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
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power

    return e;
}

let currentBnbPriceToUsd
let currentSqdToBnb
let currentBusdToSqd
async function getPrices(){
	let resSqdBnb = await sqdBnbAuto.methods.getReserves().call()

	let resSqdBusd = await sqdBusdAuto.methods.getReserves().call()
	//let roundData = await priceFeed.methods.latestRoundData().call()
	currentBnbPriceToUsd = 350 //roundData.answer / 1e8
	currentSqdToBnb = await pancakeContract.methods.quote(toHexString(1e18), resSqdBnb._reserve0, resSqdBnb._reserve1).call() / 1e18
	currentSqdPrice = (currentBnbPriceToUsd * currentSqdToBnb)
	console.log(currentSqdPrice)

	currentBusdToSqd = await pancakeContract.methods.getAmountOut(toHexString(1e18), resSqdBusd._reserve0, resSqdBusd._reserve1).call() / 1e18
	//$('.sqd-busd-price')[0].innerHTML = ' ~$'+(1e6*currentBusdToSqd).toFixed(2)
	//$('.sqd-bnb-price')[0].innerHTML = ' ~'+abrNum(currentSqdPrice, 2)+' SQD'
}

let totalSupply
let totalAlloc
async function getSupply(){
	totalSupply = await sqdAuto.methods.totalSupply().call() / 1e18
	console.log(totalSupply)

	farm.farmableSqd = (await farmAuto.methods.farmableSqd().call() / 1e18)
	farm.sqdPerDay = await farmAuto.methods.calcSqdPerDay().call() / 1e18
	$('.total-sqd-per-day')[0].innerHTML = abrNum(farm.sqdPerDay, 6) + " Farmable SQD Per Day"
	if($('.total-sqd-per-day')[1] != undefined)
		$('.total-sqd-per-day')[1].innerHTML = abrNum(farm.sqdPerDay, 6) + "Farmable SQD Per Day"
	
	totalAlloc = await farmAuto.methods.totalAllocPoint().call()
}
async function getPoolSqdPerDay(pid){
	let poolAlloc = (await farmAuto.methods.poolInfo(pid).call()).allocPoint
	
	let poolSqdPerDay = farm.sqdPerDay * (poolAlloc / totalAlloc)
	$('.sqd-per-day-'+pid)[0].innerHTML = abrNum(poolSqdPerDay, 0)
}
let rewardPerYear
async function autoBalances(pid){
	let contract = pools[pid].contract
	rewardPerYear = parseInt(await farmAuto.methods.sqdPerBlock().call()) * 20 * 60 * 24 * 365 / 1e18
	
	pools[pid].lpInFarm = parseInt(await contract.methods.balanceOf(farmAddress).call())
	pools[pid].totalSupply = parseInt(await contract.methods.totalSupply().call())
		
    //pools[pid].apy = (rewardPerYear / ( 2 * (pools[pid].lpInFarm / pools[pid].totalSupply) * pools[pid].sqdBal) * 100).toFixed(2) + '%'

	if(pid < 2){
		pools[pid].sqdBal = parseInt(await sqdAuto.methods.balanceOf(pools[pid].addr).call()) / 1e18
		pools[pid].apy = (rewardPerYear / ( 2 * (pools[pid].lpInFarm / pools[pid].totalSupply) * pools[pid].sqdBal) * 100).toFixed(2) + '%'
		//$('.pool-apy-'+pid)[0].innerHTML = '' +pools[pid].apy
	}
	if(pid > 1){
		pools[pid].sqdBal = (parseInt(await sqdAuto.methods.balanceOf(pools[pid].addr).call()) - parseInt(farm.farmableSqd)) / 1e18
		pools[pid].apy = (rewardPerYear / ( 2 * (pools[pid].lpInFarm / pools[pid].totalSupply) * pools[pid].sqdBal) * 100).toFixed(2) + '%'
		//$('.pool-apy-'+pid)[0].innerHTML = '' +pools[pid].apy
	}

	let poolAllocs = await farmAuto.methods.getPoolPercent(pid).call()
	pools[pid].poolAllocPercent = ((poolAllocs.poolAlloc / poolAllocs.totalAlloc)*100).toFixed(2)+'%'

	let fees = await farmAuto.methods.getPoolFees(pid).call()
	pools[pid].entryFee = 'Entry Fee: ' + fees._entryFee +'%'
	pools[pid].exitFee = 'Exit Fee: ' + fees._exitFee +'%'
    getLiqTotals(pid)
}
function getLiqTotals(pid){
	if(pid == 0)
		getSqdBnbLiq(pid)
	if(pid == 1)
		getSqdBusdLiq(pid)
	if(pid == 2)
		getSqdStuff(pid)	
}
async function getSqdBnbLiq(pid){
	let token0Pool = await sqdAuto.methods.balanceOf(pools[pid].addr).call() / pools[pid].token0Dec
	let token1Pool = await wbnbAuto.methods.balanceOf(pools[pid].addr).call() / pools[pid].token1Dec
			
	let total = (currentBusdToSqd * token0Pool) + (currentBnbPriceToUsd * token1Pool)
	pools[pid].lpTokenValueTotal = total
	pools[pid].totalLiqInFarm = ( total * (pools[pid].lpInFarm) / (pools[pid].totalSupply) ).toFixed(2)
	
	//$('.pool-liq-'+pid)[0].innerHTML = "" + pools[pid].totalLiqInFarm+'$'
	$('.total-pool-liq-'+pid)[0].innerHTML = "" + pools[pid].lpTokenValueTotal.toFixed(2)+'$'
}
async function getSqdBusdLiq(pid){
	let token0Pool = await sqdAuto.methods.balanceOf(pools[pid].addr).call() / pools[pid].token0Dec
	let token1Pool = await busdAuto.methods.balanceOf(pools[pid].addr).call() / pools[pid].token1Dec
		
	let total = ( (currentBusdToSqd*token0Pool + token1Pool) )
	pools[pid].lpTokenValueTotal = total
	pools[pid].totalLiqInFarm = ( total * (pools[pid].lpInFarm) / (pools[pid].totalSupply) ).toFixed(2)
	
	//$('.pool-liq-'+pid)[0].innerHTML = "" + pools[pid].totalLiqInFarm+'$'
	$('.total-pool-liq-'+pid)[0].innerHTML = "" + pools[pid].lpTokenValueTotal.toFixed(2)+'$'
}
async function getSqdStuff(pid){
	
	pools[pid].apy = (rewardPerYear / ( (pools[pid].lpInFarm / totalSupply) * pools[pid].sqdBal) * 100).toFixed(2) + '%'

	let total = currentSqdPrice*totalSupply
	
	pools[pid].lpTokenValueTotal = total
	pools[pid].totalLiqInFarm = ( total * ( pools[pid].lpInFarm - (farm.farmableSqd) ) / totalSupply ).toFixed(2)
	
	//$('.pool-liq-'+pid)[0].innerHTML = "" + pools[pid].totalLiqInFarm+'$'
	$('.total-pool-liq-'+pid)[0].innerHTML = "" + pools[pid].lpTokenValueTotal.toFixed(2)+'$'
}
