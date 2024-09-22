window.onload = function() {
    const userDataId = Cookies.get('userDataId');

    var profilePic = document.getElementById('selectedAvatar');
    var picName = userDataId + '.jpg';

    const userId = {
        id: userDataId,
    };
  
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

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5506/profiledatahandler',
    contentType: 'application/json',
    data: JSON.stringify(userId),
    success: function(response) {
        console.log('Sikeres válasz:', response);
            var profileUser = response.profileUser;
            console.log(profileUser);
            document.getElementById('fullName').textContent = profileUser.fullName;
            document.getElementById('emailAddress').textContent = profileUser.email;
            document.getElementById('phoneNumber').textContent = profileUser.phone;
            document.getElementById('birthDate').textContent = (profileUser.birthDate.year + '-' + profileUser.birthDate.month + '-' + profileUser.birthDate.day);
            document.getElementById('country').textContent = profileUser.country;
            document.getElementById('zip').textContent = profileUser.zip;
            document.getElementById('city').textContent = profileUser.city;
            document.getElementById('address').textContent = (profileUser.address + ' ' + profileUser.address2);
                        

    },
    error: function(xhr, error) {
        console.error('Error:', error);
    }
  });

}


