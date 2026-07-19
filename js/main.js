function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    try {
        navigator.clipboard.writeText(copyText.value).catch(console.error);
        //alert("Copied: " + copyText.value);
    } catch (err) {
        console.error("Unable to copy text: ", err);
    }
}
function send_tg(btnid, inputid) {
    const btn = document.getElementById(btnid);
    if (!btn) {
        console.error(`Can not find id="${btnid}" button`);
        return;
    }

    btn.addEventListener('click', () => {
        const usernameInput = document.getElementById(inputid);
        var jwtLinkInput='';
        switch (window.linktype){
            case 'full': jwtLinkInput = document.getElementById('jwtlink');
                break;
            case 'short': jwtLinkInput = document.getElementById('sjwtlink');
                break;
            default: jwtLinkInput = document.getElementById('jwtlink');
        }


        if (!usernameInput || !jwtLinkInput) {
            console.error('No input fields');
            return;
        }

        const username = usernameInput.value.trim();
        const message = jwtLinkInput.value.trim();

        if (!username) {
            alert('Insert username');
            return;
        }
        if (!message) {
            alert('Insert message');
            return;
        }

        let promise;

        if (window.tgmode === 'internal') {
            promise = fetch('tg_send.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    username,
                    message,
                    action: 'send_tg',
                }).toString(),
            });
        } else {
            if (!window.tgmodhost) {
                alert('Can not send by api, no host');
                return;
            }
            promise = fetch(window.tgmodhost + '/api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'X-API-KEY': window.tgapikey },
                body: JSON.stringify({ username, message }),
            });
        }

        promise
            .then(r => {
                if (!r.ok) {
                    return r.text().then(text => {
                        throw new Error(`HTTP ${r.status}: ${text || r.statusText}`);
                    });
                }
                return r.text();
            })
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Postal error:', error);
                alert('Postal error: ' + error.message);
            });
    });
}

