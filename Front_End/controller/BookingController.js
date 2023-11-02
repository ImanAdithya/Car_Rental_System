
$('#driverDetailsPopupBg').css('display', 'none');
$('#popUpRentPage').css('display', 'none');

$('#closePopUp').click(function () {
    $('#driverDetailsPopupBg').css('display', 'none');
    $('#popUpRentPage').css('display', 'none');
});

getAllRent();

let allRent;
let carDetail;
let cusDetail;
let fullWavierPayment=0;

//getAllRent();
function getAllRent() {
    $('#tblBooking').empty();

    $.ajax({
        url:BASIC_URL+'rent',
        method: 'GET',
        dataType:'json',
        success:function (res) {
            allRent=res.data;
            let rent=res.data;
            for(let i in rent){
                let r=rent[i];
                let rentID = r.rent_ID;
                let cusID = r.cusID;
                getCusDetail(r.cusID)
                let cusName = cusDetail.cusName;
                let pickupDate = r.pickUpDate;
                let pickUpTime = r.pickUpTime;
                let returnData = r.returnDate;
                let returnTime = r.returnTime;
                let status=r.status;
                let row = `<tr>
                             <td>${rentID}</td>
                             <td>${cusID}</td>
                             <td>${cusName}</td>
                             <td>${pickupDate}</td>
                             <td>${pickUpTime}</td>
                             <td>${returnData}</td>
                             <td>${returnTime}</td>
                              <td>${status}</td>
                           </tr>`;
                $("#tblBooking").append(row);
            }
            bindBookingTblEvnet();
        },error(err){
            alert(err+"rent Loaded Failed");
        }
    });
}

function bindBookingTblEvnet() {
    $('#tblBooking>tr').click(function () {
        $('#driverDetailsPopupBg').css('display', 'block');
        $('#popUpRentPage').css('display', 'block');
    });

    console.log(allRent);
    let rentID = $('#tblBooking tr> td:first').text();

    for (let i = 0; i < allRent.length; i++) {
        if(allRent[i].rent_ID===rentID){

            $('#imgSlip').attr('src', allRent[i].filePath_1);
            for (let j = 0; j < allRent[i].rentDetailList.length; j++) {
                let rd=allRent[i].rentDetailList;
                getCarDetail(rd[j].carID);

                fullWavierPayment=fullWavierPayment+parseFloat(carDetail.wavierPayment);
                $('#fullWavierCoast').val(fullWavierPayment);
                let driverStatus;

                if (rd[j].driverID==null){
                    driverStatus="NO";
                }else{
                    driverStatus="YES";
                }
                let row = `<tr>
                             <td>${rd[j].carID}</td>
                              <td>${carDetail.brand}</td>   
                             <td>${driverStatus}</td>
                             <td>${carDetail.wavierPayment}</td>

                           </tr>`;
                $("#tBodyCusBooking").append(row);
            }
            break;
        }
    }


}

function getCarDetail(carID) {
    $.ajax({
        url: BASIC_URL+'car?id='+carID,
        method: 'GET',
        async:false,
        dataType: 'json',
        success:function (res) {
            carDetail=res.data;
        },error:function (err) {
            alert("error load car")
        }
    });
}

function getCusDetail(cusID) {
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

$('#btnAccept').click(function () {
    $.ajax({
        url:BASIC_URL+'rent?accept'+allRent.rent_ID,
        method:'POST',
        success:function (res) {
            alert(res.message);
        },error:function (err) {
            alert("SOMETHING WENT WRONG..");
        }
    });
});
