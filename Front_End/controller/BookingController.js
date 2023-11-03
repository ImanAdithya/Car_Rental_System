
getAllRent();

let allRent;
let carDetail;
let cusDetail;
let fullWavierPayment=0;
var rentID;

$('#driverDetailsPopupBg').css('display', 'none');
$('#popUpRentPage').css('display', 'none');

$('#closePopUp').click(function () {
    $('#driverDetailsPopupBg').css('display', 'none');
    $('#popUpRentPage').css('display', 'none');
});

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
                              <td style=" font-size:${'1.5rem'} ;color: ${status === 'Pending' ? 'orange' : (status === 'accept' ? 'green' : 'black')}">${status}</td>
                           </tr>`;
                $("#tblBooking").append(row);
            }
           //bindBookingTblEvnet();
            rentReqTableBindEvents();
        },error(err){
            alert(err+"rent Loaded Failed");
        }
    });
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
        url:BASIC_URL+'rent?acceptRentID='+clickedRentId,
        method:'POST',
        success:function (res) {
            alert(res.message);
            getAllRent();
        },error:function (err) {
            alert("SOMETHING WENT WRONG..");
        }
    });
});

$('#btnDecline').click(function () {

    updateStatus(rentID);

    let rows=$('#tBodyCusBooking').children().length;
    for (let i = 0; i < rows; i++) {
        let avCarID = $("#tBodyCusBooking tr:eq(" + i + ") td:eq(0)").text();
        changeCarAvailability(avCarID);
    }

    $('#driverDetailsPopupBg').css('display', 'none');
    $('#popUpRentPage').css('display', 'none');

});

function changeCarAvailability(carID) {
    $.ajax({
        url:BASIC_URL+'car?changeAvailableCarID='+carID,
        method:'POST',
        async:false,
        success:function (res) {
            alert(res.message);
        },error:function (err) {
            alert("Car Available Not Updated..");
        }
    });
}

function updateStatus(rent_ID) {
    $.ajax({
        url:BASIC_URL+'rent?changeStatusID='+rent_ID,
        method:'POST',
        async:false,
        success:function (res) {
            alert(res.data);
        },error:function (err) {
            alert("Rent status Updated Succuss");
        }
    });
}

function getRent(rentID) {
    $.ajax({
        url:BASIC_URL+'rent?getRentID='+rentID,
        method:'GET',
        async:false,
        success:function (res) {
            console.log(res.data);
        },error:function (err) {
            alert("ERROR");
        }
    });
}

var clickedRentId;
function rentReqTableBindEvents() {
    $('#tblBooking>tr').click(function () {

        $('#driverDetailsPopupBg').css('display', 'block');
        $('#popUpRentPage').css('display', 'block');


         clickedRentId = $(this).children().eq(0).text();
        console.log(clickedRentId);
        console.log(allRent)
        $('#tBodyCusBooking').empty();


        for(let k = 0; k < allRent.length; k++){

            if(allRent[k].rent_ID == clickedRentId){
                $('#imgSlip').attr('src', allRent[k].filePath_1);

                for(let u = 0; u < allRent[k].rentDetailList.length; u++){

                let rd=allRent[k].rentDetailList;
                getCarDetail(rd[u].carID);

                fullWavierPayment=fullWavierPayment+parseFloat(carDetail.wavierPayment);
                $('#fullWavierCoast').val(fullWavierPayment);
                let driverStatus;

                if (rd[u].driverID==null){
                    driverStatus="NO";
                }else{
                    driverStatus="YES";
                }
                let row = `<tr>
                             <td>${rd[u].carID}</td>
                              <td>${carDetail.brand}</td>
                             <td>${driverStatus}</td>
                             <td>${carDetail.wavierPayment}</td>

                           </tr>`;
                $("#tBodyCusBooking").append(row);

                }

                break;
            }

        }

    });
}