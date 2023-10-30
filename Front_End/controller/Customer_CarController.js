let BASIC_URL='http://localhost:8080/Back_End_war/';
$('#popUpRentPage').css('display','none');
$('#cartPage').css('display','none');

getAllCar();


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

        $('#driverDetailsPopupBg').css('display','block');
        $('#popUpRentPage').css('display','block');
        let test=$(this).parent().parent().children(":eq(4)").children(":eq(0)").text();
        console.log(test);
    });

}

//Close RentPopUp
$('#closeBtn').click(function () {
    $('#popUpRentPage').css('display','none');
});

function bindCartBtn() {
    $('.cart').click(function () {
        let cardCusID = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();

        findCar(cardCusID,function (c) {
            let row = `<tr>
                           <td>${"R001"}</td>
                            <td>${c.carID}</td>
                            <td>${c.brand}</td>
                            <td>${c.fuelType}</td>
                            <td>${c.transmissionType}</td>
                            <td>${c.currentMeterValue}</td>
                            <td>${c.availability}</td>
                         </tr>`;
            $("#tblCustomerCart").append(row);
            bindTrEvent();
        });

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

function bindTrEvent() {
    $('#tblCustomerCart>tr').click(function () {
        $('#driverDetailsPopupBg').css('display','block');
        $('#popUpRentPage').css('display','block');
    });
}

