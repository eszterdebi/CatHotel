function sendEmail() {
    var email = 'info@cococicapanzio.hu';
  
    var message = document.querySelector('textarea[name="text"]').value;
    var fullName = document.querySelector('input[name="full name"]').value;
    var emailAddress = document.querySelector('input[name="email address"]').value;
  
    var subject = 'Üzenet';
    var body = 'Név: ' + fullName + '\n';
    body += 'Email: ' + emailAddress + '\n';
    body += 'Üzenet: ' + message;
  
    var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  
    window.open(mailtoLink, '_blank');
  }