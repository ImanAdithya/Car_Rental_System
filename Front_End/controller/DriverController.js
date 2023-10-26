let BASIC_URL='http://localhost:8080/Back_End_war/';


getAllDriver();

//Save Driver
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

//Load Table to Driver_Detail
function getAllDriver() {
    $('#tblDriver').empty();

    $.ajax({
        url:BASIC_URL+'driver',
        method: 'GET',
        dataType:'json',
        success:function (res) {
            let driver=res.data;
            for(let i in driver){
                let d=driver[i];
                let id = d.driverID;
                let name = d.driverName;
                let contact = d.driverContact;
                let email = d.driverEmail;
                let nic = d.driverNIC;
                let driverNic = d.driverLicence;
                let userName = d.user.userName;
                let row = `<tr><td>${id}</td><td>${name}</td><td>${contact}</td><td>${email}</td><td>${nic}</td><td>${driverNic}</td><td>${userName}</td></tr>`;
                $("#tblDriver").append(row);
            }
            bindTrEvents();
        },error(err){
            alert(err+"Driver Loaded Failed");
        }
    });
}

//Bind Table Values to TextFields
function bindTrEvents() {

    $('#tblDriver>tr').click(function () {
        let id=$(this).children().eq(0).text();

       let driver= findCustomer(id);
       console.log(driver)


        $('#txtDriverName').val();
        $('#txtDriverAddress').val();
        $('#txtDriverContact').val();
        $('#txtDriverEmail').val();
        $('#txtDriverNic').val();
        $('#txtDriverLicense').val();
        $('#txtDUserName').val();
        $('#txtDUserPass').val();

    });
}

//find Diver
function findCustomer(id) {
    $.ajax({
        url:BASIC_URL+'driver?id='+id,
        method:'GET',
        dataType: 'json',
        async: false,
        success:function (res) {
            console.log("Driver find Succuss");
           // console.log(res.data);
            return res.data;
            },error:function () {
                console.log("Driver Find Error")
            }
        });
    }

