// const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')
const weatherForm = document.getElementById('addressForm')
const search = document.getElementById('addressInput')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    const url = encodeURI(`http://127.0.0.1:3000/weather?address=${address}`)
    console.log(`url: ${url}`)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data)
            }
        })
    })
})
