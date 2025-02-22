
function checkURL() {                                                //Funktion, um URL zu überprüfen
    const url = document.getElementById('url').value;                //Url as Eingabefeld holen
    const result = document.getElementById('url-result');

    //Liste von unsicheren Domains oder Mustern
    const unsafeDomains = ['.xyz', '.top', '.club', 'pishing.com', 'fakewebsite.com', '.ru', '.tk', '.party', '.cf', '.gq', '.ml', '.biz', '.info'];

    //Überprüfen, ob die URL eine unsichere Domain enthält
    const isUnsafe = unsafeDomains.some(domain => url.includes(domain));

    if (!url) {
        result.innerHTML = 'Bitte gib eine URL ein';
        result.style.color = 'orange';
        return;
    }

    if(isUnsafe) {
        result.innerText = 'Achtung: Diese URL könnte gefährlich sein!';
        result.style.color = 'red';
    } else {
        result.innerText = 'Die URL scheint sicher zu sein.';
        result.style.color = 'green';
    }
}


function checkPassword() {
    const password = document.getElementById('password').value;
    const result = document.getElementById('password-result');

    //Sicherheitskriterien als regulärer Ausdruck (Regex)
    const lengthCheck = password.length >= 8;
    const upperCaseCheck = /[A-Z]/.test(password);
    const lowerCaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[!@#$%&^*(),.?:{}|<>[+;]-]/.test(password);

    let errorMessage = '';

    //Bewertung der Passwort-Sicherheit
    if(!lengthCheck) {
    errorMessage += 'Das Passwort muss mindestens 8 Zeichen lang sein. <br>';
    }
    if(!upperCaseCheck) {
    errorMessage += 'Das Passwort muss mindestens einen Großbuchstaben enthalten. <br>';
    }
    if(!lowerCaseCheck) {
    errorMessage += 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten. <br>';
    }
    if(!numberCheck) {
    errorMessage += 'Das Passwort muss mindestens eine Zahl enthalten. <br>';
    }
    if(!specialCharCheck) {
    errorMessage += 'Das Passwort muss mindestens ein Sonderzeichen enthalten. <br>';
    }

    //Wenn Fehler vorhanden sind, anzeigen
    if(errorMessage) {
    result.innerHTML = errorMessage; //innerHTML statt innerText, weil sonst <br> ausgeschrieben werden und nicht als Befehl zum Zeilenumbruch bewertet werden
    result.style.color = 'red';
    } else {
    result.innerText = 'Dein Passwort ist sicher genug.';
    result.style.color = 'green';
    }
}



function checkEmailAddress() {
            const eMailAddress = document.getElementById('e-mail-address').value.trim();
            const result = document.getElementById('e-mail-result');

            if (!eMailAddress) {
                result.innerHTML = 'Bitte gib eine E-Mail-Adresse ein';
                result.style.color = 'orange';
                return;
            }

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(eMailAddress)) {
                result.innerHTML = 'Ungültiges E-Mail-Format.';
                result.style.color = 'orange';
                return;
            }

            // Liste vertrauenswürdiger Domains
            const trustedDomains = [
                //Große E-Mail-Anbieter
                "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
                "icloud.com", "protonmail.com", "aol.com", "zoho.com",
                "gmx.net", "web.de", "mail.com", "yandex.com",

                //Große Unternehmen & Tech-Firmen
                 "paypal.com", "amazon.com", "google.com", "apple.com",
                 "microsoft.com", "facebook.com", "meta.com", "twitter.com",
                 "linkedin.com", "netflix.com", "spotify.com", "ebay.com",
                 "adobe.com", "tesla.com", "nvidia.com", "oracle.com",
                "ibm.com", "samsung.com", "sony.com", "intel.com",

                //Regierungen & Behörden
                "gov", "gov.uk", "bund.de", "europa.eu", "gov.au",
                "gov.ca", "gov.br", "gov.fr", "gov.in", "gov.de",
                "gov.nz", "gov.za", "gov.sg", "gouv.fr", "parliament.uk",

                //Banken & Finanzinstitute (Global)
                "chase.com", "bankofamerica.com", "wellsfargo.com",
                "citibank.com", "goldmansachs.com", "jpmorganchase.com",
                "hsbc.com", "barclays.com", "americanexpress.com",

                //Banken & Finanzinstitute (Deutschland)
                "deutsche-bank.de", "commerzbank.de", "ing.de",
                "dkb.de", "postbank.de", "sparda-bank.de", "consorsbank.de",
                "volksbank.de", "hypovereinsbank.de", "sparkasse.de",

                //Banken & Finanzinstitute (Europa)
                "bnp.fr", "credit-agricole.fr", "bbva.com", "santander.com",
                "unicredit.eu", "intesa.it", "swedbank.com", "nordea.com",

                //Zahlungsdienste
                "visa.com", "mastercard.com", "stripe.com", "revolut.com",
                "wise.com", "squareup.com", "skrill.com",

                //Telekommunikationsanbieter
                "verizon.com", "att.com", "t-mobile.com", "vodafone.com",
                "telekom.de", "o2.de", "telefonica.com", "orange.fr"
            ];

            const suspiciousPatterns = [
                "security", "support", "admin", "service",         // Häufig verwendete Begriffe für Fake-Support
                "login", "verify", "account", "billing",           // Begriffe, die Nutzer täuschen sollen
                "update", "password", "safe", "protection",        // Sicherheitsbezogene Täuschungen
                "customer", "client", "helpdesk",                  // Kundenservice-ähnliche Begriffe
                "notice", "alert", "urgent", "important",          // Dringlichkeitswörter, um Panik zu erzeugen
                "team", "center", "official", "auth", "authenticate",  // Fake-"offizielle" Begriffe
                "pay", "transaction", "banking", "finance",        // Finanz- und Zahlungsbetrug
                "secure", "webmail", "access", "recovery",         // IT-Sicherheitsbezogene Begriffe
                "free", "promo", "gift", "prize", "winner",        // Lockangebote für Betrug
                "help", "assistance", "unlock", "reset",           // Nutzer täuschende Begriffe
                "webmaster", "root", "sysadmin", "hostmaster",     // Technische Begriffe, oft für Admin-Spoofing
                "notification", "update-required", "confirm",      // Aufforderungen zum Handeln
                "support-team", "customer-support", "account-team",// Kombinationen von Support-Täuschungen
                "noreply", "no-reply", "official-notice",          // Täuscht offizielle E-Mails vor
                "refund", "invoice", "payment", "order", "shipment", // E-Commerce & Zahlungsbetrug
                "business", "corporate", "global", "worldwide",    // Fake-Firmenbegriffe
                "service-mail", "noreply-service"                   // Gefälschte System- oder Support-E-Mails
            ];


            const eMailParts = eMailAddress.split('@');
            if (eMailParts.length !== 2) {
                result.innerHTML = 'Ungültige E-Mail-Adresse';
                result.style.color = 'orange';
                return;
            }

            const localPart = eMailParts[0];
            const domain = eMailParts[1].toLowerCase();

            let isSuspicious = false;
            for (const pattern of suspiciousPatterns) {
                if (localPart.includes(pattern) || domain.includes(pattern)) {
                    isSuspicious = true;
                    break;
                }
            }

            if (isSuspicious) {
                result.innerHTML = '⚠️ Verdächtige E-Mail-Adresse! Möglicherweise ein Spoofing-Versuch.';
                result.style.color = 'red';
                return;
            }

            if (trustedDomains.includes(domain)) {
                result.innerHTML = '✅ Diese E-Mail-Adresse sieht sicher aus.';
                result.style.color = 'green';
            } else {
                result.innerHTML = '⚠️ Unbekannte Domain! Sei vorsichtig.';
                result.style.color = 'orange';
            }
        }









