let BASIC_URL='http://localhost:8080/Back_End_war/';

//Register Customer
$('#btnRegister').click(function () {

    let cusID = $('#cusID').val();
    let cusName = $('#txtName').val();
    let contact = $('#txtContact').val();
    let email = $('#txtEmail').val();
    let address = $('#txtAddress').val();
    let licenceNum = $('#txtLicense').val();
    let userName = $('#txtUserName').val();
    let password = $('#txtPass').val();

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

    console.log(cusName);

    $.ajax({
        url:BASIC_URL+'customer',
        method:'POST',
        data : JSON.stringify(customer),
        contentType : 'application/json',
        header:'Access-Control-Allow-Origin',
        origin:'*',
        success:function (res) {
            alert("Customer SUCCUSS");
        },error:function (err) {
            alert(err+"ERROR");
        }
    })

});