getAllCars();
generateCarID();
var carIDNum;
var c_ID;

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
            console.log(c.filePath_1);
            console.log(c.filePath_2);
            console.log(c.filePath_3);
            console.log(c.filePath_4);
            $('#imgFront').attr('src', c.filePath_1);
            $('#imgBack').attr('src', c.filePath_2);
            $('#imgSide').attr('src', c.filePath_3);
            $('#imgInterio').attr('src', c.filePath_4);
        });

    });
}

//save Car
$('#btnSaveCar').click(function () {


    let carID=c_ID;
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
            showAlert("CAR ADDED SUCCUSS")
            clearFeilds();
            saveCarImage(carID);
            getAllCars();
            generateCarID();

        },error:function (err) {
            alert(err);
        }
    });

});

function saveCarImage(cusID) {
    let formDataCar = new FormData($("#carForm")[0]);
    $.ajax({
        url:BASIC_URL+'car?cID='+cusID,
        method:'POST',
        async:false,
        data:formDataCar,
        contentType:false,
        processData:false,
        success:function (res) {
            //generateCarID();
            clearFeilds();
           // alert(res.message);
        },error:function (err) {
            alert(err);
        }
    });
}

//Load All cars to table
function getAllCars() {
    $('#tblCar').empty();

    $.ajax({
        url:BASIC_URL+'car',
        method:'GET',
        dataType:'json',
        async:false,
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
    let carID=carIDNum;
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
            showAlert("Car UPDATE SUCCUSS")
            getAllCars();
            clearFeilds();
        },error:function (err) {
            alert(err);
        }
    });
});

//delete car
$('#btnDeleteCar').click(function () {
    console.log(carIDNum);
    $.ajax({
        url:BASIC_URL+'car?carID='+carIDNum,
        method:'DELETE',
        async:false,
        success:function (res) {
            showAlert("CAR DELETED SUCCUSS")
            getAllCars();
            clearFeilds();
        },error:function (err) {
          //  alert(err)
        }
    });
});

function generateCarID() {
    $.ajax({
        url: BASIC_URL+'car?generateID',
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            if (res.data == null) {
                c_ID = 'CR0-001';
            } else {
                let number = parseInt(res.data.slice(4), 7);
                number++;
                c_ID = "CR0-" + number.toString().padStart(3, "0");
            }
        },
        error: function (ob, statusText, error) {
        }
    });
}

$(document).ready(function() {
    $('#front').change(function() {
        var selectedFile = this.files[0];
        if (selectedFile) {
            var fileURL = URL.createObjectURL(selectedFile);
            $('#imgFront').attr('src', fileURL);
        } else {
            $('#imgFront').attr('src', '');
        }
    });
});

$(document).ready(function() {
    $('#back').change(function() {
        var selectedFile = this.files[0];
        if (selectedFile) {
            var fileURL = URL.createObjectURL(selectedFile);
            $('#imgBack').attr('src', fileURL);
        } else {
            $('#imgBack').attr('src', '');
        }
    });
});

$(document).ready(function() {
    $('#side').change(function() {
        var selectedFile = this.files[0];
        if (selectedFile) {
            var fileURL = URL.createObjectURL(selectedFile);
            $('#imgSide').attr('src', fileURL);
        } else {
            $('#imgSide').attr('src', '');
        }
    });
});

$(document).ready(function() {
    $('#interio').change(function() {
        var selectedFile = this.files[0];
        if (selectedFile) {
            var fileURL = URL.createObjectURL(selectedFile);
            $('#imgInterio').attr('src', fileURL);
        } else {
            $('#imgInterio').attr('src', '');
        }
    });
});

function clearFeilds() {

    $('#txtRegNum').val("");
    $('#txtCarType').val('');
    $('#txtBrand').val('');
    $('#txtColor').val('');
    $('#txtPassenger').val('');
    $('#txtFuelType').val('');
    $('#txtTransmissionType').val('');
    $('#txtCurrentMValue').val('');
    $('#txtPriceExtraKm').val('');
    $('#txtWavierPayment').val('');
    $('#txtFMD').val('');
    $('#txtFMDPrice').val('');
    $('#txtFMM').val('');
    $('#txtFMMPrice').val('');
    $('#txtAvailabilityType').val('');

}