let BASIC_URL='http://localhost:8080/Back_End_war/';


$('#btnClose').click(function () {
    window.location.href = '../view/LoginForm.html';
});
let car_ID;
let userValidate;
generateCustomerID();
//Register Customer
$('#btnRegister').click(function () {

    let formData= new FormData($("#userForm")[0]);

    let cusID=car_ID;
    let cusName = $('#txtName').val();
    let contact = $('#txtContact').val();
    let email = $('#txtEmail').val();
    let address = $('#txtAddress').val();
    let licenceNum = $('#txtLicense').val();
    let userName = $('#txtUserName').val();
    let password = $('#txtPass').val();
    let rePass = $('#txtConPass').val();
    let role="CUS";

    let customer={
        cusID:cusID,
        cusName:cusName,
        contact:contact,
        cusEmail:email,
        cusAddress:address,
        licenceNumber:licenceNum,
        user:{
            userName:userName,
            password:password,
            role:role,
        }
    }

    checkUserValidate(userName);

    if (password===rePass){
        $('#txtConPass').css('border', '');
        if (userValidate===false) {

            $.ajax({
                url: BASIC_URL + 'customer',
                method: 'POST',
                async: false,
                data: JSON.stringify(customer),
                contentType: 'application/json',
                header: 'Access-Control-Allow-Origin',
                origin: '*',
                success: function (res) {
                    showAlert("CUSTOMER ADDED SUCCUSS");
                    generateCustomerID();

                }, error: function (err) {
                    alert(err.responseJSON.message);
                }
            })

            if ($('#cusNicImage').get(0).files.length === 0 || $('#cusLicenseImage').get(0).files.length === 0) {
                return;
            }

            $.ajax({
                url: BASIC_URL + "customer?cID=" + cusID,
                method: "post",
                async: false,
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    // alert(res.message);
                },
                error: function (res) {
                    alert(res.message);
                }
            });

        }else {
            showErrorAlert("This User Name Already Taken...Try Again")
        }
    }else {
        $('#txtConPass').css('border', '1px solid red');
        showErrorAlert("Please Check Your Password Again..")
    }




});

getAllCustomer();
function getAllCustomer() {
    $('#tblCustomer').empty();

    $.ajax({
        url:BASIC_URL+'customer',
        method: 'GET',
        dataType:'json',
        success:function (res) {
            let customer=res.data;
            for(let i in customer){
                let cus=customer[i];
                let id = cus.cusID;
                let name = cus.cusName;
                let contact = cus.contact;
                let email = cus.cusEmail;
                let userName = cus.user.userName;

                let row = `<tr>
                             <td>${id}</td>
                             <td>${name}</td>
                             <td>${contact}</td>
                             <td>${email}</td>
                             <td>${userName}</td>
                           </tr>`;
                $("#tblCustomer").append(row);
            }
        },error(err){
            alert(err+"Customer Loaded Failed");
        }
    });
}
function generateCustomerID() {
    $.ajax({
        url: BASIC_URL+'customer?generateID',
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            if (resp.data == null) {
                car_ID = 'C00-001';
            } else {
                let number = parseInt(resp.data.slice(4), 7);
                number++;
                car_ID = "C00-" + number.toString().padStart(3, "0");
            }
            $('#cusID').val(car_ID);

        },
        error: function (ob, statusText, error) {
        }
    });
}
function checkUserValidate(userName) {
    $.ajax({
        url:BASIC_URL+'user?checkUserName='+userName,
        method:'GET',
        async:false,
        success:function (res) {
            console.log(res.data);
            userValidate=res.data;
        },error:function (err) {
            alert("USER CHECK ERROR");
        }

    });
}


//checkUserName