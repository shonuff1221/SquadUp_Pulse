
function runDash(){
	getTokenCounts()
	getRefCount()
	let p2 = user.address.slice(42 - 5)
	$('#walletConnet')[0].innerHTML = user.address.slice(0, 4) + "..." + p2
	setTimeout(() => {
		runDash()
	}, 10000)
}

async function getTokenCounts(){
	totalTokens = await tokenContract.methods.totalSupply().call() / 1e18
	$('.total-tokens')[0].innerHTML = abrNum(totalTokens, 2)
	
	circulatingTokens = await tokenContract.methods.totalSupply().call() / 1e18
	
	tokenBuyPrice = await tokenContract.methods.calculateTokensReceived(toHexString(1e18)).call() / 1e18
	tokenSellPrice = await tokenContract.methods.calculateEthereumReceived(toHexString(1e18)).call() / 1e18
	
	$('.token-buy-price')[0].innerHTML = "1 Pulse = " + abrNum(tokenBuyPrice, 4) +" SQUAD"
	// if(circulatingTokens > 0)
	// 	$('.token-sell-price')[0].innerHTML = abrNum(tokenSellPrice/1e18, 4) +" SqdUp Tokens : 1 BNB"
	// else
	// 	$('.token-sell-price')[0].innerHTML = ''
	
	userTokens = await tokenContract.methods.balanceOf(user.address).call() / 1e18
	$('.user-tokens')[0].innerHTML = abrNum(userTokens,2)
	
}
async function buyToken(){
	console.log("refferal",user.ref);
	let ref
	if(validateErcAddress(user.ref))
		ref = user.ref
	else if(user.ref == user.address)
		ref = zeroAddress
	else 
		ref = zeroAddress
	
	let amount = toHexString( $('.buy-token-input')[0].value * 1e18 )
	await tokenContract.methods.buy(ref).send({
		from: user.address,
		value: amount,
		gasLimit:210000
	}).then(res => {
		console.log(res)
		getTokenCounts()
		alert("Bought " + res.events.Transfer.returnValues.tokens/1e18 +' tokens\n for '+amount/1e18+ ' PULSE')
		console.log(res)
	})
}
async function getBuyOutput(){
	let amount = $('.buy-token-input')[0].value
	let tokens = abrNum( await tokenContract.methods.calculateTokensReceived(toHexString(amount*1e18)).call() / 1e18, 2)
	$('.buy-button-text')[0].innerHTML = 'Buy ' + (tokens) + ' Tokens<br> for '+ amount +' PULSE'
}
let bnbPurchased
async function getSellOutput(){
	let amount = $('.sell-token-input')[0].value
	bnbPurchased = abrNum( (await tokenContract.methods.calculateEthereumReceived(toHexString(amount*1e18)).call() / 1e18), 2)
	$('.sell-button-text')[0].innerHTML = 'Sell ' + amount + ' Tokens<br> for '+ (bnbPurchased) +' PULSE'
}
async function sellToken(){
	let bnb = bnbPurchased
	let amount = toHexString( $('.sell-token-input')[0].value * 1e18 )
	await tokenContract.methods.sell(amount).send({
		from: user.address,
		gasLimit:210000
	}).then(res => {
		console.log(res)
		getTokenCounts()
		alert("Sold " + res.events.Transfer.returnValues.tokens/1e18 +' tokens for '+bnb+ ' PULSE')
		console.log(res)
	})
}
async function getRefCount(){
	let refCount = await stakeContract.methods.getUserDownlineCount(user.address).call()
	$('.ref-count')[0].innerHTML = "Level 1: " + refCount[0]
	$('.ref-count')[1].innerHTML = "Level 2: " + refCount[1]
	$('.ref-count')[2].innerHTML = "Level 3: " + refCount[2]
}