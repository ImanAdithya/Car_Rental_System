console.log("PAYMENT PAGE")
getAllRentDetails();

$('#driverDetailsPopupBg2').css('display', 'none');
$('#popUpRentPage2').css('display', 'none');

$('#closePopUp2').click(function () {
    $('#driverDetailsPopupBg2').css('display', 'none');
    $('#popUpRentPage2').css('display', 'none');
});
function getAllRentDetails() {
    $('#tblPayment').empty();

    $.ajax({
        url:BASIC_URL+'rent',
        method: 'GET',
        dataType:'json',
        success:function (res) {
            allRent = res.data;
            let rent = res.data;
            for (let i in rent) {
                let r = rent[i];

               // if (r.status == "Accepted") {

                let rentID = r.rent_ID;
                let cusID = r.cusID;
                getCustomerPayment(r.cusID)
                let cusName = cusDetail.cusName;
                let contact=cusDetail.contact;
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
      //
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
    console.log("DD")
    $('#tblPayment>tr').click(function () {
        $('#driverDetailsPopupBg2').css('display', 'block');
        $('#popUpRentPage2').css('display', 'block');
    });

    // rentID = $('#tblPayment tr> td:first').text();
    //
    // for (let i = 0; i < allRent.length; i++) {
    //     if(allRent[i].rent_ID===rentID){
    //
    //         $('#imgSlip').attr('src', allRent[i].filePath_1);
    //         for (let j = 0; j < allRent[i].rentDetailList.length; j++) {
    //             let rd=allRent[i].rentDetailList;
    //             getCarDetail(rd[j].carID);
    //
    //             fullWavierPayment=fullWavierPayment+parseFloat(carDetail.wavierPayment);
    //             $('#fullWavierCoast').val(fullWavierPayment);
    //             let driverStatus;
    //
    //             if (rd[j].driverID==null){
    //                 driverStatus="NO";
    //             }else{
    //                 driverStatus="YES";
    //             }
    //             let row = `<tr>
    //                          <td>${rd[j].carID}</td>
    //                           <td>${carDetail.brand}</td>
    //                          <td>${driverStatus}</td>
    //                          <td>${carDetail.wavierPayment}</td>
    //
    //                        </tr>`;
    //             $("#tBodyCusBooking").append(row);
    //         }
    //         break;
    //     }
    // }

}