

$('#driverDetailsPopupBg').css('display', 'none');
$('#popUpRentPage').css('display', 'none');

$('#clickmE').click(function () {
    $('#driverDetailsPopupBg').css('display', 'block');
    $('#popUpRentPage').css('display', 'block');
});

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
            console.log(res.data);
            alert("DD")
           // bindTrEvents();
        },error(err){
            alert(err+"All Booking Loaded Failed");
        }
    });
}


// let driver=res.data;
// for(let i in driver){
//     let d=driver[i];
//     let id = d.driverID;
//     let name = d.driverName;
//     let contact = d.driverContact;
//     let email = d.driverEmail;
//     let nic = d.driverNIC;
//     let driverNic = d.driverLicence;
//     let userName = d.user.userName;
//
//     let row = `<tr>
//                              <td>${id}</td>
//                              <td>${name}</td>
//                              <td>${contact}</td>
//                              <td>${email}</td>
//                              <td>${nic}</td>
//                              <td>${driverNic}</td>
//                              <td>${userName}</td>
//                            </tr>`;
//     $("#tblBooking").append(row);
// }