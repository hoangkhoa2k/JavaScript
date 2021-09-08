var cart = JSON.parse(localStorage.getItem("cart"))
const showCart = (shoppingCart) => {
    let cartBody = document.getElementById('cart-body')
    let tongtien = document.getElementById('tongtien')
    var tien = 0;
    cartBody.innerHTML = ''
    if (cart == "" || cart == null) {
        cartBody.innerHTML += `
            <tr>
                <td colspan="7">
                    <div class="het center">
                        <img src="/images/giohang.png">
                        <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                    </div>
                </td>
            </tr>`
    } else {
        shoppingCart.map(item => {
            tien += Number((item.product.discount) * (item.quantity))
            cartBody.innerHTML += `
                <tr class="first odd">
                    <td class="image"><a class="product-image" title="Sample Product" href="#"><img width="75" alt="Sample Product" src="${item.product.images}"></a></td>
                    <td><h2 class="product-name"> <a href="#">${item.product.name}</a></h2></td>
                    <td class="a-center">${item.product.detail.slice(0,100)}</td>
                    <td class="a-right"><span class="cart-price"> <span class="price">$${item.product.discount}</span> </span></td>
                    <td class="a-center movewishlist">
                    <div class="custom pull-left">
                    <button onClick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty )) result.value++;return false;" class="increase items-count" type="button"><i class="icon-plus">&nbsp;</i></button>
                    <input type="text" class="input-text qty" title="Qty"  value="${item.quantity}" minlength="12" maxlength="12" id="qty" name="quantity">
                    <button onClick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) result.value--;return false;" class="reduced items-count" type="button"><i class="icon-minus">&nbsp;</i></button>
                    <td class="a-right movewishlist"><span class="cart-price"> <span class="price">$${(item.product.discount)*(item.quantity)}</span> </span></td>
                    <td class="a-center last"><button onclick="removeItem(${item.product.id})"><a class="button remove-item" title="Remove item" href="#"><span>Remove item</span></a></button></td>
                </tr>`
        })
    }
    tongtien.innerText = tien
    localStorage.setItem("tongtien", tien)
}
showCart(cart)

const removeItem = id => {
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    cart = cart.filter(item => item.product.id != id)
    localStorage.setItem('cart', JSON.stringify(cart))
    swal("Good job!", "Xóa thành công!", "success")
        .then(async(OK) => {
            // const res = await fetchAPI(productsUrl, option)
            window.location.href = "/cart"
        })
    showCart(cart)
}