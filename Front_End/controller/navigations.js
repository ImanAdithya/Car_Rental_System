 document.getElementById("customer").style.display="none";
document.getElementById("driver").style.display="none";
document.getElementById("car").style.display="none";
document.getElementById("booking").style.display="none";
document.getElementById("payment").style.display="none";

document.getElementById("customerBtn").addEventListener("click",function (){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("driver").style.display="none";
    document.getElementById("car").style.display="none";
    document.getElementById("booking").style.display="none";
    document.getElementById("customer").style.display="block";
    document.getElementById("payment").style.display="none";
});

document.getElementById("dashBtn").addEventListener("click",function (){
    document.getElementById("dashboard").style.display="block";
    document.getElementById("customer").style.display="none";
    document.getElementById("driver").style.display="none";
    document.getElementById("booking").style.display="none";
    document.getElementById("car").style.display="none";
    document.getElementById("payment").style.display="none";
});

document.getElementById("driverBtn").addEventListener("click",function (){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("customer").style.display="none";
    document.getElementById("car").style.display="none";
    document.getElementById("booking").style.display="none";
    document.getElementById("driver").style.display="block";
    document.getElementById("payment").style.display="none";
});

document.getElementById("carBtn").addEventListener("click",function (){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("customer").style.display="none";
    document.getElementById("car").style.display="block";
    document.getElementById("driver").style.display="none";
    document.getElementById("booking").style.display="none";
    document.getElementById("payment").style.display="none";
});

document.getElementById("bookBtn").addEventListener("click",function (){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("customer").style.display="none";
    document.getElementById("car").style.display="none";
    document.getElementById("driver").style.display="none";
    document.getElementById("booking").style.display="block";
    document.getElementById("payment").style.display="none";
});
document.getElementById("paymentBtn").addEventListener("click",function (){
    document.getElementById("dashboard").style.display="none";
    document.getElementById("customer").style.display="none";
    document.getElementById("car").style.display="none";
    document.getElementById("driver").style.display="none";
    document.getElementById("booking").style.display="none";
    document.getElementById("payment").style.display="block";
});
