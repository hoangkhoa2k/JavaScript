const url = 'http://localhost:3000/'

const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const getProductById = async(id) => {
    const productsUrl = url + 'products/' + id
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    return res = await fetchAPI(productsUrl, option)
}

const getProducts = async() => {
    const productsUrl = url + 'products'
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    const res = await fetchAPI(productsUrl, option)
    processGetProducts(res)
}

const processGetProducts = data => {
    let tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    for (let index = 0; index < data.length; index++) {
        const product = data[index];
        var noidung = product.detail
        var nd = noidung.slice(0, 100)
        tableBody.innerHTML += `<tr>
            <td>${product.id}</td>
            <td><img src="/${product.images}"></td>
            <td>${product.name}</td>
            <td>${product.price}đ</td>
            <td>${product.discount}đ</td>
            <td>${nd}...</td>
            <td>
                <a href="/admin/edit_products/${product.id}"><button class="btn btn-warning"><i class="bi bi-pencil-square mb-5"></i></button></a>
                <button class="btn btn-danger" onclick="removeProduct(${product.id})"><i class="bi bi-trash-fill"></i></button>
            </td>
        </tr>`
    }
}

const submitForm = async(i) => {
    var images1 = document.getElementById('images')
    var name1 = document.getElementById('name')
    var price1 = document.getElementById('price')
    var discount1 = document.getElementById('discount')
    var detail1 = document.getElementById('detail')

    // let id = document.getElementById('id').value
    if (i == 0) {
        if (images1.value == '') {
            alert("Vui lòng chọn ảnh !!!")
        } else if (name1.value == '') {
            alert("Vui lòng nhập Name !!!")
        } else if (name1.value.length < 5 || name1.value.length > 50) {
            alert("Name không hợp lệ !!!")
        } else if (isNaN(price1.value)) {
            alert("Price không hợp lệ !!!")
        } else if (isNaN(discount1.value)) {
            alert("Discount không hợp lệ !!!")
        } else if (detail1.value == '') {
            alert("Vui lòng nhập Detail !!!")
        } else if (detail1.value.length < 10 || detail1.value.length > 100) {
            alert("Detail không được vượt quá 100 ký tự !!!")
        } else {
            await addProduct()
        }
        // await addProduct()
    } else {
        await editProduct(id)
    }
}

const addProduct = async() => {
    var hinh = document.getElementById('images');
    var img = hinh.value;
    img = "products-images/" + img.slice(12, img.length)
    const data = {
        images: img,
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        discount: document.getElementById('discount').value,
        detail: document.getElementById('detail').value
    }
    const productsUrl = url + 'products'
    const option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPI(productsUrl, option)
    swal("Good job!", "Thêm thành công!", "success")
        .then((OK) => {
            window.location.href = "/admin/products"
        })
}

const removeProduct = async(id) => {
    const productsUrl = url + 'products/' + id
    const option = {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
    }
    swal("Good job!", "Xóa thành công!", "success")
        .then(async(OK) => {
            const res = await fetchAPI(productsUrl, option)
            window.location.href = "/admin/products"
        })
    getProducts()
}
getProducts()