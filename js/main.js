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