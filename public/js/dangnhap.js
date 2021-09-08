const url = 'http://localhost:3000/'

const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const submitForm = async(i) => {
    var email = document.querySelector("#email1");
    var password = document.querySelector("#password");
}