function displaySelectedImage(event) {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        console.error('No file selected');
        return;
    }

    const userId = Cookies.get('userDataId')

    const formData = new FormData();
    
    formData.append('userId', userId);
    formData.append('file', file);

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5506/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            console.log('Sikeres válasz:', response);
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
