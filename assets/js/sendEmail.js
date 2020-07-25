function sendMail(contactForm) {
    emailjs.send("gmail","template_M67I9oI5", {//email.JSsend(service, templateID, objectContainsParameters). 
    //Keys match template an values match the "name" attribute on the elements inside the <form></form> in contact.html
    "from_name": contactForm.name.value, //name = from line 18 on contact.html
    "from_email": contactForm.emailaddress.value,
    "project_request": contactForm.projectsummary.value
})  
.then(
    function(response) {
        console.log("SUCCESS!", response);
    },
    function(error) {
        console.log("FAILED", error);
    }
    );
       return false;
}