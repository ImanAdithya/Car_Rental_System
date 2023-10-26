let BASIC_URL='http://localhost:8080/Back_End_war/';

//save Car
$('#btnSaveCar').click(function () {
    //$('#txtRegNum').val()

    let carID="CR001";
    let regNO=$('#txtRegNum').val();
    let type=$('#txtCarType').val();
    let brand$=$('#txtBrand').val();
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

    }

    $.ajax({
        url:BASIC_URL+'car',
        method:'POST',
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