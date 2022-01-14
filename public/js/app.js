const weatherForm = document.querySelector('#addressForm')
const addressInput = document.querySelector('#addressInput')
const locationOutput = document.querySelector('#locationOutput')
const weatherOutput = document.querySelector('#weatherOutput')

locationOutput.textContent = undefined
weatherOutput.textContent = undefined

const formatter = (forecast) => {
    return `Current Conditions:
    Time: ${forecast.current.observation_time} zulu, 
    Temp: ${forecast.current.temperature} degrees F, 
    Feels Like: ${forecast.current.feelslike} degrees F, 
    Wind: ${forecast.current.wind_speed} MPH ${forecast.current.wind_dir}, 
    Humidity: ${forecast.current.humidity}
    `
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = addressInput.value
    const url = encodeURI(`/weather?address=${address}`)

    locationOutput.textContent = `Fetching the weather for ${address}`
    weatherOutput.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationOutput.textContent = data.error
                console.log(data.error)
            } else {
                console.log(data);
                locationOutput.textContent = `Forecast for ${data.location.name}, ${data.location.region}`
                weatherOutput.textContent = formatter(data)
            }
        })
    })
})
