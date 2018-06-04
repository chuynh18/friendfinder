"use strict";

var buildUnanswered;
var indexOfUnchecked;
var spliceUnchecked;
var submitClicked = false;

// client-side validation for the convenience of the user (I also have server-side validation, of course)
// this function will be run when submit is clicked.  it will let the user know if they have unanswered questions
var onSubmit = function() {
    var formData = "";
    var unchecked = []; // array of unanswered questions so we can inform the user
    var surveyData = document.getElementById("charQuiz");

    buildUnanswered = function() {
        var unanswered = "";
    
        if (unchecked.length > 0) {
            // build out list of unanswered questions so we can show it to the user
            for (var i = 0; i < unchecked.length; i++) {
                if (i < unchecked.length-2) {
                    unanswered += unchecked[i] + ", ";
                }
                else if (i < unchecked.length-1) {
                    unanswered += unchecked[i] + " and ";
                }
                else {
                    unanswered += unchecked[i];
                }
            }
            // tell user which questions have not been answered
            document.getElementById("warning").textContent = "You didn't answer the following question(s):  " + unanswered + ".  Go back and answer them, then resubmit the form.";
        }
        else {
            document.getElementById("warning").innerHTML = "<br>";
        }
        
    }

    indexOfUnchecked = function(int) {
        return unchecked.indexOf(int);
    }

    spliceUnchecked = function(index) {
        unchecked.splice(index, 1);
    }

    for (var i = 1; i < 11; i++) { // the 11 is hardcoded because I know I wrote 10 questions
        var elements = document.getElementsByClassName("q"+i);
        var checked = false;
        for (var j = 0; j < elements.length; j++) {
            if (elements[j].checked) {
                checked = true;
                formData += `q${i}=${j+1}&`
            }
        }
        // builds list of unanswered questions
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
        buildUnanswered();
        submitClicked = true;
    }
    else {
        document.getElementById("warning").textContent = "";

        formData = formData.slice(0,formData.length-1);
        console.log(formData);
        // send data to server
        var xhr = new XMLHttpRequest(); 

        xhr.onload = function() {
            var response = JSON.parse(xhr.response);
            console.log(response);
            console.log(typeof response);

            document.getElementById("charImage").innerHTML = `<img src="${response.photo}" alt="${response.name}">`;
            document.getElementById("charName").textContent = `${response.name}`;
            if (response.difference > 10) {
                document.getElementById("matchQuality").textContent = "You are an excellent match!";
            }
            else if (response.difference > 15) {
                document.getElementById("matchQuality").textContent = "You are a decent match!";
            }
            else {
                document.getElementById("matchQuality").textContent = "You are an acceptable match.";
            }

            // render the modal on response
            modal.style.display = "block";
        }

        xhr.open("POST", "/api/friends", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(formData);
    }
}

// Get the modal
var modal = document.getElementById('surveyModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// attach event listeners to radio buttons that will remove red as appropriate
// user will only see this if they epic fail the first time around
for (var i = 0; i < 11; i++) { // once again, the 11 is hardcoded because I know I wrote 10 questions
    var radio = document.getElementsByClassName("q"+i);
    for (var j = 0; j < radio.length; j++) {
        // add event listeners to all the radio buttons
        radio[j].addEventListener("click", function(event) {
            if (document.getElementById(this.classList[0]).classList.contains("warning")) {
                document.getElementById(this.classList[0]).classList.remove("warning");
            }
            
            // removes question from the list of red
            var questionNumber = parseInt(this.classList[0].slice(1,this.classList[0].length));
            if (submitClicked) {
                var index = indexOfUnchecked(questionNumber);
                if (index > -1) {
                    spliceUnchecked(index);
                }
                buildUnanswered();
            }
        })
    }
}

document.getElementById("submitButton").addEventListener("click", event => {
    onSubmit();
})