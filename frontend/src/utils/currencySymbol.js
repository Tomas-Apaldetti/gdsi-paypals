const CURRENCIES = {
  "Pesos": "$",
  "Dollars": "U$D",
  "Default": "$"
}

export function getCurrencySymbol(name){
  return CURRENCIES[name] || CURRENCIES["Default"]
}
