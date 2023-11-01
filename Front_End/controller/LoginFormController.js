$('#subBtn').click(function () {

    let userName=$('#username').val();
    let password=$('#pass').val();

    // let parts = userName.split('-');
    // let usr = parts[0];
    // let saman = parts[1];


    if (userName=="Admin" && password=="1234"){
         window.location.href = '../view/AdiminPage.html';
     }



});