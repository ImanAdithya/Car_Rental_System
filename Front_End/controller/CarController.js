getAllCars();
let carIDNum="";

//save Car
$('#btnSaveCar').click(function () {
    let carID="CR001";
    let regNO=$('#txtRegNum').val();
    let type=$('#txtCarType option:selected').text();
    let brand=$('#txtBrand').val();
    let color=$('#txtColor').val();
    let passenger=$('#txtPassenger').val();
    let fuelType=$('#txtFuelType option:selected').text();
    let transmissionType=$('#txtTransmissionType option:selected').text();
    let currentMeter=$('#txtCurrentMValue').val();
    let priceExtraKM=$('#txtPriceExtraKm').val();
    let wavierPayment=$('#txtWavierPayment').val();
    let fmd=$('#txtFMD').val();
    let fmdPrice=$('#txtFMDPrice').val();
    let fmm=$('#txtFMM').val();
    let fmmPrice=$('#txtFMMPrice').val();
    let available=$('#txtAvailabilityType option:selected').text();

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
            getAllCars();
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
            let car=res.data;
            console.log(res.data);
            for (let i in car) {
                let c=car[i];
                let id=c.carID;
                let regNo=c.regNo;
                let brand=c.brand;
                let fuel=c.fuelType;
                let transmission=c.transmissionType;
                let currentMeter=c.currentMeterValue;
                let available=c.availability;

                let row = `<tr>
                             <td>${id}</td>
                             <td>${regNo}</td>
                             <td>${brand}</td>
                             <td>${fuel}</td>
                             <td>${transmission}</td>
                             <td>${currentMeter}</td>
                             <td>${available}</td>
                           </tr>`;
                $("#tblCar").append(row);
            }
        },error:function (err) {
            alert(err);
        }
    });
}

function bindTrEvent() {
    $('#tblCar>tr').click(function () {
        carIDNum=$(this).children().eq(0).text();

    });
}

