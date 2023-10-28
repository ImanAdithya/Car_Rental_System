getAllCars();

let carIDNum="";

//Bind table values to Text Fields
function bindTrEvent() {
    $('#tblCar>tr').click(function () {
        carIDNum=$(this).children().eq(0).text();

        findCar(carIDNum,function (c) {
            $('#txtRegNum').val(c.regNo);
            $('#txtCarType option:selected').text(c.type);
            $('#txtBrand').val(c.brand);
            $('#txtColor').val(c.color);
            $('#txtPassenger').val(c.passenger);
            $('#txtFuelType option:selected').text(c.fuelType);
            $('#txtTransmissionType option:selected').text(c.transmissionType);
            $('#txtCurrentMValue').val(c.currentMeterValue);
            $('#txtPriceExtraKm').val(c.priceForExtra_Km);
            $('#txtWavierPayment').val(c.wavierPayment);
            $('#txtFMD').val(c.freeMilageDaily);
            $('#txtFMDPrice').val(c.freeMilageDailyPrice);
            $('#txtFMM').val(c.freeMilageMonthly);
            $('#txtFMMPrice').val(c.freeMilageMonthlyPrice);
            $('#txtAvailabilityType option:selected').text(c.availability);
        });

    });
}

//save Car
$('#btnSaveCar').click(function () {
    let formDataCar = new FormData($("#carForm")[0]);

    let carID="CR005";
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

    $.ajax({
        url:BASIC_URL+'car?cID='+carID,
        method:'POST',
        async: false,
        data:formDataCar,
        contentType:false,
        processData:false,
        success:function (res) {
            alert(res.message);
        },error:function (err) {
            alert(err);
        }
    });


});

//Load All cars to table
function getAllCars() {
    $('#tblCar').empty();

    $.ajax({
        url:BASIC_URL+'car',
        method:'GET',
        dataType:'json',
        success:function (res) {
            let car=res.data;
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
            bindTrEvent();
        },error:function (err) {
            alert(err);
        }
    });
}

//Find Car by id
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

//update car
$('#btnUpdateCar').click(function () {
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
        method:'PUT',
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

//delete car
$('#btnDeleteCar').click(function () {
    $.ajax({
        url:BASIC_URL+'car?id='+carIDNum,
        method:'DELETE',
        success:function (res) {
            alert(res.message);
            getAllCars();
        },error:function (err) {
            alert(err)
        }
    });
});