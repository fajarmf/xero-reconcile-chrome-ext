function parseRight(details) {
    var spans = details.getElementsByTagName("span");
    return {
        date: spans[0].innerText,
        name: spans[1].innerText,
        ref: spans[2].innerText.split("Ref: ")[1],
    };
}

function parseLeft(details) {
    var spans = details.getElementsByTagName("span");
    return {
        date: spans[0].innerText,
        name: spans[1].innerText,
        so: spans[2].innerText,
        orderId: spans[3].innerText
    };
}

function getLeftData(line) {
    var statement = line.getElementsByClassName("statement no-shadow")[0];
    var details = statement.getElementsByClassName("details")[0];
    return parseLeft(details);
}

function getRightData(line) {
    var statement = line.getElementsByClassName("statement matched")[0];
    var details = statement.getElementsByClassName("details")[0];
    return parseRight(details);
}

(function() {
    var reconcileTable = document.getElementById("statementLines");
    var lines = reconcileTable.getElementsByClassName("line");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var leftData = getLeftData(line);
        var rightData = getRightData(line);

        if (leftData.orderId === rightData.ref) {
            var okButton = line.getElementsByClassName("okayButton")[0];
            okButton.click();
        };
    };


})();
