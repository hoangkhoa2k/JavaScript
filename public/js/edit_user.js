var id = window.location.href.substr(38, window.location.href.length)
const url = 'http://localhost:3000/user/' + id
const fetchAPI = async(url, option) => {
    const res = await fetch(url, option)
    return res.json()
}

const getusers = async() => {
    const usersUrl = url
    const option = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    }
    const res = await fetchAPI(usersUrl, option)
    processGetusers(res)
}

const processGetusers = data => {
    let tableBody = document.getElementById('table-body1')
    tableBody.innerHTML += `
            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal row">
                <input type="hidden" class="form-control" name="id" id="id" value="0">
                <div class="col-lg-12">
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="name" class=" form-control-label">Name</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="name" name="name" value="${data.name}" placeholder="Name..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="email" class=" form-control-label">Email</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="email" name="email" value="${data.email}" placeholder="Email..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="phone" class=" form-control-label">Phone</label></div>
                        <div class="col-12 col-md-9"><input type="text" id="phone" name="phone" value="${data.phone}" placeholder="Enter Phone..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="date" class=" form-control-label">Date</label></div>
                        <div class="col-12 col-md-9"><input type="date" id="date" name="date" value="${data.date}" placeholder="Enter Date..." class="form-control"></div>
                    </div>
                    <div class="row form-group">
                        <div class="col col-md-3"><label for="address" class="form-control-label">Address</label></div>
                        <div class="col-12 col-md-9"><textarea name="address" id="address" rows="9" placeholder="Address..." class="form-control">${data.address}</textarea></div>
                    </div>
                </div>
                <button type="button" onclick="edituser(id)" class="btn btn-primary mt-2 mr-3 ml-auto">Insert</button>
            </form>`
}
const edituser = async(id) => {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        address: document.getElementById('address').value
    }
    const usersUrl = url
    const option = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const res = await fetchAPI(usersUrl, option)
    swal("Good job!", "Sửa thành công!", "success")
        .then((OK) => {
            window.location.href = "/admin/user"
        })
}

getusers()