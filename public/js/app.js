const weatherForm = document.querySelector('#addressForm')
const addressInput = document.querySelector('#addressInput')
const locationOutput = document.querySelector('#locationOutput')
const timeOutput = document.querySelector('#timeOutput')
const feelsLikeOutput = document.querySelector('#feelsLikeOutput')
const conditionsOutput = document.querySelector('#conditionsOutput')
const tempOutput = document.querySelector('#tempOutput')
const windOutput = document.querySelector('#windOutput')
const humidityOutput = document.querySelector('#humidityOutput')

locationOutput.textContent = undefined
timeOutput.textContent = undefined
tempOutput.textContent = undefined
feelsLikeOutput.textContent = undefined
conditionsOutput.textContent = undefined
windOutput.textContent = undefined
humidityOutput.textContent = undefined

const convertZulu = (time) => {
    var local = new Date(`${time} UTC`)
    return local.toLocaleDateString()
}

const publishData = (forecast) => {
    locationOutput.textContent = `Current weather in ${forecast.location.name}, ${forecast.location.region}`
    timeOutput.textContent = `Time: ${forecast.location.localtime}`
    tempOutput.textContent = `Temp: ${forecast.current.temperature} degrees F`
    feelsLikeOutput.textContent = `Feels Like: ${forecast.current.feelslike} degrees F`
    conditionsOutput.textContent = forecast.current.weather_descriptions.join(',')
    windOutput.textContent = `Wind: ${forecast.current.wind_speed} MPH ${forecast.current.wind_dir}`
    humidityOutput.textContent = `Humidity: ${forecast.current.humidity}`
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = addressInput.value
    const url = encodeURI(`/weather?address=${address}`)

    locationOutput.textContent = `Fetching the weather for ${address}`
    timeOutput.textContent = ''
    tempOutput.textContent = ''
    feelsLikeOutput.textContent = ''
    conditionsOutput.textContent = ''
    windOutput.textContent = ''
    humidityOutput.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationOutput.textContent = data.error
                console.log(data.error)
            } else {
                console.log(data);
                publishData(data)
            }
        })
    })
})
