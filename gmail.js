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
        sendTableContainer = document.querySelector('div.nH.nn[style="width: 455px; height: 712px;"]').querySelector('div.nH.Hd[role="dialog"]').querySelector("form").parentNode.parentNode.parentNode.parentNode.querySelector('colgroup').parentNode.parentNode;
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
    col.setAttribute('style', 'min-width: 448px; font-size: 80%;');

    col.innerHTML = 'or delay sending: <input type="text"></input>';

    // add row
    sendTableContainer.appendChild(table);

    window.clearInterval(this.setupTimer);
    this.setupComplete = true;
}
