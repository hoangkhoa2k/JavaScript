const url = 'http://localhost:3000/'

const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const getuserById = async(id) => {
    const userUrl = url + 'user/' + id
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    return res = await fetchAPI(userUrl, option)
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
    processGetuser(res)
}

const processGetuser = data => {
    let tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    for (let index = 0; index < data.length; index++) {
        const user = data[index];
        tableBody.innerHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.date}</td>
            <td>${user.address}</td>
            <td>
                <a href="/admin/edit_user/${user.id}"><button class="btn btn-warning"><i class="bi bi-pencil-square mb-5"></i></button></a>
                <button class="btn btn-danger" onclick="removeuser(${user.id})"><i class="bi bi-trash-fill"></i></button>
            </td>
        </tr>`
    }
}

const submitForm = async(i) => {
    // var name1 = document.getElementById('name')
    // var diachi1 = document.getElementById('diachi')

    // let id = document.getElementById('id').value
    if (i == 0) {
        // if (name1.value == '' || diachi1.value == '') {
        //     alert("Vui lòng nhập đủ thông tin !!!")
        // } else if (name1.value.length > 10) {
        //     alert("Tên không được vượt quá 100 ký tự !!!")
        // } else if (diachi1.value.length > 10) {
        //     alert("Địa chỉ không được vượt quá 100 ký tự !!!")
        // } else {
        //     await adduser()
        // }
        await adduser()
    } else {
        await edituser(id)
    }
}

const adduser = async() => {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
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
    swal("Good job!", "Thêm thành công!", "success")
        .then((OK) => {
            window.location.href = "/admin/user"
        })
}

const removeuser = async(id) => {
    const userUrl = url + 'user/' + id
    const option = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    }
    swal("Good job!", "Xóa thành công!", "success")
        .then(async(OK) => {
            const res = await fetchAPI(userUrl, option)
            window.location.href = "/admin/user"
        })
    getuser()
}
getuser()