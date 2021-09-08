const url = 'http://localhost:3000/'

const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const checkout = async() => {
    var name = document.getElementById('name')
    var email = document.getElementById('email')
    var date = document.getElementById('date')
    var phone = document.getElementById('phone')
    var address = document.getElementById('address')
    var string = /((?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{5,32})+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+/gi
    if (name.value == '') {
        alert("Vui lòng nhập Name !!!")
    } else if (name.value.length < 5 || name.value.length > 50) {
        alert("Name không hợp lệ !!!")
    } else if (email.value == '') {
        alert("Vui lòng nhập Email !!!")
    } else if (email.value.match(/((?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{5,32})+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+/gi) != email.value) {
        alert("Email không hợp lệ !!!")
    } else if (date.value == '') {
        alert("Vui lòng nhập Date !!!")
    } else if (phone.value == '') {
        alert("Vui lòng nhập Phone !!!")
    } else if (phone.value.length != 10) {
        alert("Phone không hợp lệ !!!")
    } else if (address.value == '') {
        alert("Vui lòng nhập Address !!!")
    } else if (address.value.length < 5 || address.value.length > 50) {
        alert("Address trong khoảng (10 - 100) ký tự !!!")
    } else {
        let storage = localStorage.getItem('cart')
        var tongsoluong = 0
        if (storage) {
            cart = JSON.parse(storage)
        }
        for (let index = 0; index < cart.length; index++) {
            const item = cart[index];
            tongsoluong += Number(item.quantity)
        }

        var today = new Date();
        var time = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        const data = {
            time_order: time,
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            total_money: localStorage.getItem('tongtien'),
            quantity: tongsoluong
        }
        const productsUrl = url + 'orders'
        const option = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchAPI(productsUrl, option)
        postOrderDetail(res.id)
        swal("Good job!", "Đặt hàng thành công!", "success")
            .then((OK) => {
                window.location.href = "/cart"
            })
    }

}

const postOrderDetail = async(idOrder) => {
    // console.log(idOrder);
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    let orderDetails = []
    for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        let orderDetail = {
            order_id: idOrder,
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.product.discount
        }
        orderDetails.push(orderDetail)
    }
    let promises = orderDetails.map(item => {
        return postOrderDetailAsync(item)
    })
    await Promise.all(promises)
    localStorage.removeItem('cart')
    cart = []
        // showCart()
}

const postOrderDetailAsync = async(data) => {
    const productsUrl = url + 'order_details'
    const option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetchAPI(productsUrl, option)
}