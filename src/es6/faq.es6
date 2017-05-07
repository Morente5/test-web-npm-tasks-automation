$('.faq').click(function (a) {
    $(this).find('.toggle-faq .icon i').toggleClass('fa-caret-down fa-caret-up');
    $(this).find('.answer').toggle(
        function () {
            $(this).find('.answer').slideUp('2000')
        }, function () {
            $(this).find('.answer').slideDown('200')
        }
    )
}
)