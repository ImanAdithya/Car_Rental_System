let BASIC_URL='http://localhost:8080/Back_End_war/';


var driverID=localStorage.getItem('driverID');
var userName=localStorage.getItem('userName');

$('#logUserName').text(userName);

console.log(driverID)

getAllRentDriver();
function getAllRentDriver() {
    $('#tblDriverPage').empty();

    $.ajax({
        url:BASIC_URL+'rent',
        method: 'GET',
        dataType:'json',
        success:function (res) {
           console.log(res.data)
            let rent=res.data;
            for(let i in rent){
                let r=rent[i];
                let rentDetailList=rent[i].rentDetailList;

                for (let j in rentDetailList){
                   if (rentDetailList[j].driverID===driverID){
                       let cusID = r.cusID;
                       getCusDetailDriver(r.cusID)
                       let cusName = cusDetail.cusName;
                       let pickupDate = r.pickUpDate;
                       let pickUpTime = r.pickUpTime;
                       let returnData = r.returnDate;
                       let returnTime = r.returnTime;
                       let row = `<tr>
                             <td>${cusID}</td>
                             <td>${cusName}</td>
                             <td>${cusDetail.cusAddress}</td>
                             <td>${cusDetail.contact}</td>
                             <td>${pickupDate}</td>
                             <td>${pickUpTime}</td>
                             <td>${returnData}</td>
                             <td>${returnTime}</td>
                           
                           </tr>`;
                       $("#tblDriverPage").append(row);
                       showAlert("DRIVER LOGIN SUCCESS");
                   }
                }

            }
        },error(err){
            alert(err+"rent Loaded Failed");
        }
    });
}

function getCusDetailDriver(cusID) {
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