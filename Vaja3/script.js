"use strict";

let stevec = 1;

function domRemoveParticipant(event) {
    if(confirm("Are you sure you want to delete row " + event.rowIndex + "?")){
        document.getElementById('participant-table').deleteRow(event.rowIndex);
        stevec--;
    }
}

function domAddParticipant(participant) {
    var x = document.getElementById('participant-table').insertRow(stevec);
    x.setAttribute("onClick","domRemoveParticipant(this)");
    stevec++;
    var y = x.insertCell(0);
    var z = x.insertCell(1);
    var i = x.insertCell(2);
    console.log(x);
    y.innerHTML=participant.first;
    z.innerHTML=participant.last;
    i.innerHTML=participant.role;
}

function addParticipant() {
    // TODO: Get values
    const first = document.getElementById("first").value;
    const last = document.getElementById("last").value;
    const role = document.getElementById("role").value;
    
    // TODO: Set input fields to empty values
    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("role").value = "Student";
    
    // Create participant object
    const participant = {
        first: first,
        last: last,
        role: role
    };

    // Add participant to the HTML
    domAddParticipant(participant);

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    // This function is run after the page contents have been loaded
    // Put your initialization code here
    document.getElementById("addButton").onclick = addParticipant;
})

// The jQuery way of doing it
$(document).ready(() => {
    // Alternatively, you can use jQuery to achieve the same result
});
