function copyJWTLink() {
    const inputElement = document.getElementById('jwtlink');
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    document.execCommand('copy');
    //alert("Copied the text: " + inputElement.value);
}

function copyJWToken() {
    const inputElement = document.getElementById('jwtoken');
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    document.execCommand('copy');
    //alert("Copied the text: " + inputElement.value);
}