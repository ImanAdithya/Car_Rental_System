let BASIC_URL='http://localhost:8080/Back_End_war/';


$('#popUpRentPage').css('display','none');
$('#cartPage').css('display','none');
$('#customerEditProfile').css('display','none');

generateRentID();
generatePaymentID();
getAllCar();

var car_ID;
var rental_ID;
let cus_ID;
let driver_ID;
var payment_ID;
let wavierPayment=0;
let rentDetails=[];
let driverCount;
var lastDriverID;
let validDriverArray=[];

cus_ID=localStorage.getItem('cusID');
console.log(cus_ID)
var cus_Name=localStorage.getItem('cusName');
console.log(cus_Name)

$('#logUserName').text(cus_Name);

$('#profile').click(function () {
    $('#customerEditProfile').css('display','block');
});

$('#closeEdit').click(function () {
    $('#customerEditProfile').css('display','none');
});

//Navigations
$('#cartBtn').click(function () {
    $('#cartPage').css('display','block');
    $('#rentPage').css('display','none');
    $('#popUpRentPage').css('display','none');

});
$('#homeBtn').click(function () {
    $('#cartPage').css('display','none');
    $('#rentPage').css('display','block');
    $('#popUpRentPage').css('display','none');
});

//Load All Car Details
function getAllCar() {
    $.ajax({
        url: 'http://localhost:8080/Back_End_war/car',
        method: "get",
        dataType:'json',
        async:false,
        success: function (res) {
           // showAlert("CAR LOAD SUCCUSS");
            bindCarEvent(res.data);
        },error:function (err) {
            alert("ERROR LOAD CARS hHHH")
        }
    });
}
//Bind the Car Details to div as a card items
function bindCarEvent(cars) {
    $("#carsAppend").empty();

    for (let car of cars) {
        let isAvailable = car.availability === "NO";

        $("#carsAppend").append(`<div class="class=col col-lg-4">
                <div class="card ">
                    <img  src="${car.filePath_1}"  id="kl" style="height:25vh;width: 26vw;border-radius: 9px" class="card-img-top m-3" alt="">
                 
                    <div class="card-body">

                        <section class="mb-4">
                            <img src="${car.filePath_2}" class="w-25" style="height: 7vh" alt="">
                            <img src="${car.filePath_4}" class="w-25"style="height: 7vh" alt="car">
                            <img src="${car.filePath_4}" class="w-25" style="height: 7vh" alt="car">
                        </section>

                        <section class="d-flex gap-3 justify-content-between">
                            <p class="card-text"><i class="bi bi-fuel-pump-diesel-fill me-1 text-success"></i>${car.fuelType}</p>
                            <p class="card-text"><i class="bi bi-palette-fill me-1 text-danger"></i>${car.color}</p>
                            <p class="card-text"><i class="bi bi-gear-wide-connected me-1 text-info"></i>${car.transmissionType}</p>
                            <p class="card-text"><i class="bi bi-people-fill me-1 text-primary"></i>${car.passenger}</p>
                        </section>

                        <section class="row justify-content-between p-0 m-0 g-0">
                            <p class="card-text col col-md-5">Free Mileage Daily</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4">${car.freeMilageDaily}</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4 text-end">${car.freeMilageDailyPrice}</p>
                        </section>

                        <section class="row justify-content-between p-0 m-0 g-0">
                            <p class="card-text col col-md-5">Free Mileage Monthly</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4">${car.freeMilageMonthly}</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4 text-end">${car.freeMilageMonthlyPrice}</p>
                        </section>


                        <section class="row justify-content-between">
                            <p class="card-text col col-lg-4">Car ID</p>
                            <p class="card-text text-secondary col text-end">${car.carID}</p>
                        </section>

                        <section class="row justify-content-between">
                            <p class="card-text text-secondary col col-6" id="registerNum"><i class="bi bi-car-front me-1"></i>${car.regNo}</p>
                           
                        </section>

                        <section class="d-flex justify-content-between flex-lg-row flex-column gap-1 mt-3">
                            <button style="width: 27vw" class="btn btn-warning cart ${isAvailable ? 'disabled' : ''}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-cart-check-fill"></i> Add to cart</p></button>
                        </section>
                        
                    </div>
                </div>
            </div>`);
    }
    bindRentBtn();
    bindCartBtn();

}
//Bind the Rent Button
function bindRentBtn() {
    $('.rent').click(function () {
       // $('#driverDetailsPopupBg').css('display','block');
        //$('#popUpRentPage').css('display','block');
        car_ID=$(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
        console.log(car_ID);
    });
}

function bindCartBtn() {
    $('.cart').click(function () {
       let cardCarID = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();

        findCar(cardCarID,function (c) {
            let row = `<tr>
                           <td>${rental_ID}</td>                        
                            <td>${c.carID}</td>                         
                            <td>${c.regNo}</td>
                            <td>${c.brand}</td>
                            <td>${c.fuelType}</td>
                            <td>${c.wavierPayment}</td>
                            <td><input class="form-check-input form-check form-switch " type="checkbox" id="flexSwitchCheckDefault"></td>
                            <td> <button type="button" class="btn btn-danger cartDeleteBtn"><i class="text-light fa-solid fa-trash me-2"></i>DELETE</button></td>
                         </tr>`;
            $("#tblCustomerCart").append(row);
            calculateWavierPayment(c.wavierPayment);
        });
        removeRow();
        AddToCart(cardCarID)
    });
}
//Remove row
function removeRow() {
    // Unbind the click event handler for the 'cartDeleteBtn' class
    $('.cartDeleteBtn').off('click');

    // Bind the click event handler for the 'cartDeleteBtn' class
    $('.cartDeleteBtn').click(function () {
       //var firstCellValue = $("#tblCustomerCart tr td:nth-child(6)").text();
        //alert(firstCellValue)
        $(this).closest('tr').remove();
    });
}

//get Car Details
function findCar(id,callback) {
    $.ajax({
        url:BASIC_URL+'car?id='+id,
        method:'GET',
        async:false,
        success:function (res) {
            callback(res.data);
        },error:function (err) {
            alert(err);
        }
    });
}
function getDriverCount() {
    $.ajax({
        url:BASIC_URL+'driver?driverCount',
        method:'GET',
        dataType:'json',
        async:false,
        success:function (res) {
            driverCount=res.data;
        },error:function (err) {
            alert(err+" Driver count load err")
        }
    });
}
function AddToCart(carId) {
    generateRentID();
    generatePaymentID();
    //updateCarAvailability(carId);

    let Rent_Detail={
        rent_id:rental_ID,
        carID:carId,
        driverID:null,
    }
    rentDetails.push(Rent_Detail);
}

//Calculate Wavier Payment
function calculateWavierPayment(payment){
    wavierPayment=wavierPayment+parseInt(payment);
    $('#txtWavierPayment').val(wavierPayment);
}

//THE car rent more than 3 days give alert
function ValidateRent(pickUpDate,pickUpTime,returnDate,returnTime) {
    let pickUpDateTime = new Date(`${pickUpDate} ${pickUpTime}`);
    let returnDateTime = new Date(`${returnDate} ${returnTime}`);

// Calculate the time difference in milliseconds
    let timeDifference = Math.abs(returnDateTime - pickUpDateTime);

// Calculate the number of days
    let daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference > 3) {
      return true;
    }

    return false;
}

