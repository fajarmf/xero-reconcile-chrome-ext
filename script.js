function parseRight(details) {
    var spans = details.getElementsByTagName("span");
    return {
        date: spans[0].innerText,
        store: spans[1].innerText.split("Store: ")[1].toLowerCase(),
        ref: spans[2].innerText.split("Ref: ")[1],
    };
}

function parseLeft(details) {
    var spans = details.getElementsByTagName("span");
    return {
        date: spans[0].innerText,
        // name: spans[1].innerText,
        // so: spans[2].innerText,
        // orderId: spans[3].innerText
    };
}

function getLeftData(line) {
    var statement = line.getElementsByClassName("statement no-shadow")[0];
    var details = statement.getElementsByClassName("details")[0];
    return parseLeft(details);
}

function getRightData(line) {
    var statement = line.getElementsByClassName("statement matched")[0];
    if (statement) {
        var details = statement.getElementsByClassName("details")[0];
        return parseRight(details);
    };
}

function goToPreviousPage() {
    var currentPage = window.location.search.split("page=")[1] || 1;
    if (currentPage > 1) {
        var li = document.getElementsByClassName("prevPage")[0];
        var previousPageLink = li.getElementsByTagName("a")[0];
        previousPageLink.click();
    } else {
        return false;
    }
}

function runCheck(storeName) {
    var reconcileTable = document.getElementById("statementLines");
    var lines = reconcileTable.getElementsByClassName("line");
    var counter = 0;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var leftData = getLeftData(line);
        var rightData = getRightData(line);

        if (rightData && leftData.date === rightData.date && rightData.store === storeName) {
            var okButton = line.getElementsByClassName("okayButton")[0];
            okButton.click();
            counter++;
        };
    };
    if (counter == 0) {
        // alert("There is no match.");
    };
    return counter;
}

function oke2in() {
    var storeName = "grand metropolitan";
    var found = runCheck(storeName);
    if (found > 0) {
        setTimeout(oke2in, 5000);
    } else {
        if (goToPreviousPage() == false) {
            alert("All done!");
        };
    }
}

(function() {
    setTimeout(oke2in, 5000);
})();
