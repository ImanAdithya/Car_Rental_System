
$(document).ready(function() {
    $("#customer, #driver, #car, #booking, #payment").hide();

    $("#customerBtn").on("click", function() {
        $("#dashboard, #driver, #car, #booking, #payment").hide();
        $("#customer").show();
    });

    $("#dashBtn").on("click", function() {
        $("#dashboard").show();
        $("#customer, #driver, #booking, #car, #payment").hide();
    });

    $("#driverBtn").on("click", function() {
        $("#dashboard, #customer, #car, #booking, #payment").hide();
        $("#driver").show();
    });

    $("#carBtn").on("click", function() {
        $("#dashboard, #customer, #car, #driver, #booking, #payment").hide();
        $("#car").show();
    });

    $("#bookBtn").on("click", function() {
        $("#dashboard, #customer, #car, #driver, #booking, #payment").hide();
        $("#booking").show();
    });

    $("#paymentBtn").on("click", function() {
        $("#dashboard, #customer, #car, #driver, #booking, #payment").hide();
        $("#payment").show();
    });

    $("#logOutBtn").on("click", function() {
        window.location.href = '../view/LoginForm.html';
    });


});

//  document.getElementById("customer").style.display="none";
// document.getElementById("driver").style.display="none";
// document.getElementById("car").style.display="none";
// document.getElementById("booking").style.display="none";
// document.getElementById("payment").style.display="none";
//
// document.getElementById("customerBtn").addEventListener("click",function (){
//     document.getElementById("dashboard").style.display="none";
//     document.getElementById("driver").style.display="none";
//     document.getElementById("car").style.display="none";
//     document.getElementById("booking").style.display="none";
//     document.getElementById("customer").style.display="block";
//     document.getElementById("payment").style.display="none";
// });
//
// document.getElementById("dashBtn").addEventListener("click",function (){
//     document.getElementById("dashboard").style.display="block";
//     document.getElementById("customer").style.display="none";
//     document.getElementById("driver").style.display="none";
//     document.getElementById("booking").style.display="none";
//     document.getElementById("car").style.display="none";
//     document.getElementById("payment").style.display="none";
// });
//
// document.getElementById("driverBtn").addEventListener("click",function (){
//     document.getElementById("dashboard").style.display="none";
//     document.getElementById("customer").style.display="none";
//     document.getElementById("car").style.display="none";
//     document.getElementById("booking").style.display="none";
//     document.getElementById("driver").style.display="block";
//     document.getElementById("payment").style.display="none";
// });
//
// document.getElementById("carBtn").addEventListener("click",function (){
//     document.getElementById("dashboard").style.display="none";
//     document.getElementById("customer").style.display="none";
//     document.getElementById("car").style.display="block";
//     document.getElementById("driver").style.display="none";
//     document.getElementById("booking").style.display="none";
//     document.getElementById("payment").style.display="none";
// });
//
// document.getElementById("bookBtn").addEventListener("click",function (){
//     document.getElementById("dashboard").style.display="none";
//     document.getElementById("customer").style.display="none";
//     document.getElementById("car").style.display="none";
//     document.getElementById("driver").style.display="none";
//     document.getElementById("booking").style.display="block";
//     document.getElementById("payment").style.display="none";
// });
// document.getElementById("paymentBtn").addEventListener("click",function (){
//     document.getElementById("dashboard").style.display="none";
//     document.getElementById("customer").style.display="none";
//     document.getElementById("car").style.display="none";
//     document.getElementById("driver").style.display="none";
//     document.getElementById("booking").style.display="none";
//     document.getElementById("payment").style.display="block";
// });