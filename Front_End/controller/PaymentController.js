console.log("PAYMENT PAGE")
getAllRentDetails();

$('#driverDetailsPopupBg2').css('display', 'none');
$('#popUpRentPage2').css('display', 'none');

$('#closePopUp2').click(function () {
    $('#driverDetailsPopupBg2').css('display', 'none');
    $('#popUpRentPage2').css('display', 'none');
});

let fullPayment=0
var allRentDetails;
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
var clickedPayRentId;
function bindPaymentTblEvnet() {
    $('#tblPayment>tr').click(function () {
        $('#driverDetailsPopupBg2').css('display', 'block');
        $('#popUpRentPage2').css('display', 'block');

        clickedPayRentId = $(this).children().eq(0).text();
        console.log(clickedPayRentId)
        console.log(allRentDetails)



    for (let a = 0; a < allRentDetails.length; a++) {
            if(allRentDetails[a].rent_ID == clickedPayRentId){
                $("#tblCheckOutTbody").empty();
                var payment=0;
                var x=0;


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




                if (daysDifference<30) {
                    console.log(carDetail.type)
                    switch (carDetail.type) {
                        case 'Premium':
                            payment = carDetail.freeMilageDailyPrice * Number(daysDifference);
                            break;
                        case 'Luxury':
                            payment = carDetail.freeMilageDailyPrice * Number(daysDifference);
                    }
                }else {
                    switch (carDetail.type) {
                        case 'Premium':
                            payment =Number(carDetail.freeMilageMonthlyPrice);
                            break;
                        case 'Luxury':
                            payment = Number(carDetail.freeMilageMonthlyPrice
                            );
                    }
                }



                let row = `<tr>
                             <td>${rd[b].carID}</td>
                              <td>${carDetail.brand}</td>
                             <td>${payment}</td>
                             <td><input id="rowCMilage" style="width: 84px" type="text"></td>
                          
                            <td><input style="width: 84px" type="text"></td>
                            <td><input style="width: 84px" type="text"></td>
                           </tr>`;
                $("#tblCheckOutTbody").append(row);
                   x++;
            }

            break;
        }
    }
    });
}




    $('#btnCalculate').click(function () {

        let rows=$('#tblCheckOutTbody>tr').length;

        for (let i = 0; i < rows; i++) {
            let pay  = $("#tblCheckOutTbody tr:eq(" +i+ ") td:eq("+2+")").text();
            let payValue = parseFloat(pay);
            let extraKm = parseFloat($("#tblCheckOutTbody tr:eq(" + i + ") td:eq(" + 3 + ") input").val());
            let driver = parseFloat($("#tblCheckOutTbody tr:eq(" + i + ") td:eq(" + 4 + ") input").val());
            let damage = parseFloat($("#tblCheckOutTbody tr:eq(" + i + ") td:eq(" + 5 + ") input").val());
            console.log(payValue+" "+extraKm+" "+driver+" "+damage);
             let x = (extraKm * 30) + driver + damage+ payValue;
             fullPayment=fullPayment+x;
        }
        console.log(fullPayment);
        $('#txtHaveToPay').val(fullPayment);
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