function assignDriver() {
    $.ajax({
        url:BASIC_URL+'driver?getLastDriver',
        method:'GET',
        dataType:'json',
        async:false,
        success:function (res) {
            lastDriverID=res.data.driverID;
            console.log("funtion :"+res.data.driverID);
        },error:function () {
            alert("ERR LOAD LAST DRIVER");
        }

    });
}

function generateRentID() {
    $.ajax({
        url: BASIC_URL+'rent?generateID',
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        async:false,
        success: function (res) {
            if (res.data == null) {
                rental_ID = 'R00-001';
            } else {
                let number = parseInt(res.data.slice(4), 7);
                number++;
                rental_ID = "R00-" + number.toString().padStart(3, "0");
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

function generatePaymentID() {
    $.ajax({
        url: BASIC_URL+'payment?generateID',
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        async:false,
        success: function (res) {
            if (res.data == null) {
                payment_ID = 'P00-001';
            } else {
                let number = parseInt(res.data.slice(4), 7);
                number++;
                payment_ID = "P00-" + number.toString().padStart(3, "0");
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

function savePaymentSlip(rID) {
    let formDataSlip = new FormData($("#rentForm")[0]);
    console.log("------------------------"+rID)
    $.ajax({
        url:BASIC_URL+'rent?rentID='+rID,
        method:'POST',
        async:false,
        data:formDataSlip,
        contentType:false,
        processData:false,
        success:function (res) {
            //alert(res.message);
        },error:function (err) {
            alert(err);
        }
    });
}
$(document).ready(function() {
    $('#paymentSlip').change(function() {
        var selectedFile = this.files[0];
        if (selectedFile) {
            var fileURL = URL.createObjectURL(selectedFile);
            $('#paymentSlipImg').attr('src', fileURL);
        } else {
            $('#paymentSlipImg').attr('src', '');
        }
    });
});

$('#btnRequestAll').click(function () {

     getDriverCount();

    let pickUpDate=$('#txtPickUpdate').val();
    let pickUpTime=$('#txtPickUpTime').val();
    let  returnDate=$('#txtReturnDate').val();
    let returnTime=$('#txtReturnTime').val();
    let wavierPayment=$('#txtWavierPayment').val();

    let rows=$('#tblCustomerCart').children().length;
    let tblDriverCount=0;


    for (let i = 0; i < rows; i++) {

        let avCarID = $("#tblCustomerCart tr:eq(" + i + ") td:eq(1)").text();
        updateCarAvailability(avCarID);


        if ($("#tblCustomerCart tr:eq(" + i + ") td:eq(6) input[type='checkbox']").prop('checked')) {
            validDriverArray.push( $("#tblCustomerCart tr:eq(" + i + ") td:eq(1)").text());
            tblDriverCount++;
        }
    }

    if (driverCount<tblDriverCount){
        alert("Driver Have Enough Driver..We Have Only "+driverCount);
        if (ValidateRent(pickUpDate,pickUpTime,returnDate,returnTime)){
            alert('The time difference is more than three days.');
            return;
        }
    }

    for (let i = 0; i < rentDetails.length; i++) {
        for (let j = 0; j < validDriverArray.length; j++) {
            if (rentDetails[i].carID===validDriverArray[j]){
                assignDriver();
                console.log("BEH"+lastDriverID);
                rentDetails[i].driverID=lastDriverID;
            }else{
                rentDetails[i].driverID=null;
            }
        }
    }

    Rent={
        rent_ID:rental_ID,
        pickUpDate:pickUpDate,
        pickUpTime:pickUpTime,
        returnDate:returnDate,
        returnTime:returnTime,
        status:"Pending",
        cusID:cus_ID,
        payment: {
            paymentID:payment_ID,
            paymentAmount:"",
            paymentExtraMilage:"789",
            wavierPayment:wavierPayment
        },
        rentDetailList:rentDetails
    }
    console.log(Rent);
    $.ajax({
        url:BASIC_URL+'rent',
        method:'POST',
        async: false,
        data : JSON.stringify(Rent),
        contentType : 'application/json',
        header:'Access-Control-Allow-Origin',
        origin:'*',
        success:function (res) {
          //  alert("rent Succuss");
            showAlert("RENT ADDED SUCCUSS")
            savePaymentSlip(rental_ID);
            cleaFields();
        },error:function (err) {
            alert(err+"ERROR");
        }
    })
});

function updateCarAvailability(carID) {
    $.ajax({
        url:BASIC_URL+'car?availableCarID='+carID,
        method:'POST',
        async:false,
        success:function (res) {
           // alert(res.message);
        },error:function (err) {
            alert("Car Availability Updated Succuss");
        }
    });
}

$('#btnEditCustomer').click(function () {
    let cusName = $('#txtName').val();
    let contact = $('#txtContact').val();
    let email = $('#txtEmail').val();
    let address = $('#txtAddress').val();
    let licenceNum = $('#txtLicense').val();
    let userName = $('#txtUserName').val();
    let newPassword = $('#txtNewPassword').val();
    let role="CUS";

    let customer={
        cusID:cus_ID,
        cusName:cusName,
        contact:contact,
        cusEmail:email,
        cusAddress:address,
        licenceNumber:licenceNum,
        user:{
            userName:userName,
            password:newPassword,
            role:role,
        }
    }

    $.ajax({
        url:BASIC_URL+'customer',
        method:'PUT',
        async: false,
        data : JSON.stringify(customer),
        contentType : 'application/json',
        header:'Access-Control-Allow-Origin',
        origin:'*',
        success:function (res) {
            showAlert("PROFILE UPDATED");
            generateCustomerID();

        },error:function (err) {
            alert(err.responseJSON.message);
        }
    })

});

function cleaFields() {
    $('#tblCustomerCart').empty();
    $('#paymentSlipImg').attr('src', "");
}