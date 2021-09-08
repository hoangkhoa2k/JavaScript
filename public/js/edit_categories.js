var id = window.location.href.substr(43, window.location.href.length)
const url = 'http://localhost:3000/categories/' + id
const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const getcategories = async() => {
    const categoriesUrl = url
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
    let tableBody = document.getElementById('table-body1')
    tableBody.innerHTML = ''
    tableBody.innerHTML += `
            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal row">
                <input type="hidden" class="form-control" name="id" id="id" value="0">
                
                <div class="col-lg-12">
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="id-input" class=" form-control-label">Id</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="id-input" name="idcategories" value="${data.id}" disabled placeholder="Id..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="name" class=" form-control-label">Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="name" name="name" value="${data.name}" placeholder="Name..." class="form-control"></div>
                    </div>
                </div>
                <button type="button" onclick="editProduct(id)" class="btn btn-primary mt-2 mr-3 ml-auto">Insert</button>
            </form>`
}
const editProduct = async(id) => {
    const data = {
        name: document.getElementById('name').value
    }
    const categoriesUrl = url
    const option = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPI(categoriesUrl, option)
    swal("Good job!", "Sửa thành công!", "success")
        .then((OK) => {
            window.location.href = "/admin/categories"
        })
}

getcategories()