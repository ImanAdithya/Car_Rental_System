
$(document).ready(function () {
    $(document).on('click', '.cta', function () {
        $(this).toggleClass('active');
    });
});

$(document).ready(function () {
    $(".nav-link").hover(function () {
        $(this).addClass('tax-active');
    }, function () {
        $(this).removeClass('tax-active');
    });
});