const fragen = [
{
    frage: "Welches Passwort ist am sichersten?",
    antworten: ["123456", "MeinGeburtstag2024", "Xy!9#lP$T7&z", "Passwort123"],
    korrekt: 2
},
{
    frage: "Warum solltest du für verschiedene Konten unterschiedliche Passwörter verwenden?",
    antworten: ["Damit Hacker nicht mit einem Passwort auf mehrere Konten zugreifen können", "Weil es von der Regierung vorgeschrieben ist", "Weil Websites es verlangen", "Es ist eigentlich egal"],
    korrekt: 0
},
{
    frage: "Wie erkennst du eine Phishing-E-Mail am ehesten?",
    antworten: ["Sie enthält eine dringende Aufforderung, persönliche Daten einzugeben", "Sie kommt von einem bekannten Absender", "Sie enthält einen lustigen Anhang", "Sie sieht aus wie eine gewöhnliche Newsletter-Mail"],
    korrekt: 0
},
{
    frage: "Was bedeutet Zwei-Faktor-Authentifizierung (2FA)?",
    antworten: ["Du brauchst zwei Geräte, um dich einzuloggen", "Neben deinem Passwort wird ein zusätzlicher Sicherheitscode abgefragt", "Dein Passwort wird zweimal geprüft", "Du kannst dich nur von zwei verschiedenen Orten aus anmelden"],
    korrekt: 1
},
{
    frage: "Du erhältst eine Freundschaftsanfrage auf Social Media von jemandem, den du nicht kennst. Was solltest du tun?",
    antworten: ["Sofort annehmen, um neue Leute kennenzulernen", "Ignorieren oder das Profil genauer prüfen", "Ihm sofort private Informationen schicken", "Ihm direkt Geld senden"],
    korrekt: 1
},
{
    frage: "Warum solltest du keine sensiblen Daten über öffentliches WLAN (z. B. im Café) eingeben?",
    antworten: ["Weil das WLAN langsam ist", "Weil andere Nutzer deine Daten abfangen könnten", "Weil das WLAN dich mit Werbung zuspammt", "Es gibt keinen wirklichen Grund zur Sorge"],
    korrekt: 1
},
{
    frage: "Was solltest du tun, wenn ein Online-Dienst, den du nutzt, einen Datenleck meldet?",
    antworten: ["Nichts, es betrifft dich wahrscheinlich nicht", "Dein Passwort auf der betroffenen Website sofort ändern", "Dein Konto sofort löschen", "Deine Freunde warnen, aber dein Passwort behalten"],
    korrekt: 1
},
{
    frage: "Warum sollte man Software-Updates immer zeitnah installieren?",
    antworten: ["Weil sie neue Funktionen bringen", "Weil es lästig ist, die Update-Benachrichtigungen zu sehen", "Es ist eigentlich nicht nötig", "Weil sie Sicherheitslücken schließen"],
    korrekt: 3
},
{
    frage: "Welche dieser Aussagen über sichere Passwörter ist richtig?",
    antworten: ["Ein sicheres Passwort sollte mindestens 8 Zeichen lang sein und Sonderzeichen enthalten", "Es ist sicher, das gleiche Passwort für alle Konten zu nutzen", "Passwort123 ist ein gutes Passwort", "Ein sicheres Passwort ist leicht zu erraten"],
    korrekt: 0
},
{
    frage: "Du bekommst eine WhatsApp-Nachricht von einem Freund mit einem verdächtigen Link. Was solltest du tun?",
    antworten: ["Sofort auf den Link klicken", "Den Freund fragen, ob er die Nachricht wirklich geschickt hat", "Die Nachricht an möglichst viele Leute weiterleiten", "Deine Handynummer ändern"],
    korrekt: 1
}
];

