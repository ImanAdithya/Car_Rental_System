let BASIC_URL='http://localhost:8080/Back_End_war/';

generateLoginID();
let userName;
let password;
let role;
var login_ID;
var cusID;
var driverID;
let otp;
let existUser;

$('#forgetPasswordPane').css('display','none');

$('#verifyPasswordPane').css('display','none');

$('#sendOtpBtn').click(function () {

    let userName=$('#txtForgetUserName').val();

    checkExistsUser(userName);
    if (existUser===true) {
        $.ajax({
            url: BASIC_URL + 'user?otpUserName=' + userName,
            method: 'GET',
            async: false,
            success: function (res) {
                console.log(res.data)
                otp = res.data + '';
                $('#verifyPasswordPane').css('display', 'block');
            }, error: function (err) {
                alert("Customer Get Error");
            }

        });
    }else {
        $('#txtForgetUserName').css('border', '1px solid red');
        showErrorAlert("This user not in system")
    }

});

$('#txtForgetUserName').on('focusout', function () {
    if ($(this).val() === '') {
       $(this).css('border', '');
    }
});

function checkExistsUser(userName) {
    $.ajax({
        url:BASIC_URL+'user?checkUserName='+userName,
        method:'GET',
        async:false,
        success:function (res) {
            console.log(res.data);
            existUser=res.data;
        },error:function (err) {
            alert("USER CHECK ERROR");
        }

    });
}


$('#btnChangePass').click(function () {
    let verifyPass=$('#txtVerifyPass').val();
    let newPass=$('#txtNewPass').val();

    if (otp===verifyPass){
        console.log("Correct")
    }else {
        showErrorAlert("Verification Failed..")
    }
});



$('#closeVerifyPane').click(function () {
    window.location.href = '../view/LoginForm.html';
});

$('#closeVerify').click(function () {
    window.location.href = '../view/LoginForm.html';
});



$('#forgetPassword').click(function () {
    $('#form').css('display','none')
    $('#forgetPasswordPane').css('display','block')
})

$('#subBtn').click(function () {
    generateLoginID();
    console.log(login_ID)

    let inputUserName=$('#username').val();
    let inputUserPass=$('#pass').val();
    console.log(inputUserPass);

   $.ajax({
       url:BASIC_URL+'user?userName='+inputUserName,
       method:'GET',
       dataType:'json',
       async:false,
       success:function (res) {
           console.log(res.data)
           userName=res.data.userName;
           password=res.data.password;
           role=res.data.role;
           console.log(userName)

           if (role==="CUS"){
               getCustomer(userName);
           }else if (role==="DRIVER"){
               getDriver(userName);
           }
           if (inputUserName===userName && inputUserPass===password){
               saveLoginDetail();
               switch (role){
                   case "ADMIN":
                       window.location.href = '../view/AdiminPage.html';
                       break;
                   case "CUS":
                       localStorage.setItem('userName',userName);
                       localStorage.setItem('cusID',cusID);
                       window.location.href = '../view/CustomerPage.html';
                       break;
                   case  "DRIVER":
                       localStorage.setItem('driverID',driverID);
                       localStorage.setItem('userName',userName);
                       window.location.href = '../view/DriverPage.html';
                       break;
                   default:
                       console.log("INVALID ROLE")
               }
           }else{
               showAlert("INVALID USERNAME OR PASSWORD")
           }
       },error:function (err) {
           showAlert("INVALID USERNAME OR PASSWORD")
       }
   });
});


function generateLoginID() {
    $.ajax({
        url: BASIC_URL+'login?generateID',
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        header:'Access-Control-Allow-Origin',
        origin:'*',
        async:false,
        success: function (res) {
            if (res.data == null) {
                login_ID = 'L00-001';
            } else {
                let number = parseInt(res.data.slice(4), 7);
                number++;
                login_ID = "L00-" + number.toString().padStart(3, "0");
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

function saveLoginDetail() {

    const date=new Date().toJSON().slice(0,10);
    var hour=new Date().toLocaleTimeString();

    let loginDetailDTO={
        loginID:login_ID,
        date:date,
        time:hour,
        user:{
            userName:userName,
            password:password,
            role:role
        }
    }

    $.ajax({
        url:BASIC_URL+'login',
        method:'POST',
        data:JSON.stringify(loginDetailDTO),
        contentType: "application/json",
        header:'Access-Control-Allow-Origin',
        origin:'*',
        async:false,
        success:function (res) {
           // alert(res.message);
        },error:function (err) {
            alert("Login Save Unsuccuss");
        }

    });
}

function getCustomer(userName) {
    console.log("PPP  "+userName)
    $.ajax({
        url:BASIC_URL+'customer?getCustomer='+userName,
        method:'GET',
        async:false,
        success:function (res) {
            console.log(res.data)
            cusID=res.data.cusID;
        },error:function (err) {
            alert("Customer Get Error");
        }

    });
}

function getDriver(userName) {
    $.ajax({
        url:BASIC_URL+'driver?getDriver='+userName,
        method:'GET',
        async:false,
        success:function (res) {
            console.log(res.data)
            driverID=res.data.driverID
        },error:function (err) {
            alert("Driver Get Error");
        }

    });
}