const namesByLang = {
    "en": {
        "male":{
            "first":[
                "Noah", "Liam", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan", "Alexander", "Ethan", "Jacob", "Michael", "Daniel", "Henry", "Sebastian", "Jack", "Owen", "Samuel",
                "Aiden", "Theodore", "Joseph", "Matthew", "David", "Wyatt", "John", "Asher", "Levi", "Carter", "Julian", "Dylan", "Gabriel", "Isaac", "Lincoln", "Mateo", "Jaxon", "Chase", "Josiah", "Christopher",
                "Andrew", "Thomas", "Joshua", "Nathan", "Connor", "Caleb", "Hunter", "Zachary", "Asher", "Luca", "Jaxson", "Leo", "Adam", "Parker", "Hudson", "Tyler", "Aaron", "Kyle", "Charles", "Eli", "Isaiah",
                "Thomas", "Christian", "Austin", "Jordan", "Jonah", "Dominic", "Cooper", "Axel", "Roman", "Maverick", "Evan", "Grayson", "Santiago", "Jonathan", "Nolan", "Jace", "Cole", "Adrian", "Jeremiah", "Ryker",
                "Easton", "Brayden", "Lincoln", "Carson", "Nicholas", "Beckett", "Xavier", "Everett", "Camden", "Declan", "Ezra", "King", "Colton", "Marcus", "Weston", "Asa", "Silas", "Omar", "Harris", "Jasper",
                "Sawyer", "Gael", "Abel", "Kingston", "Rhett", "Hayden", "Maxwell", "Finn", "Bodhi", "Atlas"
            ],
            "last":[
                "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson",
                "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams",
                "Nelson", "Hill", "Ramirez", "Campbell", "Mitchell", "Roberts", "Carter", "Phillips", "Evans", "Turner", "Torres", "Parker", "Collins", "Edwards", "Stewart", "Flores", "Morris", "Nguyen", "Murphy",
                "Rivera", "Cook", "Rogers", "Morgan", "Peterson", "Cooper", "Reed", "Bailey", "Bell", "Kelly", "Howard", "Ward", "Brooks", "Gonzales", "Wood", "Alexander", "Russell", "Griffin", "James", "Watson",
                "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler",
                "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes"
            ]
        },
        "female": {
            "first":[
                "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Mia", "Amelia", "Charlotte", "Emily", "Abigail", "Evelyn", "Harper", "Ella", "Sofia", "Elizabeth", "Grace", "Luna", "Victoria", "Avery", "Chloe",
                "Scarlett", "Layla", "Zoey", "Mila", "Penelope", "Hannah", "Lily", "Eleanor", "Aubrey", "Addison", "Natalie", "Stella", "Brooklyn", "Nora", "Skylar", "Claire", "Violet", "Madelyn", "Lydia", "Paisley",
                "Everly", "Autumn", "Isla", "Eliana", "Naomi", "Melanie", "Audrey", "Kaylee", "Jenna", "Iris", "Alice", "Samantha", "Hailey", "Leah", "Allison", "Savannah", "Rebecca", "Willow", "Andrea", "Serenity",
                "Margaret", "Adeline", "Genesis", "Maria", "Juliana", "Julia", "Daisy", "Valentina", "Alexandra", "Hadley", "Mary", "Josie", "Annabelle", "Makayla", "Emilia", "Riley", "Jade", "Lucy", "Ariana",
                "Madison", "Caroline", "Piper", "Ruby", "Brielle", "Kennedy", "Kinsley", "Ivy", "Aaliyah", "Ashlyn", "Ellie", "Taylor", "Bailey", "Camila", "Renee", "Khloe", "Fernanda", "Paige", "Faith", "Blake","Millie"
            ],
            "last":[
                "Smith", "Jones", "Williams", "Brown", "Taylor", "Davies", "Wilson", "Evans", "Thomas", "Johnson", "Roberts", "Robinson", "Thompson", "Wright", "Walker", "White", "Edwards", "Hughes", "Green", "Hall",
                "Lewis", "Harris", "Clarke", "Patel", "Jackson", "Wood", "Turner", "Martin", "Cooper", "Hill", "Morris", "Ward", "Moore", "Clark", "Baker", "Harrison", "King", "Morgan", "Lee", "Allen", "James", "Phillips",
                "Scott", "Watson", "Davis", "Parker", "Bennett", "Price", "Griffiths", "Adams", "Wilkinson", "Ahmed", "Foster", "Powell", "Chapman", "Singh", "Webb", "Rogers", "Mason", "Gray", "Hunt", "Owen", "Matthews",
                "Palmer", "Holmes", "Mills", "Campbell", "Lloyd", "Barnes", "Knight", "Butler", "Russell", "Barker", "Stevens", "Jenkins", "Dixon", "Fisher", "Harvey", "Pearson", "Murray", "Graham", "Fletcher", "Howard",
                "Gibson", "Andrews", "Walsh", "Elliott", "Reynolds", "Saunders", "Ford", "Stewart", "Payne", "Fox", "Pearce", "Day", "Brooks", "Lawrence", "West", "Cole", "Atkinson", "Bradley", "Gill", "Spencer", "Ball",
                "Dawson", "Burton", "Watts", "Rose", "Booth", "Perry", "Wells", "O\"Brien", "Francis", "Rees", "Grant", "Hart", "Hudson", "Hayes", "Newman", "Ryan", "Webster", "Barrett", "Gregory", "Hunter", "Marsh", "Carr",
                "Riley", "Page", "Shah", "Woods", "Dunn", "Stone", "Berry", "Parsons", "Hawkins", "Harding", "Holland", "Porter", "Newton", "Oliver", "Reed", "Bird", "Reid"
            ]
        }
    },
    "ru": {
        "male": {
            "first": [
                "Александр", "Дмитрий", "Максим", "Сергей", "Андрей", "Алексей", "Артём","Илья", "Кирилл", "Михаил", "Никита", "Даниил", "Егор", "Матвей", "Роман",
                "Владимир", "Ярослав", "Фёдор", "Глеб", "Константин", "Павел", "Николай","Тимофей", "Георгий", "Лев", "Пётр", "Денис", "Владислав", "Антон", "Борис",
                "Иван", "Олег", "Руслан", "Виталий", "Виктор", "Григорий", "Евгений","Игорь", "Леонид", "Семён", "Степан", "Тихон", "Филипп", "Эдуард", "Юра",
                "Захар", "Мирон", "Давид", "Артур", "Арсений", "Святослав", "Всеволод","Платон", "Демьян", "Елисей", "Лаврентий", "Макар", "Назар", "Остап",
                "Родион", "Савелий", "Тарас", "Устин", "Харитон", "Чеслав", "Ян", "Адам","Альберт", "Анатолий", "Бронислав", "Вадим", "Валентин", "Валериан",
                "Вениамин", "Герман", "Гордей", "Еремей", "Зиновий", "Иннокентий","Казимир", "Клим", "Кузьма", "Любомир", "Мартин", "Мечислав", "Моисей",
                "Нестор", "Никанор", "Никодим", "Орест", "Панкрат", "Парамон", "Прохор","Ратмир", "Ростислав", "Севастьян", "Симон", "Соломон", "Трифон", "Федот",
                "Фома", "Эрнест", "Юлиан", "Яков"
            ],
            "last": [
                "Иванов", "Смирнов", "Кузнецов", "Попов", "Васильев", "Петров", "Соколов","Михайлов", "Новиков", "Фёдоров", "Морозов", "Волков", "Алексеев", "Лебедев",
                "Семёнов", "Егоров", "Павлов", "Козлов", "Степанов", "Николаев", "Орлов","Андреев", "Макаров", "Никитин", "Захаров", "Зайцев", "Соловьёв", "Борисов",
                "Яковлев", "Григорьев", "Романов", "Воронцов", "Сергеев", "Максимов","Соболев", "Блинов", "Власов", "Громов", "Гусев", "Жуков", "Журавлёв",
                "Зимин", "Кабанов", "Калинин", "Карпов", "Киселёв", "Клюев", "Комаров","Королёв", "Крылов", "Кудряшов", "Кулаков", "Куликов", "Лавров", "Лазарев",
                "Лебедев", "Леонов", "Литвинов", "Логинов", "Лосев", "Лукин", "Львов","Медведев", "Мельников", "Меркулов", "Миронов", "Митрофанов", "Молчанов",
                "Муравьёв", "Мухин", "Мясников", "Назаров", "Наумов", "Нестеров", "Никифоров","Одинцов", "Орехов", "Осипов", "Остапов", "Павленко", "Панкратов", "Парамонов",
                "Парфёнов", "Пахомов", "Пестов", "Пименов", "Пирогов", "Платонов", "Потапов","Прокофьев", "Прохоров", "Пугачёв", "Пушков", "Разин", "Разумов", "Родионов",
                "Рожков", "Румянцев", "Русаков", "Рыбаков", "Рябов", "Савельев", "Савин","Сазонов", "Сальников", "Самсонов", "Свешников", "Селезнёв", "Селиванов", "Семёнов"
            ],
            "patronymic": [
                "Александрович", "Дмитриевич", "Максимович", "Сергеевич", "Андреевич", "Алексеевич", "Артёмович", "Ильич", "Кириллович", "Михайлович", "Никитич",
                "Данилович", "Егорович", "Матвеевич", "Романович", "Владимирович", "Ярославович","Фёдорович", "Глебович", "Константинович", "Павлович", "Николаевич", "Тимофеевич",
                "Георгиевич", "Львович", "Петрович", "Денисович", "Владиславович", "Антонович","Борисович", "Иванович", "Олегович", "Русланович", "Витальевич", "Викторович",
                "Григорьевич", "Евгеньевич", "Игоревич", "Леонидович", "Семёнович", "Степанович","Тихонович", "Филиппович", "Эдуардович", "Юрьевич", "Захарович", "Миронович",
                "Давидович", "Артурович", "Арсеньевич", "Святославович", "Всеволодович","Платонович", "Демьянович", "Елисеевич", "Лаврентьевич", "Макарович", "Назарович",
                "Остапович", "Родионвич", "Савельевич", "Тарасович", "Устинович", "Харитонович","Чеславович", "Адамович", "Альбертович", "Анатольевич", "Брониславович",
                "Вадимович", "Валентинович", "Валерианович", "Вениаминович", "Германович","Гордеевич", "Еремеевич", "Зиновьевич", "Иннокентиевич", "Казимирович",
                "Климович", "Кузьмич", "Любомирович", "Мартинович", "Мечиславович", "Моисеевич", "Несторович", "Никанорович", "Никодимович", "Орестович", "Панкратович",
                "Парамонович", "Прохорович", "Ратмирович", "Ростиславович", "Севастьянович","Симонович", "Соломонович", "Трифонович", "Федотович", "Фомич", "Эрнестович",
                "Юлианович", "Яковлевич"
            ]
        },
        "female": {
            "first": [
                "Анна", "Мария", "Елена", "Ольга", "Наталья", "Ирина", "Татьяна", "Юлия", "Анастасия", "Дарья", "Виктория", "Елизавета", "Маргарита", "София", "Полина",
                "Александра", "Екатерина", "Ксения", "Алина", "Вероника", "Надежда", "Светлана","Людмила", "Любовь", "Галина", "Валентина", "Оксана", "Инна", "Милана", "Ева",
                "Агата", "Аделина", "Азалия", "Алёна", "Алиса", "Ангелина", "Анжела", "Белла", "Василиса", "Вера", "Диана", "Евгения", "Злата", "Карина", "Кира", "Кристина",
                "Лада", "Лариса", "Лиана", "Лидия", "Лилия", "Майя", "Марина", "Мирослава","Ника", "Нина", "Олеся", "Ольга", "Паулина", "Регина", "Рита", "Роза",
                "Роксана", "Руслана", "Сабина", "Сара", "Серафима", "Сильва", "Снежана","Стефания", "Тамара", "Ульяна", "Фаина", "Хлоя", "Эвелина", "Элеонора",
                "Эльвира", "Эльмира", "Эмилия", "Яна", "Ясмина", "Агафья", "Акулина", "Анфиса", "Варвара", "Василиса", "Глафира", "Домна", "Евдокия", "Ефросинья",
                "Зоя", "Иоанна", "Капитолина", "Клавдия", "Конкордия", "Мавра", "Матрёна", "Прасковья", "Феврония", "Харитина", "Хиба", "Цецилия", "Элиза", "Юдифь"
            ],
            "last": [
                "Иванова", "Смирнова", "Кузнецова", "Попова", "Васильева", "Петрова", "Соколова","Михайлова", "Новикова", "Фёдорова", "Морозова", "Волкова", "Алексеева", "Лебедева",
                "Семёнова", "Егорова", "Павлова", "Козлова", "Степанова", "Николаева", "Орлова","Андреева", "Макарова", "Никитина", "Захарова", "Зайцева", "Соловьёва", "Борисова",
                "Яковлева", "Григорьева", "Романова", "Воронцова", "Сергеева", "Максимова","Соболева", "Блинова", "Власова", "Громова", "Гусева", "Жукова", "Журавлёва",
                "Зимина", "Кабанова", "Калинина", "Карпова", "Киселёва", "Клюева", "Комарова","Королёва", "Крылова", "Кудряшова", "Кулакова", "Куликова", "Лаврова", "Лазарева",
                "Лебедева", "Леонова", "Литвинова", "Логинова", "Лосева", "Лукина", "Львова","Медведева", "Мельникова", "Меркулова", "Миронова", "Митрофанова", "Молчанова",
                "Муравьёва", "Мухина", "Мясникова", "Назарова", "Наумова", "Нестерова", "Никифорова","Одинцова", "Орехова", "Осипова", "Остапова", "Павленко", "Панкратова", "Парамонова",
                "Парфёнова", "Пахомова", "Пестова", "Пименова", "Пирогова", "Платонова", "Потапова","Прокофьева", "Прохорова", "Пугачёва", "Пушкова", "Разина", "Разумова", "Родионова",
                "Рожкова", "Румянцева", "Русакова", "Рыбакова", "Рябова", "Савельева", "Савина","Сазонова", "Сальникова", "Самсонова", "Свешникова", "Селезнёва", "Селиванова", "Семёнова"
            ],
            "patronymic": [
                "Александровна", "Дмитриевна", "Максимовна", "Сергеевна", "Андреевна","Алексеевна", "Артёмовна", "Ильинична", "Кирилловна", "Михайловна", "Никитична",
                "Даниловна", "Егоровна", "Матвеевна", "Романовна", "Владимировна", "Ярославовна","Фёдоровна", "Глебовна", "Константиновна", "Павловна", "Николаевна", "Тимофеевна",
                "Георгиевна", "Львовна", "Петровна", "Денисовна", "Владиславовна", "Антоновна","Борисовна", "Ивановна", "Олеговна", "Руслановна", "Витальевна", "Викторовна",
                "Григорьевна", "Евгеньевна", "Игоревна", "Леонидовна", "Семёновна", "Степановна","Тихоновна", "Филипповна", "Эдуардовна", "Юрьевна", "Захаровна", "Мироновна",
                "Давидовна", "Артуровна", "Арсеньевна", "Святославовна", "Всеволодовна","Платоновна", "Демьяновна", "Елисеевна", "Лаврентьевна", "Макаровна", "Назаровна",
                "Остаповна", "Родионовна", "Савельевна", "Тарасовна", "Устиновна", "Харитоновна","Чеславовна", "Адамовна", "Альбертовна", "Анатольевна", "Брониславовна",
                "Вадимовна", "Валентиновна", "Валериановна", "Вениаминовна", "Германовна","Гордеевна", "Еремеевна", "Зиновьевна", "Иннокентиевна", "Казимировна",
                "Климовна", "Кузьминична", "Любомировна", "Мартиновна", "Мечиславовна", "Моисеевна","Несторовна", "Никаноровна", "Никодимовна", "Орестовна", "Панкратовна",
                "Парамоновна", "Прохоровна", "Ратмировна", "Ростиславовна", "Севастьяновна","Симоновна", "Соломоновна", "Трифоновна", "Федотовна", "Фоминична", "Эрнестовна",
                "Юлиановна", "Яковлевна"
            ]
        }
    }
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomFullName(langCode = 'en') {
    const data = namesByLang[langCode];
    if (!data) {
        throw new Error(`"${langCode}" names are not supported. Available: ${Object.keys(namesByLang).join(', ')}`);
    }

    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const personData = data[gender];

    if (!personData || !personData.first || !personData.last) {
        throw new Error(`Invalid data structure for language "${langCode}"`);
    }

    const first = getRandomItem(personData.first);
    const last = getRandomItem(personData.last);

    let middle = '';
    let patronymic = '';

    if (personData.middle && personData.middle.length > 0) {
        middle = getRandomItem(personData.middle);
    }

    if (langCode === 'ru' && personData.patronymic && personData.patronymic.length > 0) {
        patronymic = getRandomItem(personData.patronymic);
    }

    let result;

    switch (langCode) {
        case 'en':
            result = `${first}${middle ? ' ' + middle : ''} ${last}`;
            break;
        case 'de':
            result = `${last} ${first}`;
            break;
        case 'fr':
            result = `${last} ${first}`;
            break;
        case 'es':
            result = `${last}${middle ? ' ' + middle : ''} ${first}`;
            break;
        case 'ru':
            result = `${last} ${first}${patronymic ? ' ' + patronymic : ''}`;
            break;
        case 'be':
            result = `${last} ${first}`;
            break;
        case 'ua':
            result = `${last} ${first}`;
            break;
        case 'kz':
            result = `${last} ${first}`;
            break;
        default:
            result = 'Anonymous';
    }

    return result;
}

function generateRandomFullNames(count, langCode = 'en') {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(generateRandomFullName(langCode));
    }
    return result;
}

function fillRandomName(langCode = 'en') {
    try {
        const person = generateRandomFullName(langCode);

        const input = document.getElementById('InputName');

        if (input) {
            input.value = person;

            input.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.error('Поле #InputName не найдено!');
        }
    } catch (e) {
        console.error(e);
        alert('Ошибка генерации имени: ' + e.message);
    }
}

function randomEmail() {
    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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