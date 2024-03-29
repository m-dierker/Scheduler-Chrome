// Start the scheduler onload
window.onload = function() {
    var scheduler = new GmailScheduler();
    console.log(scheduler);
}

function GmailScheduler() {
    console.log("Gmail setup");
    this.setupComplete = false;
    this.setup();
    // Call setup until it's found the compose window.
    // If Gmail changes, this will run forever and ever which is a bad thing.
    this.setupTimer = window.setInterval(this.setup.bind(this), 1000);
}

GmailScheduler.prototype.setup = function() {

    console.log("Setting up Gmail Scheduler");

    if(this.setupComplete) {
        return;
    }

    var sendTable = null;
    try {
        // This is approximately the worst thing ever, but it works. If there's a better way (ideally without having to use jQuery - it's a bunch of extra JS to load when I don't actually need it), someone please let me know before I devolve into a weeping pile of tears.

        // Step 1 is to find the top container
        var topContainer = document.querySelector('div.nH.nn[style="width: 455px; height: 712px;"]');

        // And the first one might not have worked, so let's try another if it didn't
        if (topContainer == null) {
            topContainer = document.querySelector('div.nH.nn[style="width: 455px; height: 668px;"]');
        }

        sendTableContainer = topContainer.querySelector('div.nH.Hd[role="dialog"]').querySelector("form").parentNode.parentNode.parentNode.parentNode.querySelector('colgroup').parentNode.parentNode;
    } catch(err) {
        // It's possible the compose window is not open, so we shouldn't execute the setup, and we'll keep checking for when it might open up
        return;
    }

    sendTableContainer.setAttribute('style', 'height: 100%');
    console.log(sendTableContainer);

    var table = document.createElement('table');
    var row = document.createElement('tr');
    var col = document.createElement('td');

    table.appendChild(row);
    row.appendChild(col);

    row.setAttribute('class', 'gU');
    col.setAttribute('style', 'min-width: 438px; font-size: 80%;');

    col.innerHTML = '<span style="display: inline"> \
    <img style="width: 18px; vertical-align: middle; margin-left: 3px;" src="'
    + chrome.extension.getURL('icon.png') +  '"> \
    </span> \
    or send later: \
    <form style="display: inline-block"> \
        <select> \
            <option>in an hour</option> \
            <option>in 6 hours</option> \
            <option>tomorrow, 11AM</option> \
            <option>in a day</option> \
            <option>in a week</option> \
            <option>Custom</option> \
        </select> \
        <button style="width: 80px;"> \
            Send Later \
        </button> \
    </form>';


    var hr = document.createElement('hr');
    hr.setAttribute('style', 'margin: 2px; border-color: #cfcfcf; border-top-width: 1px; border-style: solid; border-bottom-width: 0px;');

    // add row
    sendTableContainer.appendChild(hr);
    sendTableContainer.appendChild(table);

    window.clearInterval(this.setupTimer);
    this.setupComplete = true;
}
