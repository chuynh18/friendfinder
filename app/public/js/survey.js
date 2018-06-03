"use strict";

var validForm = false;
// client-side validation for the convenience of the user (I also have server-side validation, of course)
// this function will be run when submit is clicked.  it will let the user know if they have unanswered questions
var onSubmit = function() {
    var unchecked = [];
    for (var i = 1; i < 11; i++) { // the 11 is hardcoded because I know I wrote 10 questions
        var elements = document.getElementsByClassName("q"+i);
        var checked = false;
        for (var j = 0; j < elements.length; j++) {
            if (elements[j].checked) {
                checked = true;
            }
        }
        if (!checked) {
            unchecked.push(i);
            // make the unanswered question red
            document.getElementById("q"+i).classList.add("warning");
        }
        else {
            // if it was red but now shouldn't be, make it not red
            // this is most useful if the user fixed some flagged questions but not all
            if (document.getElementById("q"+i).classList.contains("warning")) {
                document.getElementById("q"+i).classList.remove("warning");
            }
        }
    }
    if (unchecked.length > 0) {
        var unanswered = "";
        for (var i = 0; i < unchecked.length; i++) {
            if (i < unchecked.length-2) {
                unanswered += unchecked[i] + ", ";
            }
            else if (i < unchecked.length-1) {
                unanswered += unchecked[i] + " ";
            }
            else {
                unanswered += "and " + unchecked[i];
            }
        }
        // tell user which questions have not been answered
        document.getElementById("warning").textContent = "You didn't answer the following questions:  " + unanswered + ".  Go back and answer them, then resubmit the form.";
    }
    else {
        validForm = true;
        document.getElementById("warning").textContent = "";
    }
}

for (var i = 0; i < 11; i++) { // once again, the 11 is hardcoded because I know I wrote 10 questions
    var radio = document.getElementsByClassName("q"+i);
    for (var j = 0; j < radio.length; j++) {
        // add event listeners to all the radio buttons
        radio[j].addEventListener("click", function(event) {
            var relatedRadio = document.getElementsByClassName(this.classList[0]);
            for (var k = 0; k < relatedRadio.length; k++) {
                if (document.getElementById(this.classList[0]).classList.contains("warning")) {
                    document.getElementById(this.classList[0]).classList.remove("warning");
                }
            }
        })
    }
}

document.getElementById("submitButton").addEventListener("click", event => {
    onSubmit();
    if (!validForm) {
        event.preventDefault();
    }
})