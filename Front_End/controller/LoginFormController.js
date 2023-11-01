let BASIC_URL='http://localhost:8080/Back_End_war/';

let userName;
let password;
let role;
$('#subBtn').click(function () {

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
               switch (role){
                   case "ADMIN":
                       window.location.href = '../view/AdiminPage.html';
                       break;
                   case "CUS":
                       window.location.href = '../view/CustomerPage.html';
                       break;
                   case  "DRI":
                       window.location.href = '../view/DriverPage.html';
                       break;
                   default:
                       console.log("INVALID ROLE")
               }
           }
       },error:function (err) {
           alert(err);
       }
   });
});