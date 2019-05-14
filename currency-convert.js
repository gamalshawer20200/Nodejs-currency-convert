const axios = require('axios')

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${from}`)
        const rate = response.data.rates[to]

        if (rate) {
            return rate
        } else {
            throw new Error()
        }
    } catch (e) {
        throw new Error(`Unable to get exchange rate from ${from} to ${to}`)
    }

}

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map((country) => country.name)
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`)
    }

}

// getExchangeRate('MXN', 'CAD').then((rate) => {
//     console.log(rate)
// })

// getCountries('USD').then((country) => {
//     console.log(country)
// })
 


const convertCurrencyAlt = async (from, to, amount) => {
    var countries = await getCountries(to)
    var rate = await getExchangeRate(from, to)
    const exchangedAmount = amount * rate
    return `${amount} ${from} is worth ${exchangedAmount} ${to} .\n${to} can be used in the following countries: ${countries.join(', ')}`

}

convertCurrencyAlt('CAD', 'MXN', 100).then((status) => {
    console.log(status)
}).catch((e) => {
    console.log(e.message)
})