let BASIC_URL='http://localhost:8080/Back_End_war/';
$('#popUpRentPage').css('display','none');
$('#cartPage').css('display','none');

getAllCar();
generatePaymentID();
generateRentID();
let car_ID;
let rental_ID;
let cus_ID="C00-001";
let driver_ID;
let payment_ID;
let wavierPayment=0;
let rentDetails=[];


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
        let isAvailable = car.availability === "Yes";

        $("#carsAppend").append(`<div class="class=col col-lg-4">
                <div class="card ">
                    <img src="../assets/img/booking_cars/c5.jpeg"  id="kl" style="width: 26vw;border-radius: 9px" class="card-img-top m-3" alt="">
                    <div class="card-body">

                        <section class="mb-4">
                            <img src="../assets/img/booking_cars/c1.jpg" class="w-25" alt="">
                            <img src="../assets/img/booking_cars/c2.jpeg" class="w-25" alt="car">
                            <img src="../assets/img/booking_cars/c3.jpeg" class="w-25" alt="car">
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
                            <button style="width: 5vw" id="test" class="btn btn-success rent ${isAvailable ? '' : 'disabled'}" data-bs-toggle="modal" data-bs-target="#testPoP"><p class="card-text "><i class="bi bi-upc-scan"></i> Rent </p></button>
                            <button class="btn btn-warning cart ${isAvailable ? '' : 'disabled'}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-cart-check-fill"></i> Add to cart</p></button>
                        </section>
                        
                    </div>
                </div>
            </div>`);
    }
    bindRentBtn();
    bindCartBtn();

}


//check Availability of car
function checkCarAvailability(availability) {
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
                           <td>${"R001"}</td>                        
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

//Bind CartTable Data
// function bindTrEvent() {
//     $('#tblCustomerCart>tr').on('click', function (event) {
//         if ($(event.target).is('td:nth-child(-n+4)')) {
//             $('#driverDetailsPopupBg').css('display', 'block');
//             $('#popUpRentPage').css('display', 'block');
//         }
//
//         if (!$(this).data('clicked')) { // Check if the row has been clicked before
//             car_ID = $(this).find('td:nth-child(2)').text();
//             rental_ID = $(this).find('td:nth-child(1)').text();
//             console.log(rental_ID)
//             console.log(car_ID);
//             $(this).data('clicked', true); // Mark the row as clicked
//         }
//     });
// }

let customerID;
let driverID;
let paymentID;
let driverCount;
let lastDriverID;
let validDriverArray=[];


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

    let Rent_Detail={
        rent_id:rental_ID,
        carID:carId,
        driverID:null,
        status:"Pending"
    }
    rentDetails.push(Rent_Detail);
   // getDriverCount();
}


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
        cusID:cus_ID,
        payment: {
            paymentID:payment_ID,
            paymentAmount: "",
            paymentExtraMilage:"",
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
            alert("rent Succuss");
            savePaymentSlip(rental_ID);
        },error:function (err) {
            alert(err+"ERROR");
        }
    })
});

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
            alert(res.message);
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
