Friend Finder
=============

What's going on?
----------------
Answer 10 questions and get paired up with the Star Wars character of your dreams!  Really!

Can you give me a little more info?
-----------------------------------
Yeah, sure.  This assignment had me write my first full stack web application, though its scope is such that it barely deserves to be called an application.

The premise is simple:  Answer 10 very sarcastic questions, and I'll tell you which Star Wars character is most like you.

Tell me more about the code.
----------------------------
Sure.  First off, while I wouldn't call everything I'm doing optimal, I wanted to make this fairly slim.  We've worked heavily with external libraries such as JQuery and Bootstrap, and while I have nothing against them, I wanted to try to minimize the use of such libraries.  Therefore, this assignment was built without using any external libraries for the client side.  No Bootstrap, no JQuery, no externally linked JavaScript or CSS files.

There are two main reasons I chose to go this route.

1. Learning.  I don't want to be handicapped into relying on external libraries.
1. I don't think JQuery and Bootstrap are great fits for the nature of this page.  Given that I'm building something that just amounts to an HTML form, I figured that the overhead of Bootstrap and JQuery would be kind of egregious (on a relative scale, anyway.)

So how'd you accomplish things if you didn't use those libraries?
-----------------------------------------------------------------
First off, JQuery does make DOM manipulation more succinct.  It's also fantastic for guaranteeing compatibility with older browsers.  However, I'm not doing any advanced DOM manipulation, and I'm not really worried about compatibility with old versions of Internet Explorer, so the decision to not use JQuery didn't really bring any tradeoffs.

Second, for such a simple page, Bootstrap also seemed like overkill.

Getting into the meat of the question, DOM manipulation was done with vanilla JavaScript.  Things like `document.getElementById("idHere")`, followed by `textContent` or `innerHTML` as appropriate.

POSTing the contents of the form and acting on the response was done via `XmlHttpRequest`.

Preventing the form submission from redirecting actually went hand-in-hand with doing the POST.  In my HTML, I gave my `<form>` the `action="javascript:void(0);` attribute.  Then in my script, I attached an event handler that listens for a click.  Upon the click event, it fires off `onSubmit()`, which is my function that triggers a whole lot of heavy lifting:  client-side validation, displaying warnings to the user if they missed a question (and highlighting unanswered questions), packaging up the form data and POSTing it, and drawing the modal on receiving a response from the server.

The modal was done via HTML, CSS, and JavaScript.  The code is a very slight modification of the code provided by the [W3Schools tutorial](https://www.w3schools.com/howto/howto_css_modals.asp).  My main modification was moving the "opening" of the modal from an event handler attached to a button, to the XHR response.

The other big area to talk about would be the server end, but I don't think there's as much to say there.  I think one of the big purposes of this assignment was to slog through and understand the boilerplate code required to set up a Node.js/Express.js server, specifically the code required to succesfully separate the files that define routes from the file that launches an instance of the server.

So I think the only parts worth talking about when it comes to the server are the bits of code powering the business logic, as that code is going to be more unique to each individual.

For this assignment, the instructions define a lot of implementation details, such as how to determine a match.  In this case, a match is the sum of the differences between the matching characteristics of the user and the prepopulated friends.  The prepopulated friend with the smallest resultant sum is the match for the user.  Because of this, if we're going to naively sum the individual differences, we need to ensure that the difference is not negative.  I'm sure most implementations used `Math.abs()`; I chose to simply flip the sign of the difference if it was negative.  There are many other ways to skin this cat, so to speak...  I'm sure that in the end, they all work out to about the same efficiency (I have not tested this assumption.)  Because the ultimate operation is just flipping the sign, I'm sure the number is simply stored as a signed number.  Flipping the sign of a signed number is ultimately simply flipping one bit.  While I couldn't be "further from the metal" given that I'm writing in JavaScript, I'm sure that as my JavaScript gets compiled or interpreted down and eventually turns into machine code, the machine is simply flipping a bit.

Anything else?
--------------
No.  Good night.