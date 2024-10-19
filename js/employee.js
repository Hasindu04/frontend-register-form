getAllEmployees();

//................ Validate and save employee..........................//

function validateAndSaveEmployee() {
    let name = $('#exampleFormControlInput2').val().trim();
    let email = $('#exampleFormControlInput3').val().trim();
    let age = $('#exampleFormControlInput4').val().trim();
    let mobile = $('#exampleFormControlInput5').val().trim();

    //......... Validate before calling saveEmployee function...............//

    if (name === "" || email === "" || age === "" || mobile === "") {
        alert("All fields are required!");
        return;
    }

    saveEmployee();
}

//.............. Validate and update employee.......................//

function validateAndUpdateEmployee() {
    let id = $('#exampleFormControlInput1').val().trim();
    let name = $('#exampleFormControlInput2').val().trim();
    let email = $('#exampleFormControlInput3').val().trim();
    let age = $('#exampleFormControlInput4').val().trim();
    let mobile = $('#exampleFormControlInput5').val().trim();

    //........ Validate before calling updateEmployee function.......//

    if (id === "" || name === "" || email === "" || age === "" || mobile === "") {
        alert("All fields are required!");
        return;
    }

    updateEmployee();
}

//.........................save function.............................//

function saveEmployee() {

    let name = $('#exampleFormControlInput2').val();
    let email = $('#exampleFormControlInput3').val();
    let age = $('#exampleFormControlInput4').val();
    let mobile = $('#exampleFormControlInput5').val();

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/employee/save-employee",
        async: true,
        data: JSON.stringify({
            "empId": "",
            "empName": name,
            "email": email,
            "age": age,
            "mobileNo": mobile
        }),
        success: function (data) {
            alert("Saved!")
            getAllEmployees()
        },
        error: function (xhr, exception) {
            alert("This Email Already Exist!");
        }
    });
}

//.........................update function.............................//

function updateEmployee() {

    let id = $('#exampleFormControlInput1').val();
    let name = $('#exampleFormControlInput2').val();
    let email = $('#exampleFormControlInput3').val();
    let age = $('#exampleFormControlInput4').val();
    let mobile = $('#exampleFormControlInput5').val();

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/employee/update-employee",
        async: true,
        data: JSON.stringify({
            "empId": id,
            "empName": name,
            "email": email,
            "age": age,
            "mobileNo": mobile
        }),
        success: function (data) {
            alert("Updated!")
            getAllEmployees()
        },
        error: function (xhr, exception) {
            alert("Error occurred!");
        }
    });
}

//.........................delete function.............................//

function deleteEmployee() {

    let id = $('#exampleFormControlInput1').val();

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/employee/delete-by-id?id=" +id,
        async: true,
        success: function (data) {
            alert("Deleted!")
            getAllEmployees()
        },
        error: function (xhr, exception) {
            alert("Error occurred!");
        }
    });
}

//.........................get function.............................//

function getAllEmployees() {

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/employee/get-all-employees",
        async: true,
        success: function (data) {

            if (data){
                $('#empTable').empty();
                for (let emp of data){
                    let id=emp.empId
                    let name=emp.empName
                    let email=emp.email
                    let age=emp.age
                    let mobile=emp.mobileNo

                    var row = `<tr><td>${id}</td><td>${name}</td><td>${email}</td><td>${age}</td><td>${mobile}</td></tr>`;
                    $('#empTable').append(row);

                }
            }
        },
        error: function (xhr, exception) {
            alert("Error occurred!");
        }
    });
}

//.........................table function.............................//

$(document).ready(function(){
    $(document).on('click','#empTable tr', function (){
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();
        var col4 = $(this).find('td:eq(4)').text();

        $('#exampleFormControlInput1').val(col0);
        $('#exampleFormControlInput2').val(col1);
        $('#exampleFormControlInput3').val(col2);
        $('#exampleFormControlInput4').val(col3);
        $('#exampleFormControlInput5').val(col4);
    })
})