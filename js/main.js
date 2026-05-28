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
function copyRoom() {
    const inputElement = document.getElementById('InputRoom');
    inputElement.select();
    inputElement.setSelectionRange(0, 99999);
    document.execCommand('copy');
    //alert("Copied the text: " + inputElement.value);
}

var surnameList = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson',
    'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams',
    'Nelson', 'Hill', 'Ramirez', 'Campbell', 'Mitchell', 'Roberts', 'Carter', 'Phillips', 'Evans', 'Turner', 'Torres', 'Parker', 'Collins', 'Edwards', 'Stewart', 'Flores', 'Morris', 'Nguyen', 'Murphy',
    'Rivera', 'Cook', 'Rogers', 'Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Kelly', 'Howard', 'Ward', 'Brooks', 'Gonzales', 'Wood', 'Alexander', 'Russell', 'Griffin', 'James', 'Watson',
    'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler',
    'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes'
];

var nameList = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Elijah', 'Sophia', 'James', 'Isabella', 'William', 'Charlotte', 'Henry', 'Amelia', 'Lucas', 'Mia', 'Benjamin', 'Harper', 'Alexander', 'Evelyn', 'Daniel', 'Abigail', 'Mateo', 'Elizabeth', 'Theodore', 'Luna',
    'Michael', 'Scarlett', 'Dylan', 'Victoria', 'Levi', 'Grace', 'Jackson', 'Chloe', 'Ezra', 'Penelope', 'Asher', 'Zoey', 'Cameron', 'Stella', 'Leo', 'Violet', 'Josiah', 'Hannah', 'Gabriel', 'Aurora', 'Carter', 'Savannah', 'Julian', 'Paisley', 'Owen',
    'Nora', 'Samuel', 'Elise', 'Anthony', 'Addison', 'Isaac', 'Audrey', 'Joseph', 'Nova', 'Hudson', 'Genesis', 'John', 'Eleanor', 'Sebastian', 'Brooklyn', 'David', 'Claire', 'Wyatt', 'Sadie', 'Andrew', 'Maya', 'Matthew', 'Naomi', 'Eli', 'Caroline',
    'Joshua', 'Aurora', 'Nathan', 'Ruby', 'Christopher', 'Alice', 'Christian', 'Samantha', 'Jonathan', 'Willow', 'Landon', 'Anna', 'Jaxon', 'Gabriella', 'Jeremiah', 'Isla', 'Easton', 'Sarah', 'Lincoln', 'Allison'
];

function randomName() {
    document.getElementById("InputName").value = nameList[Math.floor( Math.random() * nameList.length )] + ' ' + surnameList[Math.floor( Math.random() * surnameList.length )];
}

function randomEmail() {
    // Генерируем случайную строку из букв и цифр
    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // Генерируем имя пользователя и домен
    const username = generateRandomString(10);
    const domain = 'jwtgenfake' + '.tech';

    document.getElementById("InputEmail").value = `${username}@${domain}`;
}

function generateUUID() {
    document.getElementById("InputRoom").value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}