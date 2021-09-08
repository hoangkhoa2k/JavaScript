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
        body: JSON.stringify(data)
    }
    return res = await fetchAPI(productsUrl, option)
}

const getProductById1 = async(id) => {
    const productsUrl = url + 'products/' + id
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    return await fetchAPI(productsUrl, option)
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
        tableBody.innerHTML += `
        <li class="item col-lg-4 col-md-4 col-sm-6 col-xs-6">
            <div class="col-item">
                <div class="sale-label sale-top-right">Sale</div>
                <div class="images-container">
                    <a class="product-image" title="Sample Product" href="/detail/${product.id}"> <img src="${product.images} " class="img-responsive" alt="a" /> </a>
                    <div class="actions">
                        <div class="actions-inner">
                            <button onclick="addToCart(${product.id})" type="button" title="Add to Cart" class="button btn-cart"><span>Add to Cart</span></button>
                            <ul class="add-to-links">
                                <li><a href="wishlist.html" title="Add to Wishlist" class="link-wishlist"><span>Add to Wishlist</span></a></li>
                                <li><a href="compare.html" title="Add to Compare" class="link-compare "><span>Add to Compare</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="qv-button-container"> <a class="qv-e-button btn-quickview-1" href="/detail/${product.id}"><span><span>Quick View</span></span></a> </div>
                </div>
                <div class="info">
                    <div class="info-inner">
                        <div class="item-title"> <a title=" Sample Product" href="/detail/${product.id}"> ${product.name} </a> </div>
                        <div class="item-content">
                            <div class="ratings">
                                <div class="rating-box">
                                    <div style="width:60%" class="rating"></div>
                                </div>
                            </div>
                            <div class="price-box">
                                <p class="special-price"> <span class="price"> $${product.discount} </span> </p>
                                <p class="old-price"> <span class="price-sep">-</span> <span class="price"> $${product.price} </span> </p>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"> </div>
                </div>
            </div>
        </li>`
    }
}
let cart = []
const addToCart = async(id) => {
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    const product = await getProductById1(id)
    let item = cart.find(c => c.product.id == id)
    if (item) {
        item.quantity += 1
    } else {
        cart.push({ product, quantity: 1 })
    }
    // console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart))
    swal("Good job!", "Đã thêm vào giỏ hàng!", "success")
        .then((OK) => {
            window.location.href = "/cart"
        })
}
getProducts()