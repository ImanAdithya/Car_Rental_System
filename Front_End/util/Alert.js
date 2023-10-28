
function showAlert(message) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'swal-custom' // Apply the custom class to the Swal alert
        }
    });
}