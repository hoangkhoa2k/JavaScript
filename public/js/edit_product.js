var id = window.location.href.substr(42, window.location.href.length)
const url = 'http://localhost:3000/products/' + id
const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const getProducts = async() => {
    const productsUrl = url
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
    let tableBody = document.getElementById('table-body1')
    tableBody.innerHTML = ''
    tableBody.innerHTML += `
            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal row">
                <input type="hidden" class="form-control" name="id" id="id" value="0">
                <div class="col-lg-5">
                    <div id="khunganh" class="box" style="width:250px;height:300px;background:aqua;border-radius:10px;"><img id="anhcu" src="/${data.images}"></div>
                    <div class="col-12 col-md-9"><input type="file" onchange="anh();" class="mt-3" name="images" id="images"></div>
                </div>
                <div class="col-lg-7">
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="id-input" class=" form-control-label">Id</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="id-input" name="idProducts" value="${data.id}" disabled placeholder="Id..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="name" class=" form-control-label">Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="name" name="name" value="${data.name}" placeholder="Name..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="price" class=" form-control-label">Price</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="price" name="price" value="${data.price}" placeholder="Price..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="discount" class=" form-control-label">Discount</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="discount" name="discount" value="${data.discount}" placeholder="Enter Discount..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="detail" class="form-control-label">Detail</label></div>
                        <div class="col-12 col-md-9"><textarea name="detail" id="detail" rows="9" placeholder="Detail..." class="form-control">${data.detail}</textarea></div>
                    </div>
                </div>
                <button type="button" onclick="editProduct(id)" class="btn btn-primary mt-2 mr-3 ml-auto">Insert</button>
            </form>`
}
const editProduct = async(id) => {
    var hinh = document.getElementById('anhcu').src.substr(22, document.getElementById('anhcu').src.length);
    const data = {
        images: hinh,
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        discount: document.getElementById('discount').value,
        detail: document.getElementById('detail').value
    }
    const productsUrl = url
    const option = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPI(productsUrl, option)
    swal("Good job!", "Sửa thành công!", "success")
        .then((OK) => {
            window.location.href = "/admin/products"
        })
}

getProducts()