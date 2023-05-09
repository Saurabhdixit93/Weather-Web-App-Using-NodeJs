const fileInput = document.querySelector('.file-input');
const selectedFile = document.querySelector('#selected-file');

fileInput.addEventListener('change', function() {
    selectedFile.innerHTML = this.files[0].name;
});