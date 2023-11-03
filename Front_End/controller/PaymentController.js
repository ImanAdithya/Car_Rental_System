console.log("PAYMENT PAGE")
getAllRentDetails();

$('#driverDetailsPopupBg2').css('display', 'none');
$('#popUpRentPage2').css('display', 'none');

$('#closePopUp2').click(function () {
    $('#driverDetailsPopupBg2').css('display', 'none');
    $('#popUpRentPage2').css('display', 'none');
});


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
                if (r.status == "Accepted") {
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

                $('#txtPaymentPickupDate').val(allRentDetails[a].pickUpDate);
                $('#txtPaymentReturnDate').val(allRentDetails[a].returnDate);

                var pickupDate = new Date(allRentDetails[a].pickUpDate);
                var returnDate = new Date(allRentDetails[a].returnDate);

                var timeDifference = returnDate - pickupDate;

                var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));



            for(let b = 0; b < allRentDetails[a].rentDetailList.length; b++){

                let rd=allRentDetails[a].rentDetailList;
                getCarDetail(rd[b].carID);

                let currentMilage=carDetail.currentMeterValue;


                if (daysDifference<30) {
                    console.log(carDetail.type)
                    switch (carDetail.type) {
                        case 'Premium':
                            payment = 5500 * Number(daysDifference);
                            break;
                        case 'Luxury':
                            payment = 10000 * Number(daysDifference);
                    }
                }else {
                    switch (carDetail.type) {
                        case 'Premium':
                            payment = 120330;
                            break;
                        case 'Luxury':
                            payment = 227150;
                    }
                }





                let row = `<tr>
                             <td>${rd[b].carID}</td>
                              <td>${carDetail.brand}</td>
                             <td>${payment}</td>
                             <td>${"D"}</td>
                           </tr>`;
                $("#tblCheckOutTbody").append(row);

            }

            break;
        }
    }
    });
}



