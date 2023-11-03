let BASIC_URL='http://localhost:8080/Back_End_war/';
generateLoginID();
let userName;
let password;
let role;
var login_ID;
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
       success:function (res) {
           userName=res.data.userName;
           password=res.data.password;
           role=res.data.role;
           if (inputUserName===userName && inputUserPass===password){
               saveLoginDetail();
               // switch (role){
               //     case "ADMIN":
               //         window.location.href = '../view/AdiminPage.html';
               //         break;
               //     case "CUS":
               //         window.location.href = '../view/CustomerPage.html';
               //         break;
               //     case  "DRI":
               //         window.location.href = '../view/DriverPage.html';
               //         break;
               //     default:
               //         console.log("INVALID ROLE")
               // }
           }
       },error:function (err) {
           alert(err);
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
        success:function (res) {
            alert(res.message);
        },error:function (err) {
            alert("Login Save Unsuccuss");
        }

    });
}