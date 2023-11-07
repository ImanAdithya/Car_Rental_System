console.log("PAYMENT PAGE")
getAllRentDetails();

$('#driverDetailsPopupBg2').css('display', 'none');
$('#popUpRentPage2').css('display', 'none');

$('#closePopUp2').click(function () {
    $('#driverDetailsPopupBg2').css('display', 'none');
    $('#popUpRentPage2').css('display', 'none');
});

var allRentDetails;
var clickedPayRentId;
var payment=0;
let newMilage=0;
function getAllRentDetails() {
    $('#tblPayment').empty();

    $.ajax({
        url:BASIC_URL+'rent',
        method: 'GET',
        dataType:'json',
        success:function (res) {
            allRentDetails = res.data;
            let rent = res.data;
            for (let i in rent) {
                let r = rent[i];
                if (r.status == "Accepted" || r.status=="Payed") {
                    let rentID = r.rent_ID;
                    let cusID = r.cusID;
                    getCustomerPayment(r.cusID)
                    let cusName = cusDetail.cusName;
                    let contact = cusDetail.contact;
                    let pickupDate = r.pickUpDate;
                    let returnData = r.returnDate;
                    let status = r.status;
                    let row = `<tr>
                             <td>${rentID}</td>
                             <td>${cusID}</td>
                             <td>${cusName}</td>
                             <td>${contact}</td>
                             <td>${pickupDate}</td>
                             <td>${returnData}</td>
                              <td style=" font-size:${'1.5rem'} ;color: ${status === 'Pending' ? 'orange' : (status === 'Accepted' ? 'blue' : 'black')}">${status}</td>
                           </tr>`;
                    $("#tblPayment").append(row);
                }
            }
            bindPaymentTblEvnet();
        },error(err){
            alert(err+"rent Loaded Failed");
        }
    });
}

function getCustomerPayment(cusID) {
    $.ajax({
        url: BASIC_URL+'customer?cusID='+cusID,
        method: 'GET',
        async:false,
        dataType: 'json',
        success:function (res) {
            cusDetail=res.data;
        },error:function (err) {
            alert("error load customer");
        }
    });
}

function bindPaymentTblEvnet() {
    $('#tblPayment>tr').click(function () {
        $('#driverDetailsPopupBg2').css('display', 'block');
        $('#popUpRentPage2').css('display', 'block');

        clickedPayRentId = $(this).children().eq(0).text();

    for (let a = 0; a < allRentDetails.length; a++) {
            if(allRentDetails[a].rent_ID == clickedPayRentId){
                $("#tblCheckOutTbody").empty();

                console.log(allRentDetails)

                $('#txtPaymentPickupDate').val(allRentDetails[a].pickUpDate);
                $('#txtPaymentReturnDate').val(allRentDetails[a].returnDate);

                var pickupDate = new Date(allRentDetails[a].pickUpDate);
                var returnDate = new Date(allRentDetails[a].returnDate);

                var timeDifference = returnDate - pickupDate;

                var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            for(let b = 0; b < allRentDetails[a].rentDetailList.length; b++){

                let rd=allRentDetails[a].rentDetailList;
                getCarDetail(rd[b].carID);
                changeCarAvailability(rd[b].carID);

                if (daysDifference<30){
                  payment=payment+parseFloat(carDetail.freeMilageDailyPrice)*daysDifference;
                }else{
                    var totalMonth=Math.floor(daysDifference/30);
                    var extraDays=daysDifference-(totalMonth*30);
                    payment=payment+(parseFloat(carDetail.freeMilageMonthlyPrice)*totalMonth)+parseFloat(carDetail.freeMilageDailyPrice)*extraDays;
                }

                if (rd[b].driverID === null) {
                    $('#driverFeild').prop('disabled', true); // Use 'disabled' instead of 'readonly'
                } else {
                    $('#driverFeild').prop('disabled', false); // Use 'disabled' instead of 'readonly'
                }

                let row = `<tr>
                             <td>${rd[b].carID}</td>
                              <td>${carDetail.brand}</td>
                             <td>${payment}</td>
                             <td><input id="rowCMilage" style="width: 84px" type="text"></td>
                            <td><input id="driverFeild" style="width: 84px" type="text"></td>
                            <td><input style="width: 84px" type="text"></td>
                           </tr>`;
                $("#tblCheckOutTbody").append(row);

            }
            break;
        }

    }
    });
}


$('#btnCalculate').click(function () {

    let pickupDate = new Date( $('#txtPaymentPickupDate').val());
    let returnDate = new Date($('#txtPaymentReturnDate').val());

    let timeDifference = returnDate - pickupDate;

    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));


    let rows = $('#tblCheckOutTbody>tr').length;

    for (let i = 0; i < rows; i++) {
        let carId = $("#tblCheckOutTbody tr:eq(" + i + ") td:eq(0)").text();
        let extraKm = parseFloat($("#tblCheckOutTbody tr:eq(" + i + ") td:eq(3) input").val()) || 0;
        let driver = parseFloat($("#tblCheckOutTbody tr:eq(" + i + ") td:eq(4) input").val()) || 0;
        let damage = parseFloat($("#tblCheckOutTbody tr:eq(" + i + ") td:eq(5) input").val()) || 0;
        payment = payment + driver + damage + (extraKm * 100);
        getCarDetail(carId);
        newMilage=parseFloat(carDetail.currentMeterValue);
        if (days<30){
            newMilage=newMilage+parseFloat(carDetail.freeMilageDaily)*days;
        }else{
            var totalMonth=Math.floor(days/30);
            var extraDays=days-(totalMonth*30);
            newMilage=newMilage+(parseFloat(carDetail.freeMilageMonthly)*totalMonth)+parseFloat(carDetail.freeMilageDaily)*extraDays;
        }
        newMilage=newMilage+extraKm;
        UpdateCarMilage(carId, newMilage);
    }

    $('#txtHaveToPay').val(payment);
});




$('#btnCheckOut').click(function () {
    changePaymentRentStatus();
    getAllRentDetails();
    $('#driverDetailsPopupBg2').css('display', 'none');
    $('#popUpRentPage2').css('display', 'none');
    showAlert("PAYMENT CHECK OUT SUCCUSS")

});

function changePaymentRentStatus() {
    $.ajax({
        url:BASIC_URL+'rent?changePayedRentID='+clickedPayRentId,
        method:'POST',
        async:false,
        success:function (res) {
           // alert(res.message);
        },error:function (err) {
            alert("payment chnage..");
        }
    });
}

function changeCarAvailability(carID) {
    $.ajax({
        url:BASIC_URL+'car?changeAvailableCarID='+carID,
        method:'POST',
        async:false,
        success:function (res) {
           // alert(res.message);
        },error:function (err) {
            alert("car Update UnSuccess..");
        }
    });
}

function UpdateCarMilage(carID, mileage) {

    let changeMilage={
        carID:carID+"",
        mileage:mileage
    }

    $.ajax({
        url: BASIC_URL + 'car?changeCarMilage',
        method: 'PUT',
        data:JSON.stringify(changeMilage),
        contentType:'Application/json',
        header:'Access-Control-Allow-Origin',
        origin:'*',
        async: false,
        success: function (res) {
            //alert(res.message);
        },
        error: function (err) {
            alert("Car Update Unsuccessful...");
        }
    });
}



