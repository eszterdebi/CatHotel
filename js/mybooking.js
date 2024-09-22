window.onload = function() {
    var userName = Cookies.get('userDataName');
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


    const userId = {
        id: userDataId,
    };

    const serviceName = [
        'Száraz+nedves táp',
        'Halas diéta',
        'Nyers hús diéta',
        'Cicatej',
        'Macskamentás tea',
        'Fésülés',
        'Fürdetés',
        'Karomvágás',
        'Általános orvosi vizsgálat',
        'Bolhairtás',
        'Féregtelenítés',
        'Veszettség elleni oltás',
        'Kombinált oltás',
        'Veszettség+kombinált oltás'
    ]

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5506/bookingdatahandler',
        contentType: 'application/json',
        data: JSON.stringify(userId),
        success: function(response) {
                var bookingList = response.bookingList;

                var bookingHTML = '';

                if(bookingList.length === 0) {
                    bookingHTML += '<div class="row g-3 mt-2 reserveInfo">';
                    bookingHTML += '    <h2>Még nincsenek foglalásid</h2>';
                    bookingHTML += '</div>';
                }

                bookingList.forEach(booking => {

                    bookingHTML += '<div class="row g-3 mt-2 reserveInfo">';
                    bookingHTML += '    <h3 id="reserve">Foglalás #'+booking.bookingId+'</h3>';
                    bookingHTML += '    <div class="col-md-6">';
                    bookingHTML += '        <h4 class="reserve-data">Érkezés</h4>';
                    bookingHTML += '        <div id="arriveDate">'+booking.arrivalDate+'</div>';
                    bookingHTML += '    </div>';
                    bookingHTML += '    <div class="col-md-6 mb-3">';
                    bookingHTML += '        <h4 class="reserve-data">Távozás</h4>';
                    bookingHTML += '        <div id="leaveDate">'+booking.departureDate+'</div>';
                    bookingHTML += '    </div>';
                    bookingHTML += '    <div class="col-md-12 mb-3">';
                    bookingHTML += '        <h4 class="reserve-data mb-3">Cica adatai</h4>';
                    bookingHTML += '        <div class="row">';
                    bookingHTML += '            <div class="col-md-4">';
                    bookingHTML += '                <h5 class="cat-data">Név</h5>';
                    bookingHTML += '                <div id="catName">'+booking.catName+'</div>';
                    bookingHTML += '            </div>';
                    bookingHTML += '            <div class="col-md-4">';
                    bookingHTML += '                <h5 class="cat-data">Születési év</h5>';
                    bookingHTML += '                <div id="catBirthdate">'+booking.catBirthDate+'</div>';
                    bookingHTML += '            </div>';
                    bookingHTML += '            <div class="col-md-4">';
                    bookingHTML += '                <h5 class="cat-data">Fajta</h5>';
                    bookingHTML += '                <div id="catBreed" class="mb-4">'+booking.catBreed+'</div>';
                    bookingHTML += '            </div>';
                    bookingHTML += '            <div class="col-md-4">';
                    bookingHTML += '                <h5 class="cat-data">Nem</h5>';
                    bookingHTML += '                <div id="catGender">'+booking.catGender+'</div>';
                    bookingHTML += '            </div>';
                    bookingHTML += '            <div class="col-md-4">';
                    bookingHTML += '                <h5 class="cat-data">Ivartalanított</h5>';
                    bookingHTML += '                <div id="catNeutered" class="mb-4">'+booking.catNeutered+'</div>';
                    bookingHTML += '            </div>';
                    if (booking.catExtraInfo !== '') {
                        bookingHTML += '            <div class="col-md-12">';
                        bookingHTML += '                <h5 class="cat-data">Megjegyzés</h5>';
                        bookingHTML += '                <div id="catExtraInfo" class="justify">'+booking.catExtraInfo+'</div>';
                        bookingHTML += '            </div>';
                    }
                    else {
                        bookingHTML += '            <div class="col-md-12">';
                        bookingHTML += '                <h5 class="cat-data">Megjegyzés</h5>';
                        bookingHTML += '                <div id="catExtraInfo" class="justify">-</div>';
                        bookingHTML += '            </div>';
                    }
                    bookingHTML += '        </div>';
                    bookingHTML += '    </div>';
                    bookingHTML += '    <div class="col-md-12 mb-3">';
                    bookingHTML += '        <h4 class="reserve-data mb-3">Extra szolgáltatások</h4>';
                    bookingHTML += '        <div class="row">';
                    if (booking.extraServices.length === 0) {
                        bookingHTML += '            <div class="col-md-3 mb-3">';
                        bookingHTML += '                <div class="extra">-</div>';
                        bookingHTML += '            </div>';
                    }
                    booking.extraServices.forEach(service =>{
                        var serviceId = parseInt(service.id) - 1;
                        bookingHTML += '            <div class="col-md-3 mb-3">';
                        bookingHTML += '                <div class="extra">'+serviceName[serviceId]+'</div>';
                        bookingHTML += '            </div>';
                    });
                    bookingHTML += '        </div>';
                    bookingHTML += '    </div>';
                    bookingHTML += '    <div class="col-md-6">';
                    bookingHTML += '        <h4 class="reserve-data">Végösszeg</h4>';
                    bookingHTML += '        <div id="amountToPay">'+booking.amountToPay+'</div>';
                    bookingHTML += '    </div>';
                    bookingHTML += '    <hr>';
                    bookingHTML += '</div>';

                });
                
                const bookingDiv = document.getElementById("reservations");

                bookingDiv.innerHTML = bookingHTML;
    
        },
        error: function(xhr, error) {
            console.error('Error:', error);
        }
      });
}