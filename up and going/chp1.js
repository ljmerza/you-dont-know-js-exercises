
const TAX_RATE = 0.07
const PHONE_PRICE = 50
const ADDON_PRICE = 5
const MAX_SPENDING = 320

var BANK_BAL = 1200


function totalPrice(phonePrice, addonPrice, spendMoney, bankBal){
	var totalPrice = 0
	while(totalPrice < spendMoney){
		totalPrice += phonePrice

		if(totalPrice < spendMoney){
			amt += ADDON_PRICE
		}
	}
	return totalPrice
}

function addTax(totalAmount){
	return TAX_RATE * totalAmount
}

function formatCurrency(amt){
	// fixed number of decimal points
	return "$" + amt.toFixed(2)
}

var amt = totalPrice(PHONE_PRICE, ADDON_PRICE, MAX_SPENDING, BANK_BAL)
amt += addTax(amt)

console.log(
	"Total purchase is: " + formatCurrency(amt)
)

if(amt > BANK_BAL){
	console.log("Can't afford!")
}