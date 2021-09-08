const url = 'http://localhost:3000/'

const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const getuser = async() => {
    const userUrl = url + 'user'
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    const res = await fetchAPI(userUrl, option)
        // processGetuser(res)
}

const submitForm = async(i) => {
    await addUser()

}

const addUser = async() => {
    const data = {
        name: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    }
    const userUrl = url + 'user'
    const option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPI(userUrl, option)
    swal("Good job!", "Đăng ký thành công!", "success")
        .then((OK) => {
            window.location.href = "/login"
        })
}

getuser()