const selectYear = document.getElementById("inputCatBirthDate");

for (let i = 2004; i <= 2024; i++) {
    const option = document.createElement("option");

    option.value = i;

    option.text = i;
  
    selectYear.appendChild(option);
}


var totalPrice = 0;

function calculateDays() {
    const arrivalDateInput = document.getElementById('select-arrival-date');
    const departureDateInput = document.getElementById('select-departure-date');

    const arrivalDate = new Date(arrivalDateInput.value);
    const departureDate = new Date(departureDateInput.value);

    const difference = departureDate.getTime() - arrivalDate.getTime();

    const days = (difference / (1000 * 3600 * 24)) + 1;

    return days;
}

const checkbox1 = document.getElementById('checkDryWetFood');
const checkbox2 = document.getElementById('checkFishDiet');
const checkbox3 = document.getElementById('checkRawMeatDiet');
const checkbox4 = document.getElementById('checkCatMilk');
const checkbox5 = document.getElementById('checkCatnipTea');
const checkbox6 = document.getElementById('checkBrush');
const checkbox7 = document.getElementById('checkBath');
const checkbox8 = document.getElementById('checkClawCut');
const checkbox9 = document.getElementById('checkDoctor');
const checkbox10 = document.getElementById('checkFleaControl');
const checkbox11 = document.getElementById('checkDeworming');
const checkbox12 = document.getElementById('checkVaccinationAgainstRabies');
const checkbox13 = document.getElementById('checkCombinedVaccination');
const checkbox14 = document.getElementById('checkBothVaccination');


checkbox1.addEventListener('click', function() {
    var days = calculateDays();
    var price = 500 * days;

    if (checkbox1.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox2.addEventListener('click', function() {
    var days = calculateDays();
    var price = 2000 * days;

    if (checkbox2.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox3.addEventListener('click', function() {
    var days = calculateDays();
    var price = 1500 * days;

    if (checkbox3.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox4.addEventListener('click', function() {
    var days = calculateDays();
    var price = 450 * days;

    if (checkbox4.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox5.addEventListener('click', function() {
    var days = calculateDays();
    var price = 950 * days;

    if (checkbox5.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox6.addEventListener('click', function() {
    var days = calculateDays();
    var weeks = days / 7;
    if (weeks < 1) {
        var price = 1000;
    } else {
        var price = 1000 * parseInt(weeks);
    }
    
    if (checkbox6.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox7.addEventListener('click', function() {
    var price = 3500;

    
    if (checkbox7.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox8.addEventListener('click', function() {
    var days = calculateDays();
    var months = days / 31;
    if (months < 1) {
        var price = 600;
    } else {
        var price = 600 * parseInt(months);
    }
    
    if (checkbox8.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox9.addEventListener('click', function() {
    var price = 6500;
    
    if (checkbox9.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox10.addEventListener('click', function() {
    var price = 1700;
    
    if (checkbox10.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox11.addEventListener('click', function() {
    var price = 2400;
    
    if (checkbox11.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox12.addEventListener('click', function() {
    var price = 9000;
    
    if (checkbox12.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox13.addEventListener('click', function() {
    var price = 12000;
    
    if (checkbox13.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});
checkbox14.addEventListener('click', function() {
    var price = 18000;
    
    if (checkbox14.checked) {
        totalPrice += price;
    } else {
        totalPrice -= price;
    }
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        var days = calculateDays();
        var daysPrice = 4500 * days;
        var totalOut = daysPrice + totalPrice;
        if(isNaN(totalOut) || totalOut < 0) {
            document.getElementById('amountToPay').textContent = '0 HUF';
        } else {
            document.getElementById('amountToPay').textContent = totalOut + ' HUF';
        }
    });
});


const checkboxPrices = [
    500,
    2000,
    1500,
    450,
    950,
    1000,
    3500,
    600,
    6500,
    1700,
    2400,
    9000,
    12000,
    18000
];

const form = document.querySelector('form');
const userId = Cookies.get('userDataId');
const arrivalDateInput = document.getElementById('select-arrival-date');
const departureDateInput = document.getElementById('select-departure-date');
const catNameInput = document.getElementById('inputName');
const catBreedInput = document.getElementById('inputCatBreed');
const catBirthDateSelect = document.getElementById('inputCatBirthDate');
const catGenderSelect = document.getElementById('inputCatGender');
const catNeuteredSelect = document.getElementById('inputCatNeutered');
const catExtraInfoTextarea = document.getElementById('inputCatExtraInfo');
const amountToPay = document.getElementById('amountToPay');


function validateForm() {
    const inputs = [
      arrivalDateInput,
      departureDateInput,
      catNameInput,
      catBreedInput,
      catBirthDateSelect,
      catGenderSelect,
      catNeuteredSelect
    ];

    for (let input of inputs) {
        if (input.value.trim() === '' || input.value.trim() === '-') {
            return false;
        }
      }
      return true;
}


form.addEventListener('submit', function(event) {
    const arrivalDate = new Date(arrivalDateInput.value);
    const departureDate = new Date(departureDateInput.value);
    event.preventDefault();
    if(!validateForm()) {
        document.getElementById('validateErrorAlert').style.display = 'block';
        setTimeout(function() {
        document.getElementById('validateErrorAlert').style.display = 'none';
      }, 3000);
    }
    else if(departureDate < arrivalDate) {
        document.getElementById('dateErrorAlert').style.display = 'block';
        setTimeout(function() {
        document.getElementById('dateErrorAlert').style.display = 'none';
      }, 3000);
    }
    else {
        const formData = {
            userId: userId,
            bookingId: Math.floor(Math.random() * 50000),
            arrivalDate: arrivalDateInput.value,
            departureDate: departureDateInput.value,
            catName: catNameInput.value,
            catBreed: catBreedInput.value,
            catBirthDate: catBirthDateSelect.value,
            catGender: catGenderSelect.value,
            catNeutered: catNeuteredSelect.value,
            catExtraInfo: catExtraInfoTextarea.value,
            extraServices: [],
            amountToPay: amountToPay.innerText
        };


        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        const checkedCheckboxValues = [];
        
        checkedCheckboxes.forEach((checkbox) => {
            checkedCheckboxValues.push(checkbox.value);
        });
        
        console.log(checkedCheckboxValues);

        const checkedCheckboxValuesPrice = [];
        checkedCheckboxValues.forEach((item) => {
            var price = (parseInt(item) - 1);
            console.log(price);
            checkedCheckboxValuesPrice.push(checkboxPrices[price]);
        });
        console.log(checkedCheckboxValuesPrice);


        for(var i = 0; i < checkedCheckboxValues.length; i++) {
            var chosedItem = { 
                id: checkedCheckboxValues[i], price: checkedCheckboxValuesPrice[i]
            };
            formData.extraServices.push(chosedItem);
            
        }

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5506/bookinghandler',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
            console.log('Sikeres válasz:', response);
            window.location.href = '/booking_new_success.html';
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
        console.log(formData);
    }
  });


window.onload = function() {
    const userName = Cookies.get('userDataName');
    document.getElementById('fullName').textContent = userName;

    if (Cookies.get('bookingBtnClicked')) {
        Cookies.remove('bookingBtnClicked');
    }

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