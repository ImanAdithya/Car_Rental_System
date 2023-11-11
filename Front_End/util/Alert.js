
function showAlert(message) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1600,
        customClass: {
            popup: 'swal-custom' // Apply the custom class to the Swal alert
        }
    });
}


function showErrorAlert(message) {
    Swal.fire({
        position: 'top-end',
        icon: 'error', // Change 'success' to 'error' for an error message
        title: message,
        showConfirmButton: false,
        timer: 1600,
        customClass: {
            popup: 'swal-custom' // Apply the custom class to the Swal alert
        }
    });
}
