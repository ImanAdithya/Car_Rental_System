
getAllCar();

//Load All Car Details
function getAllCar() {
    $.ajax({
        url: 'http://localhost:8080/Back_End_war/car',
        method: "get",
        dataType:'json',
        success: function (res) {
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
                            <p class="card-text"><i class="bi bi-fuel-pump-diesel-fill me-1 text-success"></i>Petrol</p>
                            <p class="card-text"><i class="bi bi-palette-fill me-1 text-danger"></i>red</p>
                            <p class="card-text"><i class="bi bi-gear-wide-connected me-1 text-info"></i>Auto</p>
                            <p class="card-text"><i class="bi bi-people-fill me-1 text-primary"></i>4</p>
                        </section>

                        <section class="row justify-content-between p-0 m-0 g-0">
                            <p class="card-text col col-md-5">Free Mileage Daily</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4">100km</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4 text-end">3000</p>
                        </section>

                        <section class="row justify-content-between p-0 m-0 g-0">
                            <p class="card-text col col-md-5">Free Mileage Monthly</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4">1000km</p>
                            <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4 text-end">30000</p>
                        </section>


                        <section class="row justify-content-between">
                            <p class="card-text col col-lg-4">Lost Damage Cost</p>
                            <p class="card-text text-secondary col text-end">25000</p>
                        </section>

                        <section class="row justify-content-between">
                            <p class="card-text text-secondary col col-6" id="registerNum"><i class="bi bi-car-front me-1"></i>BAH-9832</p>
                           
                        </section>

                        <section class="d-flex justify-content-between flex-lg-row flex-column gap-1 mt-3">
                            <button style="width: 5vw;" class="btn btn-success rent" data-bs-toggle="modal" data-bs-target="#testPoP"><p class="card-text "><i class="bi bi-upc-scan"></i> Rent </p></button>
                            <button class="btn btn-warning cart" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-cart-check-fill"></i> Add to cart</p></button>
                        </section>

                    </div>
                </div>
            </div>`);
    }
    d();
}


//Bind the Rent Button
function bindRentBtn() {
    $('.rent').click(function () {
        alert("DD");
    });
}