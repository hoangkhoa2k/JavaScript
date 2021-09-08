const url = 'http://localhost:3000/'

const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const getcategoriesById = async(id) => {
    const categoriesUrl = url + 'categories/' + id
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    return res = await fetchAPI(categoriesUrl, option)
}

const getcategories = async() => {
    const categoriesUrl = url + 'categories'
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    const res = await fetchAPI(categoriesUrl, option)
    processGetcategories(res)
}

const processGetcategories = data => {
    let tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    for (let index = 0; index < data.length; index++) {
        const categories = data[index];
        tableBody.innerHTML += `<tr>
            <td>${categories.id}</td>
            <td>${categories.name}</td>
            <td>
                <a href="/admin/edit_categories/${categories.id}"><button class="btn btn-warning"><i class="bi bi-pencil-square mb-5"></i></button></a>
                <button class="btn btn-danger" onclick="removecategories(${categories.id})"><i class="bi bi-trash-fill"></i></button>
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
        //     await addcategories()
        // }
        await addcategories()
    } else {
        await editcategories(id)
    }
}

const addcategories = async() => {
    const data = {
        name: document.getElementById('name').value
    }
    const categoriesUrl = url + 'categories'
    const option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPI(categoriesUrl, option)
    swal("Good job!", "Thêm thành công!", "success")
        .then((OK) => {
            window.location.href = "/admin/categories"
        })
}

const removecategories = async(id) => {
    //     var loi = 0;
    //     fetch(url + 'order_details/', {
    //             method: "GET"
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             for (var i = 0; i < data.length; i++) {
    //                 fetch(url + 'products/' + data[i].product_id, {
    //                         method: "GET"
    //                     })
    //                     .then(response => response.json())
    //                     .then(data1 => {
    //                         if (data1.cate_id == id) {
    //                             loi++
    //                         }
    //                     })
    //             }
    //             if (loi > 0) {
    //                 swal("Good job!", "Xóa không thành công!", "error")
    //             } else {
    //                 const categoriesUrl = url + 'categories/' + id
    //                 const option = {
    //                     method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     },
    //                 }
    //                 swal("Good job!", "Xóa thành công!", "success")
    //                     .then(async(OK) => {
    //                         const res = await fetchAPI(categoriesUrl, option)
    //                         window.location.href = "/admin/categories"
    //                     })
    //                 getcategories()
    //             }

    //         })
    // }
    const categoriesUrl = url + 'categories/' + id
    const option = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    }
    swal("Good job!", "Xóa thành công!", "success")
        .then(async(OK) => {
            const res = await fetchAPI(categoriesUrl, option)
            window.location.href = "/admin/categories"
        })
    getcategories()
}
getcategories()