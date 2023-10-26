
//save Car
$('#btnSaveCar').click(function () {
    let carID="CR001";
    let regNO=$('#txtRegNum').val();
    let type=$('#txtCarType').val();
    let brand=$('#txtBrand').val();
    let color=$('#txtColor').val();
    let passenger=$('#txtPassenger').val();
    let fuelType=$('#txtFuelType').val();
    let transmissionType=$('#txtTransmissionType').val();
    let currentMeter=$('#txtCurrentMValue').val();
    let priceExtraKM=$('#txtPriceExtraKm').val();
    let wavierPayment=$('#txtWavierPayment').val();
    let fmd=$('#txtFMD').val();
    let fmdPrice=$('#txtFMDPrice').val();
    let fmm=$('#txtFMM').val();
    let fmmPrice=$('#txtFMMPrice').val();
    let available=$('#txtAvailabilityType').val();

    let car={
        carID:carID,
        regNo:regNO,
        type:type,
        brand:brand,
        color:color,
        passenger:passenger,
        fuelType:fuelType,
        transmissionType:transmissionType,
        currentMeterValue:currentMeter,
        priceForExtra_Km:priceExtraKM,
        wavierPayment:wavierPayment,
        freeMilageDaily:fmd,
        freeMilageDailyPrice:fmdPrice,
        freeMilageMonthly:fmm,
        freeMilageMonthlyPrice:fmmPrice,
        availability:available
    }

    $.ajax({
        url:BASIC_URL+'car',
        method:'POST',
        data:JSON.stringify(car),
        contentType:'Application/json',
        header:'Access-Control-Allow-Origin',
        origin:'*',
        success:function (res) {
            alert(res.message);
        },error:function (err) {
            alert(err);
        }
    });
});

//Load All cars to table
function getAllCars() {
    $.ajax({
        url:BASIC_URL+'car',
        method:'GET',
        dataType:'json',
        success:function (res) {

        }
    });
}