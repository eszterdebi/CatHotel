const selectYear = document.getElementById("birthYear");

for (let i = 1924; i <= 2024; i++) {
    const option = document.createElement("option");

    option.value = i;

    option.text = i;
  
    selectYear.appendChild(option);
}

const selectMonth = document.getElementById("birthMonth");

for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");

    option.value = i;

    if (i < 10) {
        option.text = "0" + i;
    } else {
        option.text = i;
    }
    
    selectMonth.appendChild(option);
}

const selectDay = document.getElementById("birthDay");

for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");

    if (i < 10) {
        option.text = "0" + i;
    } else {
        option.text = i;
    }
  
    selectDay.appendChild(option);
}

const form = document.querySelector('form');
const inputName = document.getElementById('inputName');
const inputBirthYear = document.getElementById('birthYear');
const inputBirthMonth = document.getElementById('birthMonth');
const inputBirthDay = document.getElementById('birthDay');
const inputPhone = document.getElementById('inputPhone');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const inputPassword2 = document.getElementById('inputPassword2');
const inputAddress = document.getElementById('inputAddress');
const inputAddress2 = document.getElementById('inputAddress2');
const inputCountry = document.getElementById('inputCountry');
const inputZip = document.getElementById('inputZip');
const inputCity = document.getElementById('inputCity');
const inputOldPassword = document.getElementById('inputOldPassword');
const oldPasswordErrorAlert = document.getElementById('oldPasswordErrorAlert');
const passwordErrorAlert = document.getElementById('passwordErrorAlert');
const emailErrorAlert = document.getElementById('emailErrorAlert');
const successAlert = document.getElementById('successAlert');

const userDataId = Cookies.get('userDataId');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (inputPassword.value !== inputPassword2.value) {
        passwordErrorAlert.style.display = 'block';
        setTimeout(function() {
            passwordErrorAlert.style.display = 'none';
        }, 3000);
    }
    else {

        const newFormData = {
            id: userDataId,
            fullName: inputName.value,
            birthDate: {
                year: inputBirthYear.value,
                month: inputBirthMonth.value,
                day: inputBirthDay.value
            },
            phone: inputPhone.value,
            email: inputEmail.value,
            password: inputPassword.value,
            address: inputAddress.value,
            address2: inputAddress2.value,
            country: inputCountry.value,
            zip: inputZip.value,
            city: inputCity.value,
            oldPassword: inputOldPassword.value
        };

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5506/profilechangehandler',
            contentType: 'application/json',
            data: JSON.stringify(newFormData),
            success: function(response) {
                console.log('Sikeres válasz:', response);
                if (response.code === "success") {
                    Cookies.remove('userDataName');
                    Cookies.set('userDataName', response.fullName, { expires: 7});
                    window.location.href = '/mypage_change_success.html';
                }

            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                if (xhr.status === 401) {
                    oldPasswordErrorAlert.style.display = 'block';
                    setTimeout(function() {
                        oldPasswordErrorAlert.style.display = 'none';
                      }, 3000);
                }
                if (xhr.status === 400) {
                    emailErrorAlert.style.display = 'block';
                    setTimeout(function() {
                        emailErrorAlert.style.display = 'none';
                      }, 3000);
                }
            }
        });
    }
});



window.onload = function() {
    const userName = Cookies.get('userDataName');
    document.getElementById('fullName').textContent = userName;
    
    const userDataId = Cookies.get('userDataId');
    var profilePic = document.getElementById('selectedAvatar');
    var picName = userDataId + '.jpg';

    const formData = {
        pic: picName,
      };

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5506/checkfileexistence',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            console.log('Sikeres válasz:', response);
            profilePic.src = 'uploads/' + userDataId + '.jpg';                    
        },
        error: function(xhr, error) {
            console.error('Error:', error);
            if (xhr.status === 404) {
                console.log('Nincs feltöltött profil kép!');
            }
        }
      });

}