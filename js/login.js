const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginInputEmail');
const loginPassword = document.getElementById('loginInputPassword');
const errorAlert = document.getElementById('passwordErrorAlert');
const myProfileBtn = document.getElementById('myProfileBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

window.onload = function() {
    if (Cookies.get('loggedIn') === 'true') {
        myProfileBtn.style.display = 'block';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        myProfileBtn.style.display = 'none';
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

logoutBtn.addEventListener('click', function() {
    Cookies.remove('loggedIn');
    Cookies.remove('userDataId');
    Cookies.remove('userDataEmail');
    Cookies.remove('userDataName');
    location.reload();
});

myProfileBtn.addEventListener('click', function() {
    window.location.href = 'mypage.html';
});

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;
    console.log(email);
    console.log(password);

    const formData = {
      email: email,
      password: password
    };
    console.log("kérelem elküldve");

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5506/loginhandler',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('Sikeres válasz:', response);
            if (response.code === "success") {
                Cookies.set('loggedIn', 'true', { expires: 7 });
                Cookies.set('userDataId', response.userId, { expires: 7});
                Cookies.set('userDataEmail', response.email, { expires: 7});
                Cookies.set('userDataName', response.fullName, { expires: 7});
                location.reload();
            }
        },
        error: function(xhr, error) {
            console.error('Error:', error);
            if (xhr.status === 401) {
                errorAlert.style.display = 'block';
                setTimeout(function() {
                    errorAlert.style.display = 'none';
                  }, 3000);
            }
        }
    });
});