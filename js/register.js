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
const errorAlert = document.getElementById('emailErrorAlert');

function validateForm() {
  const inputs = [
    inputName,
    inputBirthYear,
    inputBirthMonth,
    inputBirthDay,
    inputPhone,
    inputEmail,
    inputPassword,
    inputPassword2,
    inputAddress,
    inputCountry,
    inputZip,
    inputCity
  ];

  for (let input of inputs) {
    if (input.value.trim() === '' || input.value.trim() === 'Év' || input.value.trim() === 'Hónap' || input.value.trim() === 'Nap') {
        return false;
    }
  }
  return true;
}


  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (inputPassword.value !== inputPassword2.value) {
      document.getElementById('passwordErrorAlert').style.display = 'block';
      setTimeout(function() {
        document.getElementById('passwordErrorAlert').style.display = 'none';
      }, 3000);
    }
    else if(!validateForm()) {
      document.getElementById('validateErrorAlert').style.display = 'block';
      setTimeout(function() {
        document.getElementById('validateErrorAlert').style.display = 'none';
      }, 3000);
    }
    else {
      console.log(inputPassword.value)
      console.log(inputPassword2.value)
      console.log(inputPassword.value === inputPassword2.value)

      const formData = {
        id: Math.floor(Math.random() * 50000),
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
      };
      console.log(formData);

      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5506/registerhandler',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
          console.log('Sikeres válasz:', response);
          window.location.href = '/register_success.html';
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            if (xhr.status === 401) {
              errorAlert.style.display = 'block';
              setTimeout(function() {
                  errorAlert.style.display = 'none';
                }, 3000);
          }
        }
      });
    }
  });


const urlParams = new URLSearchParams(window.location.search);
const emailParam = urlParams.get('email');

if (emailParam) {
  const input = document.getElementById("inputEmail");
  input.value = emailParam;
}