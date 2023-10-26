let BASIC_URL='http://localhost:8080/Back_End_war/';

$('#btnSaveDriver').click(function () {
    let driverID="D001"
    let driverName=$('#txtDriverName').val();
    let driverAddress=$('#txtDriverAddress').val();
    let driverContact=$('#txtDriverContact').val();
    let driverEmail=$('#txtDriverEmail').val();
    let driverNIC=$('#txtDriverNic').val();
    let driverLicence=$('#txtDriverLicense').val();
    let availability="True";
    let userName=$('#txtDUserName').val();
    let password=$('#txtDUserPass').val();
    let role="Driver";

    let driver={
         driverID:driverID,
         driverName:driverName,
         driverAddress:driverAddress,
         driverContact:driverContact,
         driverEmail:driverEmail,
         driverNIC:driverNIC,
         driverLicence:driverLicence,
         availability:availability,
         user:{
             userName:userName,
             password:password,
             role:role
         }
    }

    $.ajax({
        url:BASIC_URL+'driver',
        method:"POST",
        data:JSON.stringify(driver),
        contentType:'Application/json',
        header:'Access-Control-Allow-Origin',
        origin:'*',
        success:function (res) {
            alert(res);
        },error:function (err) {
            alert(err+"Something Went Wrong");
        }
    });

});