const weatherForm = document.querySelector('#addressForm')
const addressInput = document.querySelector('#addressInput')
const locationOutput = document.querySelector('#locationOutput')
const weatherOutput = document.querySelector('#weatherOutput')

locationOutput.textContent = undefined
weatherOutput.textContent = undefined

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = addressInput.value
    const url = encodeURI(`http://127.0.0.1:3000/weather?address=${address}`)
    locationOutput.textContent = `Fetching the weather for ${address}`
    console.log(`url: ${url}`)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationOutput.textContent = error
                console.log(data.error)
            } else {
                console.log(data);
                locationOutput.textContent = `Forecast for ${data.location.name}, ${data.location.region}`
                weatherOutput.textContent = `Current Conditions:
                Time: ${data.current.observation_time}\n
                Temp: ${data.current.temperature} degrees F\n
                Feels Like: ${data.current.feelslike} degrees F\n
                Wind: ${data.current.wind_speed} MPH ${data.current.wind_dir}\n
                Humidity: ${data.current.humidity}
                `
            }
        })
    })
})
