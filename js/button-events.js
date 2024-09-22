document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const emailInput = form.querySelector('input[name="email"]');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const registrationURL = 'register.html';
  
      window.location.href = registrationURL + '?email=' + encodeURIComponent(emailInput.value);
    });
  
    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 5 * 60000);

    const bookingButton1 = document.getElementById('bookingBtn1');
    const bookingButton2 = document.getElementById('bookingBtn2');

    bookingButton1.addEventListener('click', function(event) {
      Cookies.set('bookingBtnClicked', 'true', { expires: expirationTime });
      event.preventDefault();
      if (Cookies.get('loggedIn') === 'true') {
        window.location.href = '/booking_new.html';
      }
    });
    bookingButton2.addEventListener('click', function(event) {
      Cookies.set('bookingBtnClicked', 'true', { expires: expirationTime });
      event.preventDefault();
      if (Cookies.get('loggedIn') === 'true') {
        window.location.href = '/booking_new.html';
      }
    });
});

window.addEventListener('load', function() {
  if (Cookies.get('bookingBtnClicked') === 'true' && Cookies.get('loggedIn') === 'true') {
    window.location.href = '/booking_new.html';
  }
});