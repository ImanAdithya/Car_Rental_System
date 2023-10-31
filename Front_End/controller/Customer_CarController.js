let BASIC_URL='http://localhost:8080/Back_End_war/';
$('#popUpRentPage').css('display','none');
$('#cartPage').css('display','none');

getAllCar();

let car_ID;
let rental_ID="RE001";
let cus_ID="C001";
let driver_ID="D001";
let payment_ID="P001";
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
                            <button style="width: 5vw" class="btn btn-success rent" data-bs-toggle="modal" data-bs-target="#testPoP"><p class="card-text "><i class="bi bi-upc-scan"></i> Rent </p></button>
                            <button class="btn btn-warning cart" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-cart-check-fill"></i> Add to cart</p></button>
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
                           <td>${"R001"}</td>                        
                            <td>${c.carID}</td>                         
                            <td>${c.regNo}</td>
                            <td>${c.brand}</td>
                            <td>${c.fuelType}</td>
                            <td>${c.wavierPayment}</td>
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



//Send Rent Request
function AddToCart(carId) {
    let Rent_Detail={
        rent_id:rental_ID,
        carID:carId,
        driverID:driver_ID,
        status:"Pending"
    }
    rentDetails.push(Rent_Detail);
}


$('#btnRequestAll').click(function () {

    let pickUpDate=$('#txtPickUpdate').val();
    let pickUpTime=$('#txtPickUpTime').val();
    let  returnDate=$('#txtReturnDate').val();
    let returnTime=$('#txtReturnTime').val();
    let wavierPayment=$('#txtWavierPayment').val();

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
        },error:function (err) {
            alert(err+"ERROR");
        }
    })
});

function calculateWavierPayment(payment){
    wavierPayment=wavierPayment+parseInt(payment);
    $('#txtWavierPayment').val(wavierPayment);
}
