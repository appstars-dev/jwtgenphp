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
function send_tg(btnid, inputid, tgmodhost, tgapikey) {
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
            if (!tgmodhost) {
                alert('Can not send by api, no host');
                return;
            }
            promise = fetch(tgmodhost + '/api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'X-API-KEY': tgapikey },
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
                alert('Queued');
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
    "de":{
      "male":{
          "first":[
              "Adam", "Adalbert", "Alois", "Anselm", "Anton", "Armin", "Arnold", "August", "Benno", "Bruno", "Carl", "Caspar", "Christian", "Claus", "Conrad", "Cornelius", "Dietrich", "Dieter", "Dominik", "Edgar", "Edmund",
              "Emil", "Emmerich", "Erich", "Ernst", "Felix", "Florian", "Franz", "Friedrich", "Fritz", "Günther", "Gustav", "Hans", "Hartmut", "Hartwin", "Heinrich", "Heinz", "Helmut", "Hermann", "Hildebrand", "Hugo", "Ignaz",
              "Jakob", "Johann", "Josef", "Jürgen", "Karl", "Klaus", "Konrad", "Lambert", "Leopold", "Lukas", "Ludwig", "Magnus", "Manfred", "Marcel", "Martin", "Matthias", "Max", "Maximilian", "Moritz", "Norbert", "Oskar",
              "Otto", "Paul", "Peter", "Philipp", "Reinhard", "Rolf", "Rudolf", "Siegfried", "Siegmund", "Stefan", "Theodor", "Theo", "Till", "Ulrich", "Valentin", "Viktor", "Volker", "Walter", "Werner", "Wilhelm", "Willi",
              "Wolfgang", "Wulf", "Xaver", "Zacharias"
          ],
          "last":[
              "Müller", "Schmidt", "Schneider", "Fischer", "Meyer", "Weber", "Wagner", "Becker", "Schulz", "Hoffmann", "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann",
              "Braun", "Krüger", "Hofmann", "Hartmann", "Lange", "Schmitt", "Werner", "Schultz", "Schulte", "König", "Krause", "Lehmann", "Schmitt", "Maier", "Kaiser", "Fuchs", "Peters", "Jansen", "Schubert", "Mayer", "Schulze",
              "Vogel", "Jung", "Herrmann", "Groß", "Kuhn", "Schreiner", "Stein", "Berg", "Friedrich", "Schön", "Thiel", "Döring", "Reich", "Engel", "Niemann", "Sauer", "Kramer", "Pohl", "Lorenz", "Meier", "Roth", "Scholz", "Winkler",
              "Gerhardt", "Lang", "Böhm", "Dietrich", "Eberhardt", "Hahn", "Otto", "Schilling", "Baumann", "Keller", "Schramm", "Hagen", "Stolz", "Günther", "Wirth", "Heyer", "Lindner", "Brandt", "Seidel", "Kapp", "Mühlbauer",
              "Schlegel", "Wagner", "Ziegler", "Bender", "Kühn", "Ritter", "Schmid", "Tietz", "Voigt", "Wendt", "Ziegler"
          ],
      },
        "female":{
            "first":[
                "Ada", "Adel", "Adelheid", "Agnes", "Alma", "Amalia", "Angelika", "Anke", "Anna", "Anneliese", "Annika", "Astrid", "Barbara", "Beate", "Beatrix", "Berta", "Birgit", "Brigitte", "Carola", "Caroline",
                "Charlotte", "Christa", "Christina", "Clara", "Claudia", "Cornelia", "Dagmar", "Diana", "Doris", "Dorothea", "Edda", "Edith", "Elfriede", "Elke", "Ella", "Elisabeth", "Elsa", "Emilie", "Emma", "Erna", "Eva",
                "Felicitas", "Frieda", "Gabriele", "Gertrud", "Gisela", "Greta", "Hanna", "Hannelore", "Hedwig", "Heidi", "Helga", "Helene", "Hertha", "Ilse", "Inge", "Ingeborg", "Ingrid", "Irmgard", "Irma", "Isolde", "Johanna",
                "Josefine", "Julia", "Karin", "Katarina", "Katja", "Kerstin", "Klara", "Kristin", "Lena", "Leonie", "Lieselotte", "Lilli", "Lina", "Linda", "Lotte", "Luise", "Magdalena", "Marga", "Margarete", "Marlene", "Martha",
                "Martina", "Mathilde", "Meta", "Mia", "Minna", "Nadia", "Nora", "Ottilie", "Petra", "Renate", "Rita", "Sabine", "Saskia", "Silke", "Sonja", "Stefanie", "Susanne", "Tanja", "Therese", "Ursula", "Verena", "Victoria",
                "Viola", "Waltraud", "Wiebke", "Wilhelmine", "Yvonne", "Zoe"
            ],
            "last":[
                "Abel", "Ackermann", "Ahl", "Albrecht", "Altmann", "Appel", "Arndt", "Baade", "Baum", "Baumann", "Bayer", "Beck", "Behrens", "Berger", "Bernhardt", "Betz", "Binder", "Blum", "Böhm", "Brand", "Braunschweig",
                "Breuer", "Bruck", "Büchner", "Bürger", "Damm", "Danziger", "Deininger", "Demuth", "Dick", "Dinkel", "Doering", "Dorn", "Eber", "Eck", "Eder", "Ehrlich", "Endres", "Engels", "Ernst", "Faßbender", "Fehr", "Feld",
                "Fellner", "Finke", "Flader", "Fleischer", "Forster", "Fröhlich", "Gabler", "Gaertner", "Geiger", "Gerlach", "Giese", "Glück", "Götz", "Grau", "Greiner", "Grimm", "Grothe", "Günther", "Hack", "Hagen", "Hahn",
                "Hamann", "Hartung", "Heinrich", "Held", "Herzog", "Hilbert", "Hinz", "Hofer", "Holz", "Hübner", "Jäger", "Jung", "Kalb", "Kampf", "Keil", "Kessler", "Kirchhoff", "Kluge", "Knecht", "Koch", "König", "Kraemer",
                "Krull", "Lambert", "Langen", "Leipold", "Lenz", "Lieb", "Lohmann", "Lorenz", "Maas", "Marx", "Meinhardt", "Mertens", "Meyer", "Mohr", "Müller", "Nachtigall", "Neidhardt", "Nickel", "Obermayer", "Oelrich", "Pauly",
                "Pfeiffer", "Plath", "Quandt", "Radtke", "Reh", "Richter", "Rohde", "Roth", "Sachs", "Schäfer", "Schiller", "Schmitt", "Schönfeld", "Schreiber", "Schubert", "Seidel", "Sommer", "Stahl", "Steinbach", "Thiel", "Trapp",
                "Ullrich", "Vogel", "Wagner", "Weiss", "Werner", "Winter", "Ziegler"
            ],
        },
    },
    "fr":{
        "male":{
            "first":[
                "Abel", "Adrien", "Alain", "Alexandre", "Alfred", "Amédée", "André", "Antoine", "Arnaud", "Auguste", "Aymar", "Baptiste", "Benoît", "Bernard", "Bertrand", "Cédric", "Charles", "Christian", "Claude", "Clément",
                "Corentin", "Damien", "Daniel", "Denis", "Didier", "Dominique", "Édouard", "Émile", "Éric", "Fabien", "Félix", "Florian", "François", "Frédéric", "Gabriel", "Gaël", "Gaspard", "Gaston", "Georges", "Gérard", "Grégoire",
                "Guillaume", "Guy", "Hector", "Henri", "Hippolyte", "Hugues", "Isidore", "Jacques", "Jérôme", "Joachim", "Johan", "Joseph", "Jules", "Julien", "Justin", "Léandre", "Léo", "Louis", "Luc", "Lucien", "Ludovic", "Marcel",
                "Marc", "Martin", "Mathieu", "Maxence", "Maximilien", "Maurice", "Mickaël", "Nathan", "Nicolas", "Noé", "Olivier", "Oscar", "Paul", "Pierre", "Quentin", "Raphaël", "René", "Richard", "Robert", "Rodolphe", "Roger",
                "Sébastien", "Simon", "Stéphane", "Théodore", "Thibault", "Thierry", "Timothée", "Urbain", "Valentin", "Victor", "Vincent", "Xavier", "Yann", "Yves", "Zacharie"
            ],
            "last":[
                "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon", "Michel", "Lefebvre", "Legrand", "Fournier", "Martin", "Garcia", "David", "Bertrand", "Roux", "Vincent",
                "Fournier", "Mercier", "Lambert", "Fontaine", "Rousseau", "Vincent", "Fischer", "Clément", "Maillard", "Guérin", "Boivin", "Mercier", "Roy", "Gauthier", "Perrin", "Leblanc", "Aubert", "Chevalier", "Moulin", "Girard",
                "Brun", "Dupont", "Leroy", "Morin", "Blanc", "Fournier", "Tessier", "Caron", "Faure", "Gagnon", "Boucher", "Plamondon", "Tremblay", "Côté", "Bélanger", "Simard", "Gagné", "Fortin", "Dion", "Lavoie", "Tardif", "Gravel",
                "Lessard", "Paradis", "Beaulieu", "Charbonneau", "Gaudreault", "Hébert", "Pelletier", "Gagnon", "Demers", "Langlois", "Ouellet", "Bouchard", "Lapointe", "Gendron", "Lachance", "Ducharme", "Lafontaine", "Lamarche",
                "Goyer", "Blais", "Dubeau", "Martel", "Gagnon", "Lévesque", "Séguin", "Tanguay", "Bourassa", "Gosselin", "Lebel", "Charest", "Bisaillon", "Desjardins", "Hamel", "Labbé", "Nadeau", "Parent", "Royer", "Savard", "Trempe",
                "Vallée", "Zimmermann"
            ],
        },
        "female":{
            "first":[
                "Adèle", "Agathe", "Aïda", "Albine", "Alix", "Alice", "Alma", "Amandine", "Amélie", "Anaïs", "Andrée", "Angélique", "Anouk", "Antoinette", "Apolline", "Ariane", "Aurore", "Béatrice", "Bernadette", "Berthe",
                "Blandine", "Camille", "Capucine", "Carine", "Céleste", "Céline", "Chantal", "Charline", "Charlotte", "Clara", "Clémence", "Colette", "Constance", "Coralie", "Cécile", "Daphné", "Delphine", "Denise", "Dorothée",
                "Édith", "Éléonore", "Élise", "Émilie", "Éva", "Ève", "Fanny", "Faustine", "Florence", "Flora", "Françoise", "Frédérique", "Gabrielle", "Gaëlle", "Geneviève", "Germaine", "Hélène", "Hortense", "Irène", "Jacqueline",
                "Jade", "Jeanne", "Josette", "Juliette", "Justine", "Léa", "Léonie", "Lila", "Lilou", "Lina", "Line", "Lou", "Louise", "Lucie", "Ludivine", "Magali", "Madeleine", "Manon", "Marcelle", "Margaux", "Margot", "Marguerite",
                "Marie", "Marion", "Mathilde", "Maëlys", "Mélanie", "Mireille", "Myriam", "Nathalie", "Océane", "Odette", "Paulette", "Pauline", "Pénélope", "Renée", "Roxane", "Sabine", "Salomé", "Sandrine", "Sophie", "Stéphanie",
                "Suzanne", "Thaïs", "Thérèse", "Valérie", "Victoire", "Virginie", "Yolande", "Zoé"
            ],
            "last":[
                "Allard", "Arnaud", "Aubertin", "Barbier", "Barthélémy", "Beauchamp", "Beaulieu", "Beaumont", "Beauvais", "Bellanger", "Belleau", "Benoît", "Bergeron", "Besnard", "Besson", "Binet", "Blanchard", "Boileau",
                "Bonnet", "Bossuet", "Boulanger", "Bourdon", "Boutin", "Brémond", "Brunet", "Buffet", "Cabanis", "Cadet", "Calvet", "Carré", "Chabrol", "Chambon", "Chapuis", "Charpentier", "Cheval", "Colin", "Comte", "Cordier",
                "Cousin", "Damien", "Dangé", "Delacroix", "Delamarre", "Delaplace", "Delorme", "Deschamps", "Desjardins", "Desmarais", "Devaux", "Dufour", "Duguet", "Duparc", "Duplessis", "Durieux", "Espinasse", "Fabre",
                "Falcon", "Ferret", "Filion", "Fournier", "Fresnay", "Gagnon", "Garnier", "Gaubert", "Gendreau", "Giroux", "Godard", "Grandjean", "Guichard", "Guyon", "Hamon", "Hardy", "Hébert", "Huard", "Jacquot", "Joly",
                "Keller", "Labonté", "Lacroix", "Lafayette", "Lamarche", "Langevin", "Lanoix", "Leblond", "Leclerc", "Lefort", "Lemieux", "Lenoir", "Leroux", "Lévesque", "Magnan", "Maillet", "Mainville", "Marceau", "Maréchal",
                "Mercier", "Mesplet", "Morel", "Moulinet", "Nadeau", "Ollivier", "Paquet", "Paré", "Pépin", "Perrault", "Picard", "Pinard", "Plante", "Poirier", "Quemener", "Renard", "Renaud", "Richard", "Robert", "Rolland",
                "Royer", "Saindon", "Savoie", "Seguin", "Simonet", "Tessier", "Thibodeau", "Trudeau", "Valois", "Vallier", "Vernet", "Vincent", "Wattel", "Yvon"
            ],
        },
    },
    "es":{
        "male":{
            "first":[
                "Aarón", "Adán", "Adrián", "Agustín", "Alberto", "Alfonso", "Alfredo", "Alejandro", "Alejo", "Aitor", "Amadeo", "Amador", "Andrés", "Anselmo", "Antonio", "Aquilino", "Armand", "Arnaldo", "Arturo", "Álvaro",
                "Baldomero", "Baltasar", "Bartolomé", "Benito", "Bernardo", "Blas", "Braulio", "Camilo", "Carlos", "Cayetano", "Claudio", "Cristóbal", "Damián", "Daniel", "Darío", "Diego", "Domingo", "Donato", "Eduardo", "Elías",
                "Emilio", "Enrique", "Erasmo", "Ernesto", "Esteban", "Eugenio", "Ezequiel", "Fausto", "Fernando", "Fidel", "Florencio", "Francisco", "Fulgencio", "Gabriel", "Gaspár", "Germán", "Gonzalo", "Guillermo", "Héctor",
                "Hugo", "Ignacio", "Iker", "Inocencio", "Isidro", "Iván", "Jacinto", "Jaime", "Javier", "Jerónimo", "Joaquín", "Jonás", "José", "Juan", "Julián", "Julio", "Justo", "Leandro", "Leonardo", "Leoncio", "Lorenzo",
                "Luis", "Manuel", "Marcos", "Marcelino", "Martín", "Mateo", "Mauricio", "Maximiliano", "Miguel", "Narciso", "Nicolás", "Óscar", "Pablo", "Pedro", "Rafael", "Ramiro", "Ramon", "Raúl", "Ricardo", "Roberto",
                "Rodrigo", "Román", "Rubén", "Salvador", "Samuel", "Santiago", "Sergio", "Silvestre", "Simón", "Teodoro", "Tomás", "Vicente", "Víctor", "Xavier", "Yago", "Zacarías"
            ],
            "last":[
                "García", "Rodríguez", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Muñoz", "Alonso", "Gutiérrez", "Romero",
                "Navarro", "Torres", "Domínguez", "Vázquez", "Ramos", "Gil", "Vargas", "Molina", "Ortiz", "Delgado", "Ortega", "Castillo", "Rodrigo", "Calvo", "Castro", "Bravo", "Méndez", "Iglesias", "Santos",
                "Núñez", "Medina", "Serrano", "Lorenzo", "Marín", "Velasco", "Barrera", "Fuentes", "Carrasco", "Mendoza", "Aguilar", "Herrera", "Prieto", "Suárez", "Salazar", "Cortés", "Valencia", "Quintana",
                "Beltrán", "Lara", "Márquez", "Soler", "Ferrer", "Blanco", "Morales", "Izquierdo", "Redondo", "Pascual", "Benítez", "Gallardo", "Esteban", "Santamaría", "Ledesma", "Arroyo", "Vega", "Cano",
                "Salvador", "Segura", "Tejada", "Zamora", "Crespo", "Montero", "Palacios", "Ramírez", "Soto", "Encinas", "Gallego", "Pardo", "Alvarado", "Valle", "Ceballos", "Lozano", "Fuster", "Urbina",
                "Zapata", "Verdejo", "Cordero", "Montoya", "Reyes", "León", "Cabrera", "Espinoza", "Figueroa"
            ],
        },
        "female":{
            "first":[
                "Abril", "Adela", "Adriana", "Agustina", "Aina", "Alba", "Alejandra", "Almudena", "Amalia", "Amanda", "Ana", "Andrea", "Ángela", "Angélica", "Antonia", "Aitana", "Arantxa", "Aurora", "Bárbara",
                "Belén", "Blanca", "Brígida", "Carmen", "Carla", "Carolina", "Catalina", "Clara", "Claudia", "Concepción", "Cristina", "Celia", "Cintia", "Cayetana", "Daniela", "Dafne", "Dolores", "Elena", "Elisa",
                "Elsa", "Esperanza", "Estela", "Esther", "Eva", "Fátima", "Felicia", "Fernanda", "Francisca", "Gabriela", "Gala", "Gracia", "Graciela", "Hortensia", "Irene", "Irma", "Isabel", "Isabella", "Itziar",
                "Jacinta", "Jimena", "Josefa", "Juana", "Julia", "Julieta", "Leticia", "Leire", "Lola", "Lucía", "Luisa", "Macarena", "Manuela", "María", "Marina", "Marta", "Matilde", "Miriam", "Nerea", "Nuria",
                "Olga", "Paloma", "Paula", "Pilar", "Rebeca", "Remedios", "Rosa", "Rosario", "Ruth", "Sagrario", "Sara", "Silvia", "Sol", "Sofía", "Susana", "Teresa", "Triana", "Úrsula", "Valeria", "Vanessa",
                "Verónica", "Victoria", "Violeta", "Yolanda", "Zoe"
            ],
            "last":[
                "Abad", "Abascal", "Aguado", "Aguirre", "Alarcón", "Albéniz", "Alcalá", "Aldana", "Aldea", "Alfaro", "Almagro", "Alonso", "Altamirano", "Amaya", "Andrade", "Angulo", "Aranda", "Arias", "Arjona",
                "Armijo", "Arroyo", "Asensio", "Azcona", "Baeza", "Balaguer", "Barajas", "Barceló", "Barranco", "Barrios", "Basulto", "Belmonte", "Benavente", "Berlanga", "Bernal", "Betancor", "Blázquez", "Bonet",
                "Borrego", "Botella", "Bravo", "Burgos", "Cabañas", "Cadena", "Calatrava", "Calvo", "Camacho", "Campo", "Cantó", "Caparrós", "Carbajal", "Cardona", "Carrasco", "Casado", "Castañeda", "Castellanos",
                "Catalán", "Cebrián", "Chacón", "Collado", "Colmenero", "Concha", "Corbacho", "Cortijo", "Cruz", "Cubero", "Dávila", "De la Cruz", "Delgado", "Díez", "Durán", "Echevarría", "Egido", "Elías", "Enciso",
                "Escobar", "Espinosa", "Estévez", "Ezcurra", "Falcón", "Fernández", "Ferrer", "Figueroa", "Flores", "Fonseca", "Franco", "Fuente", "Gálvez", "Garay", "Garrido", "Gil", "Godoy", "Granados", "Guardiola",
                "Guerra", "Gutiérrez", "Hidalgo", "Hurtado", "Ibáñez", "Izaguirre", "Jiménez", "Jurado", "Lago", "Lamas", "Landa", "Lara", "León", "Linares", "López", "Luna", "Machado", "Madariaga", "Maldonado",
                "Manzano", "Marín", "Martín", "Medrano", "Meléndez", "Menéndez", "Mendoza", "Merino", "Mesía", "Molina", "Montero", "Montoya", "Morales", "Moreno", "Muñoz", "Naranjo", "Navarro", "Nieto", "Ocaña",
                "Ochoa", "Olivares", "Ortiz", "Pacheco", "Padilla", "Palacios", "Parra", "Pastor", "Pedraza", "Peña", "Peralta", "Pérez", "Piñeiro", "Pizarro", "Plaza", "Portillo", "Prieto", "Puente", "Quintero",
                "Ramírez", "Ramos", "Redondo", "Reguera", "Rey", "Ríos", "Robles", "Rodríguez", "Romero", "Ruano", "Ruiz", "Saez", "Salas", "Saldaña", "Sanabria", "Santana", "Santos", "Saucedo", "Segovia", "Sevilla",
                "Silva", "Solano", "Soler", "Suárez", "Tejada", "Toribio", "Trujillo", "Ureña", "Valdés", "Vallejo", "Vargas", "Velasco", "Vera", "Vicente", "Vidal", "Vila", "Zambrano", "Zaragoza"
            ],
        },
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
    },
    "be":{
        "male":{
            "first":[
                "Адам", "Аляксей", "Альгерд", "Аляксандр", "Андрэй", "Антон", "Аркадзь", "Арцём", "Барыс", "Багдан", "Вадзім", "Валерый", "Валер'ян", "Валянцін", "Васіль",
                "Віктар", "Віталь", "Вікенцій", "Вячаслаў", "Гаўрыла", "Генадзь", "Георгій", "Глеб", "Давід", "Даніла", "Дзмітрый", "Дзяніс", "Еўстах", "Захар", "Іван", "Ігар",
                "Ігнат", "Ілья", "Казімір", "Канстанцін", "Кірыла", "Ксёнтас", "Кузьма", "Леанід", "Лявон", "Лукаш", "Максім", "Марцін", "Мікалай", "Мікіта", "Міхаіл", "Міхал",
                "Навум", "Нічыпар", "Олег", "Павел", "Пётр", "Піліп", "Раман", "Расціслаў", "Рыгор", "Руслан", "Савелей", "Саламон", "Сяргей", "Сцяпан", "Сямён", "Тарас", "Тэадор",
                "Трафім", "Уладзімір", "Уладзіслаў", "Фабіян", "Фёдар", "Фядосій", "Хвядосар", "Цімафей", "Ціхан", "Эдуард", "Юліян", "Юрый", "Ягор", "Якуб", "Яраслаў", "Ян", "Яўген",
                "Яфім", "Яфрэм", "Авер", "Агап", "Амос", "Анань", "Андрон", "Анціп", "Аркадзь", "Арыст", "Баляслаў", "Браніслаў", "Варфаламей", "Венедыкт", "Вінцэнт", "Гарыслаў",
                "Герасім", "Дамінік", "Дыякон", "Ефрасін", "Ждан", "Зміцер", "Кандрат", "Крыштоф", "Макар", "Мечыслаў", "Мітрафан", "Назарыя", "Пахом", "Пракоп", "Радзівон", "Радзім", "Станіслаў"
            ],
            "last":[
                "Адамович", "Азаренко", "Азарёнок", "Аксенёнок", "Алехно", "Андрукевич", "Бабарико", "Бабич", "Баланович", "Балицкий", "Барановский", "Беланович", "Белоус", "Березюк",
                "Богинский", "Боровик", "Бровка", "Бутько", "Вабищевич", "Василевский", "Васюченко", "Вечёрко", "Вольский", "Высоцкий", "Вячорка", "Гаврукович", "Галаган", "Галуза",
                "Герасимович", "Гиль", "Голик", "Горбатюк", "Громыко", "Гуринович", "Дайнеко", "Данилевич", "Дашкевич", "Дятлович", "Ермакович", "Жавнерович", "Жук", "Забелинский",
                "Залесский", "Заревич", "Зеленский", "Зенькович", "Зубаревич", "Ивашко", "Исаченко", "Кабанец", "Калиновский", "Каминский", "Капленко", "Карницкий", "Карпович",
                "Карский", "Качан", "Кебич", "Кириенко", "Клим", "Клинковский", "Ковалевский", "Коваль", "Ковальчук", "Кожемяко", "Козел", "Концевич", "Корбан", "Корнелюк",
                "Короткевич", "Космач", "Красковский", "Криушенко", "Крупский", "Крутько", "Кулик", "Курбыко", "Курлович", "Левицкий", "Лисовский", "Лукашевич", "Лютый", "Лях",
                "Ляхович", "Макаревич", "Малиновский", "Маркевич", "Мартынович", "Матюшенко", "Милевский", "Мицкевич", "Могилевский", "Муравицкий", "Мураховский", "Мурашко",
                "Навоша", "Ничипорчук", "Новицкий", "Павловец", "Пазынич", "Паньковский", "Пастернак", "Петкевич", "Пилецкий", "Поддубный", "Позняк", "Полещук", "Полищук",
                "Поплавский", "Прокопович", "Протасевич", "Пушкаревич", "Радзюкевич", "Радкевич", "Репецкий", "Романовский", "Рудковский", "Рыбак", "Савич", "Самусенко",
                "Сапоненко", "Сахоненко", "Семеновский", "Сенкевич", "Синявский", "Смоктунович", "Соболевский", "Соколовский", "Солоневич", "Соснович", "Старовойт", "Стефанович",
                "Таранда", "Тараненко", "Тарасевич", "Тиханович", "Трофименко", "Трофимович", "Тычина", "Тышкевич", "Филипенко", "Хомич", "Чайка", "Чижевский", "Шахлович",
                "Шеремет", "Шпак", "Шуляк", "Шушкевич", "Щербицкий", "Щербо", "Юденич", "Яроцкий"
            ],
        },
        "female":{
            "first":[
                "Агрыпіна", "Агата", "Агапія", "Адар’я", "Ала", "Алена", "Алеся", "Аліса", "Алімпіяда", "Аляксандра", "Альбіна", "Альдона", "Амалія", "Анастасія", "Ангеліна", "Антаніна",
                "Антонія", "Аполінарыя", "Арына", "Барбара", "Багуміла", "Багуслава", "Бірута", "Блакітна", "Богдана", "Богуміла", "Богуслава", "Борыслава", "Браняслава", "Валянціна", "Валерыя",
                "Варвара", "Вацлава", "Вера", "Вераніка", "Вікторыя", "Віталіна", "Вольга", "Вячаслава", "Галіна", "Ганна", "Гражына", "Дар’я", "Дамініка", "Дзіна", "Добраслава", "Добраміра",
                "Ева", "Еўфрасіння", "Екацярына", "Елізавета", "Жанна", "Зінаіда", "Зося", "Іна", "Ірына", "Казіміра", "Каліста", "Кацярына", "Кіра", "Клара", "Ксэнія", "Ларыса", "Лідзія",
                "Лізавета", "Лілія", "Ліліт", "Любава", "Любаміра", "Любоў", "Людміла", "Магдаліна", "Майя", "Маланья", "Марына", "Марыя", "Марфа", "Маўра", "Мілана", "Мілавіда", "Мілагрода",
                "Мірдзіта", "Надзежда", "Настасся", "Наталя", "Ніна", "Параскева", "Паліна", "Паўліна", "Пелагея", "Праскоўя", "Рагнеда", "Раіса", "Расціслава", "Ружана", "Саламея", "Святаслава",
                "Святлана", "Серафіма", "Сімона", "Софія", "Станіслава", "Стэфанія", "Таісія", "Тамара", "Таццяна", "Уладзіслава", "Усціння", "Фаіна", "Фёкла", "Фядора", "Хрысціна", "Часлава",
                "Шэрына", "Эльвіра", "Эліна", "Эмілія", "Юлія", "Яна", "Яраслава"
            ],
            "last":[
                "Абрамова", "Азаренкова", "Азарёнкова", "Аксенёнкова", "Алехнова", "Андрукевичова", "Бабарикова", "Бабичева", "Балановичова", "Балицкая", "Барановская", "Белановичова", "Белоусова",
                "Березюкова", "Богинская", "Боровик", "Бровка", "Бутькова", "Вабищевичова", "Василевская", "Васюченкова", "Вечёркова", "Вольская", "Высоцкая", "Вячорка", "Гавруковичова", "Галаганова",
                "Галузова", "Герасимовичова", "Гиль", "Голикова", "Горбатюкова", "Громыкова", "Гуриновичова", "Дайнеко", "Данилевичова", "Дашкевичова", "Дятловичова", "Ермаковичова", "Жавнеровичова",
                "Жук", "Забелинская", "Залесская", "Заревичова", "Зеленская", "Зеньковичова", "Зубаревичова", "Ивашкова", "Исаченкова", "Кабанец", "Калиновская", "Каминская", "Капленко", "Карницкая",
                "Карповичова", "Карская", "Качан", "Кебичева", "Кириенкова", "Клим", "Клинковская", "Ковалевская", "Коваль", "Ковальчук", "Кожемяко", "Козел", "Концевичова", "Корбан", "Корнелюк",
                "Короткевичова", "Космач", "Красковская", "Криушенко", "Крупская", "Крутькова", "Кулик", "Курбыкова", "Курловичова", "Левицкая", "Лисовская", "Лукашевичова", "Лютая", "Лях",
                "Ляховичова", "Макаревичова", "Малиновская", "Маркевичова", "Мартыновичова", "Матюшенкова", "Милевская", "Мицкевичова", "Могилевская", "Муравицкая", "Мураховская", "Мурашко",
                "Навоша", "Ничипорчукова", "Новицкая", "Павловец", "Пазынич", "Паньковская", "Пастернак", "Петкевичова", "Пилецкая", "Поддубная", "Позняк", "Полещук", "Полищук", "Поплавская",
                "Прокоповичова", "Протасевичова", "Пушкаревичова", "Радзюкевичова", "Радкевичова", "Репецкая", "Романовская"
            ],
        },
    },
    "ua":{
        "male":{
            "first":[
                "Августин", "Агап", "Адріан", "Алексій", "Олександр", "Олексій", "Альоша", "Андрій", "Антон", "Аркадій", "Арсен", "Артем", "Артемий", "Архіп", "Богдан", "Болеслав", "Борис",
                "Братислав", "Броніслав", "Вадим", "Валентин", "Валерій", "Василь", "Венедикт", "Вениамин", "Віктор", "Віталій", "Віталіс", "Віценцій", "Володимир", "Всеволод", "Всеслав", "Гаврило",
                "Гнат", "Гордій", "Григорій", "Давид", "Данило", "Дем'ян", "Денис", "Дмитро", "Дорофій", "Євген", "Єлисей", "Єфрем", "Захар", "Зиновій", "Златодан", "Іван", "Ігор", "Ілля", "Йосип",
                "Каленик", "Каленик", "Карпо", "Кирило", "Клим", "Кость", "Кузьма", "Лаврентій", "Лев", "Левко", "Леонід", "Любомир", "Макар", "Максим", "Марк", "Матвій", "Микита", "Микола", "Мирон",
                "Михайло", "Назар", "Наум", "Нестор", "Остап", "Павло", "Пантелеймон", "Парамон", "Петро", "Пимен", "Пилип", "Платон", "Прокіп", "Радомир", "Роман", "Ростислав", "Руслан", "Сава",
                "Савелій", "Святослав", "Семен", "Сергій", "Сидір", "Сильвестр", "Софрон", "Станіслав", "Степан", "Тарас", "Тимофій", "Тихон", "Трохим", "Устим", "Федір", "Феликс", "Филимон", "Юхим",
                "Юрій", "Яків", "Ярослав"
            ],
            "last":[
                "Абрамчук", "Авдеенко", "Аверченко", "Авраменко", "Адаменко", "Адамчук", "Александрюк", "Алексеенко", "Алексенко", "Андриенко", "Андрейченко", "Андрейчук", "Антоненко", "Антонюк",
                "Артёменко", "Архипенко", "Бабенко", "Бабич", "Бабченко", "Байрак", "Баланенко", "Барабаш", "Бартош", "Безручко", "Березюк", "Білоус", "Бондаренко", "Бондарчук", "Боженко", "Божко",
                "Бойко", "Бойченко", "Борзенко", "Борисенко", "Боровик", "Бублик", "Бугай", "Будник", "Буняк", "Вакарчук", "Василенко", "Васильченко", "Ващенко", "Величко", "Вербицкий", "Вернигора",
                "Винник", "Вишневский", "Вовк", "Возняк", "Войтенко", "Волошин", "Вольский", "Воронко", "Воронько", "Гавриленко", "Гаврилюк", "Галасюк", "Ганущак", "Герасименко", "Герман", "Гетьман",
                "Гладун", "Голуб", "Гоцул", "Гриценко", "Гуменюк", "Дацюк", "Демченко", "Денисенко", "Дмитрук", "Довбенко", "Дорошенко", "Дубина", "Дяченко", "Еременко", "Жуковский", "Жук",
                "Завгородний", "Задорожный", "Захарченко", "Зинченко", "Зубенко", "Иващенко", "Ильченко", "Калашник", "Калиниченко", "Кальченко", "Канюка", "Карпенко", "Касьяненко", "Кваснюк",
                "Кириленко", "Клименко", "Коваленко", "Коваль", "Коврига", "Колесник", "Коломиец", "Кондратюк", "Корниенко", "Король", "Косенко", "Костюк", "Кравченко", "Крамаренко", "Кривонос",
                "Кудря", "Кузьменко", "Куценко", "Лавренко", "Левченко", "Литвин", "Лисенко", "Ломако", "Луценко", "Любченко", "Мазур", "Макаренко", "Максименко", "Марченко", "Мельник", "Мельниченко",
                "Мироненко", "Михайленко", "Мороз", "Муравский", "Назаренко", "Нестеренко", "Онищенко", "Остапенко", "Павленко", "Панченко", "Пархоменко", "Пастушенко", "Петренко", "Пилипенко",
                "Плотников", "Пономаренко", "Приходько", "Прокопенко", "Пустовойт", "Радько", "Романенко", "Руденко", "Савченко", "Самойленко", "Семиволос", "Сидоренко", "Ситник", "Скорик", "Слинько",
                "Соколенко", "Соловей", "Стадник", "Степаненко", "Супрун", "Тараненко", "Ткаченко", "Токаренко", "Троценко", "Федоренко", "Фесенко", "Харченко", "Хоменко", "Цимбалюк", "Черненко",
                "Шевченко", "Шпак", "Щербина", "Ющенко", "Якименко"
            ],
        },
        "female":{
            "first":[
                "Августина", "Агата", "Адріана", "Аїда", "Аліна", "Аліса", "Альбіна", "Амалія", "Анастасія", "Ангеліна", "Андріана", "Анжела", "Анна", "Антонина", "Аріадна", "Богдана", "Божена",
                "Валентина", "Валерія", "Варвара", "Василиса", "Васса", "Венера", "Вера", "Вероника", "Вікторія", "Віра", "Віталіна", "Віра", "Галя", "Ганна", "Гелена", "Глафіра", "Дарина", "Дарія",
                "Дебора", "Диана", "Домініка", "Єва", "Євгенія", "Єлизавета", "Єфросинія", "Жанна", "Зінаїда", "Зоряна", "Зоя", "Іванна", "Ілона", "Інна", "Іраїда", "Ірина", "Катерина", "Квітка", "Кіра",
                "Клара", "Кристина", "Ксенія", "Лада", "Лариса", "Леся", "Лілія", "Ліна", "Лідія", "Любов", "Людмила", "Майя", "Марія", "Мар’яна", "Меланія", "Мілана", "Мірослава", "Надія", "Наталя",
                "Ніна", "Оксана", "Олександра", "Олеся", "Олена", "Ольга", "Параска", "Пелагея", "Поліна", "Раїса", "Рената", "Роза", "Руслана", "Світлана", "Серафіма", "Соломія", "Софія", "Стефанія",
                "Таїсія", "Тамара", "Тетяна", "Уляна", "Фаїна", "Христина", "Цвітана", "Чара", "Чеслава", "Шана", "Юлія", "Яна", "Ярина", "Ярослава"
            ],
            "last":[
                "Абрамчук", "Авдеенко", "Аверченко", "Авраменко", "Адаменко", "Адамчук", "Александрюк", "Алексеенко", "Алексенко", "Андриенко", "Андрейченко", "Андрейчук", "Антоненко", "Антонюк",
                "Артёменко", "Архипенко", "Бабенко", "Бабич", "Бабченко", "Байрак", "Баланенко", "Барабаш", "Бартош", "Безручко", "Березюк", "Білоус", "Бондаренко", "Бондарчук", "Боженко", "Божко", "Бойко",
                "Бойченко", "Борзенко", "Борисенко", "Боровик", "Бублик", "Бугай", "Будник", "Буняк", "Вакарчук", "Василенко", "Васильченко", "Ващенко", "Величко", "Вербицкая", "Вернигора", "Винник",
                "Вишневская", "Вовк", "Возняк", "Войтенко", "Волошина", "Вольская", "Воронко", "Воронько", "Гавриленко", "Гаврилюк", "Галасюк", "Ганущак", "Герасименко", "Герман", "Гетьман", "Гладун",
                "Голуб", "Гоцул", "Гриценко", "Гуменюк", "Дацюк", "Демченко", "Денисенко", "Дмитрук", "Довбенко", "Дорошенко", "Дубина", "Дяченко", "Еременко", "Жуковская", "Жук", "Завгородняя",
                "Задорожная", "Захарченко", "Зинченко", "Зубенко", "Иващенко", "Ильченко", "Калашник", "Калиниченко", "Кальченко", "Канюка", "Карпенко", "Касьяненко", "Кваснюк", "Кириленко",
                "Клименко", "Коваленко", "Коваль", "Коврига", "Колесник", "Коломиец", "Кондратюк", "Корниенко", "Король", "Косенко", "Костюк", "Кравченко", "Крамаренко", "Кривонос", "Кудря",
                "Кузьменко", "Куценко", "Лавренко", "Левченко", "Литвин", "Лисенко", "Ломако", "Луценко", "Любченко", "Мазур", "Макаренко", "Максименко", "Марченко", "Мельник", "Мельниченко",
                "Мироненко", "Михайленко", "Мороз", "Муравская", "Назаренко", "Нестеренко", "Онищенко", "Остапенко", "Павленко", "Панченко", "Пархоменко", "Пастушенко", "Петренко", "Пилипенко",
                "Плотникова", "Пономаренко", "Приходько", "Прокопенко", "Пустовойт", "Радько", "Романенко", "Руденко", "Савченко", "Самойленко", "Семиволос", "Сидоренко", "Ситник", "Скорик",
                "Слинько", "Соколенко", "Соловей", "Стадник", "Степаненко", "Супрун", "Тараненко", "Ткаченко", "Токаренко", "Троценко", "Федоренко", "Фесенко", "Харченко", "Хоменко", "Цимбалюк",
                "Черненко", "Шевченко", "Шпак", "Щербина", "Ющенко", "Якименко"
            ],
        },
    },
    "kz":{
        "male":{
            "first":[
                "Абай", "Абылай", "Азамат", "Айбар", "Айдос", "Айдын", "Айсултан", "Айтуар", "Али", "Алихан", "Алдияр", "Алмаз", "Алмас", "Аман", "Амир", "Ануар", "Арман", "Арсен", "Арыстан",
                "Асан", "Аскар", "Асылбек", "Асылхан", "Ахат", "Аян", "Бағдат", "Бакир", "Бақытжан", "Бауыржан", "Батыр", "Батырхан", "Бейбарыс", "Бекзат", "Бекнур", "Берік", "Болат", "Дамир",
                "Данияр", "Дархан", "Дастан", "Диас", "Дияр", "Дулат", "Думан", "Ерасыл", "Ербол", "Ерболат", "Ерден", "Ержан", "Ерлан", "Ермек", "Ернар", "Жасулан", "Жанибек", "Жанат", "Жандос",
                "Жансерик", "Жәнібек", "Жолдас", "Закир", "Зуфар", "Ибрагим", "Ильяс", "Ислам", "Кадыр", "Кайрат", "Кайсар", "Канат", "Карим", "Куаныш", "Мағжан", "Мади", "Мажит", "Марат", "Мардан",
                "Мирас", "Мурат", "Муслим", "Мухтар", "Нариман", "Нұрбек", "Нұрбол", "Нұрдәулет", "Нұрислам", "Нұрсұлтан", "Олжас", "Омар", "Рауан", "Расул", "Рустам", "Самат", "Санжар", "Сапар",
                "Серик", "Султан", "Талгат", "Темирлан", "Тимур", "Тімур", "Уали", "Шарип", "Эльдар", "Эржан"
            ],
            "last":[
                "Абильдин", "Абылкасымов", "Абуов", "Агзамов", "Аймагамбетов", "Аймурзаев", "Актаев", "Алдабергенов", "Алдияров", "Алибеков", "Алиев", "Алимжанов", "Амантаев", "Аманжолов", "Амреев",
                "Ануаров", "Аралбаев", "Асаинов", "Аскаров", "Асылбеков", "Атажанов", "Ахметов", "Ашимов", "Бабаев", "Байжанов", "Баймуханов", "Байтасов", "Бакиров", "Балтабаев", "Балтабеков", "Бапаев",
                "Барлыбаев", "Бейсембаев", "Бейсенбаев", "Бекболатов", "Бекбулатов", "Бекжанов", "Бекмаханов", "Бердиев", "Боранбаев", "Булекбаев", "Валиханов", "Габдуллин", "Гайсин", "Дауленов",
                "Джарлыкасымов", "Джумабаев", "Досжанов", "Дуйсенбаев", "Елеусизов", "Ермагамбетов", "Ержанов", "Жайлаубаев", "Жакупов", "Жанабаев", "Жаналиев", "Жангалиев", "Жексенов", "Жилкибаев",
                "Жумагулов", "Заманбеков", "Ибадуллаев", "Ибраев", "Иманалиев", "Исабаев", "Кабдрахманов", "Кадыров", "Казбеков", "Калиев", "Камалов", "Каримов", "Касымов", "Кенжебаев", "Кенесов",
                "Керимов", "Кожамкулов", "Койбагаров", "Кульмагамбетов", "Кусаинов", "Лукпанов", "Магауинов", "Макажанов", "Маликов", "Мамыров", "Масалимов", "Медетбеков", "Мейрбеков", "Мукушев",
                "Мурзахметов", "Мусабаев", "Мусин", "Назарбаев", "Намазбаев", "Нургалиев", "Нуржанов", "Нурумов", "Омаров", "Онгарбаев", "Оспанов", "Примбетов", "Рамазанов", "Рахимбаев", "Рыскулов",
                "Сагындыков", "Садыбеков", "Садуакасов", "Сапаров", "Сейткалиев", "Сманов", "Сулейменов", "Таджибаев", "Тазабеков", "Тасболатов", "Темиржанов", "Токаев", "Тлеужанов", "Тургумбаев",
                "Туменбаев", "Утегалиев", "Файзуллин", "Хасенов", "Шайкенов", "Шакенов", "Шугаев", "Ыскаков", "Юсупов"
            ],
        },
        "female":{
            "first":[
                "Адия", "Ажар", "Аида", "Айару", "Айгуль", "Айдана", "Айжан", "Айзере", "Айкөркем", "Айна", "Айнагүл", "Айнур", "Айпара", "Айсулу", "Айтолды", "Айша", "Акмарал", "Ақерке",
                "Алуа", "Алия", "Альфия", "Амина", "Анар", "Анаргуль", "Ару", "Аружан", "Асем", "Асима", "Асия", "Аяна", "Багила", "Бану", "Баян", "Бибигуль", "Бимаржан", "Ботакоз", "Газиза",
                "Гайни", "Гаухар", "Гүлбаршын", "Гүлбахрам", "Гүлжахан", "Гүлзара", "Гүлзифа", "Гүлмира", "Гүлназ", "Гүлниса", "Гүлсара", "Гүлшат", "Гульзира", "Гульнара", "Дамеля", "Дана",
                "Данара", "Дарига", "Дилара", "Дильназ", "Динара", "Дурия", "Еркежан", "Жазира", "Жайна", "Жамал", "Жамига", "Жанар", "Жания", "Жансая", "Жибек", "Жулдыз", "Зауре", "Зере",
                "Инжу", "Каламкас", "Камалия", "Кәусар", "Кулянда", "Кунсулу", "Лаура", "Лейла", "Мавлюда", "Мадина", "Малика", "Маржан", "Меруерт", "Мөлдір", "Назерке", "Перизат", "Рабига",
                "Разия", "Раушан", "Рухия", "Сабира", "Саида", "Салтанат", "Сания", "Сара", "Сауле", "Сезим", "Сулушаш", "Тогжан", "Торгын", "Уазипа", "Фариза", "Фатима", "Феруза", "Хадиша",
                "Чулпан", "Шолпан", "Шынар"
            ],
            "last":["Абдрахманова", "Абдирова", "Абдуллина", "Абишева", "Абылгазинова", "Агзамова", "Адилова", "Ажибаева", "Айдарханова", "Айдосова", "Айжанова", "Аймагамбетова", "Аймурзаева",
                "Айсагалиева", "Акбалина", "Акболатова", "Акжолова", "Аккулова", "Алдабергенова", "Алдиярова", "Алиева", "Алимжанова", "Амантаева", "Аманжолова", "Амренова", "Анарбекова",
                "Андрианова", "Ануарова", "Аралбаева", "Асаинова", "Аскарова", "Асылханова", "Атажанова", "Ахметова", "Ашимова", "Байбусинова", "Байжанова", "Баймаханова", "Байтасова",
                "Бакирова", "Балтабаева", "Балтабекова", "Бапаева", "Барлыбаева", "Бейсембаева", "Бейсенбаева", "Бекболатова", "Бекбулатова", "Бекжанова", "Бекмаханова", "Бердиева",
                "Боранбаева", "Булекбаева", "Валиханова", "Габдуллина", "Гайсина", "Дауленова", "Джарлыкасымова", "Джумабаева", "Досжанова", "Дуйсенбаева", "Елеусизова", "Ермагамбетова",
                "Ержанова", "Жайлаубаева", "Жакупова", "Жанабаева", "Жаналиева", "Жангалиева", "Жексенова", "Жилкибаева", "Жумагулова", "Заманбекова", "Ибадуллаева", "Ибраева", "Иманалиева",
                "Исабаева", "Кабдрахманова", "Кадырова", "Казбекова", "Калиева", "Камалова", "Каримова", "Касымова", "Кенжебаева", "Кенесова", "Керимова", "Кожамкулова", "Койбагарова",
                "Кульмагамбетова", "Кусаинова", "Лукпанова", "Магауинова", "Макажанова", "Маликова", "Мамырова", "Масалимова", "Медетбекова", "Мейрбекова", "Мукушева", "Мурзахметова",
                "Мусабаева", "Мусина", "Назарбаева", "Намазбаева", "Нургалиева", "Нуржанова", "Нурумова", "Омарова", "Онгарбаева", "Оспанова", "Примбетова", "Рамазанова", "Рахимбаева",
                "Рыскулова", "Сагындыкова", "Садыбекова", "Садуакасова", "Сапарова", "Сейткалиева", "Сманова", "Сулейменова", "Таджибаева", "Тазабекова", "Тасболатова", "Темиржанова",
                "Токаева", "Тлеужанова", "Тургумбаева", "Туменбаева", "Утегалиева", "Файзуллина", "Хасенова", "Шайкенова", "Шакенова", "Шугаева", "Ыскакова", "Юсупова"],
        },
    },
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
            result = `${first} ${last}`;
            break;
        case 'fr':
            result = `${first} ${last}`;
            break;
        case 'es':
            result = `${first} ${middle ? ' ' + middle : ''} ${last}`;
            break;
        case 'ru':
            result = `${first} ${patronymic ? '' + patronymic : ''} ${last}`;
            break;
        case 'be':
            result = `${first} ${last}`;
            break;
        case 'ua':
            result = `${first} ${last}`;
            break;
        case 'kz':
            result = `${first} ${last}`;
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