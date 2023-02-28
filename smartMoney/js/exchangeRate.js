// Code by Jonah Barrett

let currencies = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", 
    "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", 
    "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", 
    "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", 
    "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"]

function validateExchangeRate(){
    return document.getElementById("exchangerate-fromamount").value >= 0 && document.getElementById("exchangerate-fromamount").value != "";
}

function getExchangeValue(){
    from = document.getElementById("exchangerate-fromCurrency").value
    to = document.getElementById("exchangerate-toCurrency").value

    if(!validateExchangeRate()){
        window.alert("Input error! Please check your values.")
        return
    }

    // from = "USD"
    // to = "RUB"

    let accessKey = "c73e7cfc153620232d40d6ae";
    let r = new XMLHttpRequest()
    r.responseType = 'json'
    r.open("GET", "https://v6.exchangerate-api.com/v6/" + accessKey + "/latest/" + from);
    r.onload = () => {
        let res = (r.response.conversion_rates[to] * document.getElementById("exchangerate-fromamount").value);
        document.getElementById("exchangerate-toamount").value = res.toFixed(2)
        console.log(res[to])
    }
    r.send(null)
}

function swapCurrencies(){
    let fc = document.getElementById("exchangerate-fromCurrency")
    let tc = document.getElementById("exchangerate-toCurrency")
    var tmp = fc.value
    fc.value = tc.value
    tc.value = tmp
    updateButton()
}

function updateButton(){
    let from = document.getElementById("exchangerate-fromCurrency").value
    let to = document.getElementById("exchangerate-toCurrency").value
    let btn = document.getElementById("exchangerate-btn-submit")
    btn.textContent = "Convert " + from + " to " + to;
}

window.onload = function(){
    // Just add all the options to the two dropdown lists
    currencies.forEach(element => {
        document.getElementById("exchangerate-fromCurrency").appendChild(new Option(element, element))
        document.getElementById("exchangerate-toCurrency").appendChild(new Option(element, element))
    })
    updateButton()
}