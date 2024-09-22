window.addEventListener('load', function() {
    window.scrollTo(0, document.body.scrollHeight / 2);
    setTimeout(function() {
        var successHide = document.getElementById('successAlert');
            successHide.style.display = 'none'; 
    }, 3000);
});