var id = window.location.href.substr(29, window.location.href.length)
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
    const res = await fetchAPI(productsUrl, option)
    processGetProducts(res)
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
    tableBody.innerHTML += `
        <form action="#" method="post" id="product_addtocart_form">
            <div class="product-img-box col-lg-6 col-sm-6 col-xs-12">
                <ul>
                    <img style="width: 100%;" src="/${data.images}">
                </ul>
                <div class="moreview-control">
                    <a style="right: 42px;" href="javascript:void(0)" class="moreview-prev"></a>
                    <a style="right: 42px;" href="javascript:void(0)" class="moreview-next"></a>
                </div>
            </div>

            <div class="product-shop col-lg-6 col-sm-6 col-xs-12">
                <div class="product-next-prev"> <a class="product-next" href="#"><span></span></a> <a class="product-prev" href="#"><span></span></a> </div>
                <div class="product-name">
                    <h1>${data.name}</h1>
                </div>
                <div class="ratings">
                    <div class="rating-box">
                        <div style="width:60%" class="rating"></div>
                    </div>
                    <p class="rating-links"> <a href="#">1 Review(s)</a> <span class="separator">|</span> <a href="#">Add Your Review</a> </p>
                </div>
                <p class="availability in-stock"><span>In Stock</span></p>
                <div class="price-block">
                    <div class="price-box">
                        <p class="old-price"> <span class="price-label">Regular Price:</span> <span class="price"> $${data.price} </span> </p>
                        <p class="special-price"> <span class="price-label">Special Price</span> <span class="price"> $${data.discount} </span> </p>
                    </div>
                </div>
                <div class="short-description">
                    <h2>Quick Overview</h2>
                    <p>${data.detail}</p>
                </div>
                <div class="add-to-box">
                    <div class="add-to-cart">
                        <label for="qty">Quantity:</label>
                        <div class="pull-left">
                            <div class="custom pull-left">
                                <button onClick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty )) result.value++;return false;" class="increase items-count" type="button"><i class="icon-plus">&nbsp;</i></button>
                                <input type="text" class="input-text qty" title="Qty" value="1" minlength="12" maxlength="12" id="qty" name="qty">
                                <button onClick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) result.value--;return false;" class="reduced items-count" type="button"><i class="icon-minus">&nbsp;</i></button>
                            </div>
                        </div>
                        <a><button onclick="addToCart(${data.id})" class="button btn-cart" title="Add to Cart" type="button"><span><i class="icon-basket"></i> Add to Cart</span></button></a>
                    </div>
                    <div class="fb-share-button" data-href="${data.link}" data-layout="button_count" data-size="small"><a target="_blank" class="fb-xfbml-parse-ignore">Chia sẻ</a></div>
                    <div class="email-addto-box">
                        <ul class="add-to-links">
                            <li> <a class="link-wishlist" href="#"><span>Add to Wishlist</span></a></li>
                            <li><span class="separator">|</span> <a class="link-compare" href="#"><span>Add to Compare</span></a></li>
                        </ul>
                        <p class="email-friend"><a href="#" class=""><span>Email to Friend</span></a></p>
                    </div>
                </div>
                <div class="custom-box"><img alt="banner" src="/images/cus-img.png"></div>
            </div>
        </form>`
}

function thich() {}
// cart

let cart = []
const addToCart = async(id) => {
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    const product = await getProductById1(id)
    let item = cart.find(c => c.product.id == id)
    var sl = 1;
    if (!isNaN(id)) {
        var qty = document.querySelector("#qty");
        sl = Number(qty.value);
    } else {
        sl = 1
    }
    if (item) {
        Number(item.quantity += Number(sl))
    } else {
        cart.push({ product, quantity: Number(sl) })
    }
    // console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart))
    swal("Good job!", "Đã thêm vào giỏ hàng!", "success")
        .then((OK) => {
            window.location.href = "/cart"
        })
}

getProductById(id)

// Comment
const getcomment = async() => {
    const commentUrl = url + 'comment'
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    const res = await fetchAPI(commentUrl, option)
    processGetcomment(res)
}

const processGetcomment = data => {
    let tableBody = document.getElementById('table-body-comment')
    tableBody.innerHTML = ''
    for (let index = 0; index < data.length; index++) {
        if (data[index].product_id == id) {
            const comment = data[index];
            tableBody.innerHTML += `
            <li class="media">
                <a class="pull-left" href="#">
                    <img class="media-object img-circle" src="/images/icon.png" alt="profile">
                </a>
                <div class="media-body">
                    <div class="well well-lg">
                        <div class="d-flex">
                            <div class="col-md-2">
                                <h4 class="media-heading text-uppercase reviews">${comment.name}</h4>
                            </div>
                            <div class="col-md-12 rating-box">
                                <div style="width: ${comment.star}%;" class="rating"></div>
                            </div>
                            <div class="col-md-12">
                                <em>${comment.date}</em>
                            </div>
                        </div>
                        <p class="media-comment">${comment.content}</p>
                        <a class="btn btn-info btn-circle text-uppercase" href="#" id="reply"><span class="glyphicon glyphicon-share-alt"></span> Reply</a>
                        <a class="btn btn-warning btn-circle text-uppercase" data-toggle="collapse" href="#replyOne"><span class="glyphicon glyphicon-comment"></span> 2 comments</a>
                    </div>
                </div>
            </li>`
        }
    }
}

const submitComment = async(i) => {
    await addcomment()
}
const addcomment = async() => {
    var sao = document.getElementsByName("star")
    for (var s = 0; s < sao.length; s++) {
        if (sao[s].checked == true) {
            var stars = sao[s].value
        }
    }
    var today = new Date();
    var time = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const data = {
        product_id: id,
        star: stars,
        date: time,
        name: document.getElementById('name').value,
        content: document.getElementById('content').value
    }
    const commentUrl = url + 'comment'
    const option = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPI(commentUrl, option)
    window.location.href = "/detail/" + id
}

getcomment()