let aktuelleFrage = 0;
const frageText = document.getElementById("frage");
const antwortContainer = document.getElementById("antworten");
const nextBtn = document.getElementById("next-btn");
const ergebnisText = document.getElementById("ergebnis");

function quizladen() {
    ergebnisText.textContent = "";
    antwortContainer.innerHTML = "";
    frageText.textContent = fragen[aktuelleFrage].frage;

    fragen[aktuelleFrage].antworten.forEach((antwort, index) => {
        const button = document.createElement("button");
        button.textContent = antwort;
        button.onclick = () => antwortPrüfen(index);
        antwortContainer.appendChild(button);
    });
    nextBtn.style.display = "none";
}

function antwortPrüfen(index) {
    if (index === fragen[aktuelleFrage].korrekt) {
        ergebnisText.textContent = "Richtig!";
        ergebnisText.style.color = "green";
    } else {
        ergebnisText.textContent = "Falsch";
        ergebnisText.style.color = "red";
    }

    aktuelleFrage++;
    if (aktuelleFrage < fragen.length) {
        nextBtn.style.display = "block";
    } else {
        nextBtn.textContent = "Neustart"
        nextBtn.style.display = "block";
    }
}

nextBtn.addEventListener ("click", () => {
    if(aktuelleFrage < fragen.length) {
        quizladen();
    } else {
        aktuelleFrage = 0;
        nextBtn.textContent = "Nächste Frage";
        quizladen();
    }
    nextBtn.style.display = "none";
});

quizladen();