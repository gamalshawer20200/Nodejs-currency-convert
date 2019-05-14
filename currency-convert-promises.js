const axios = require('axios')

// without sync await
const getExchangeRate = (from, to) => {
    // paid API
    // return axios.get(`http://data.fixer.io/api/latest?access_key=1e9304ebf54727dfd64ebae2656fd5b5`).then((response) => {

        return axios.get(`https://api.exchangeratesapi.io/latest?base=${from}`).then((response) => {
            return response.data.rates[to]
        })
}


//Without async await
const getCountries = async (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name)
    })
}

// getExchangeRate('MXN', 'CAD').then((rate) => {
//     console.log(rate)
// })

// getCountries('USD').then((country) => {
//     console.log(country)
// })

// Without async await
const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries
        return getExchangeRate(from, to)
    }).then((rate) => {
        const exchangedAmount = amount * rate

        return `${amount} ${from} is worth ${exchangedAmount} ${to} .\n${to} can be used in the following countries: ${countries.join(', ')}`
    })
}

convertCurrency('CAD', 'USD', 100).then((status) => {
    console.log(status)
}).catch((e) => {
    console.log(e.message)
})