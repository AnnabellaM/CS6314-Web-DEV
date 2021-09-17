window.onload = function() {

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input elements 
	// they are initially empty and hidden

	var email = document.getElementById("email");
    var span1 = document.createElement("span");
	span1.style.display = "none"; //hide the span element
    email.parentNode.appendChild(span1);

    var pwd = document.getElementById("pwd");
    var span2 = document.createElement("span");
    span2.style.display = "none";
    pwd.parentNode.appendChild(span2);

    var confirm = document.getElementById("confirm");
    var span3 = document.createElement("span");
    span3.style.display = "none";
    confirm.parentNode.appendChild(span3);

    email.onfocus = function() {
        span2.style.display = "none"
        span3.style.display = "none"
        email.classList.remove("error")
        span1.style.display = "block"
        span1.textContent = "Please enter a valid email address, eg. abc@def.xyz"
    }

    email.onblur = function() {
        span1.style.display = "none"
    }

    pwd.onfocus = function() {
        span1.style.display = "none"
        span3.style.display = "none"
        pwd.classList.remove("error")
        confirm.classList.remove("error")
        span2.style.display = "block"
        span2.textContent = "The password field should contain at least six characters, one uppercase letter, one number and one special character"
    }

    pwd.onblur = function() {
        span2.style.display = "none"
    }

    confirm.onfocus = function() {
        span1.style.display = "none"
        span2.style.display = "none"
        pwd.classList.remove("error")
        confirm.classList.remove("error")
        span3.style.display = "block"
        span3.textContent = "Please enter password again"
    }

    confirm.onblur = function() {
        span3.style.display = "none"
    }

    
    var form = document.getElementById("myForm");
    form.onsubmit = function(e) {
    	
        var regForEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/
        if (!email.value.match(regForEmail)) {
            email.classList.add("error")
            span1.style.display = "block"
            span1.textContent = "You should enter a valid email address"
            return false;
        }

        if (pwd.value.length < 6) {
            pwd.classList.add("error")
            span2.style.display = "block"
            span2.textContent = "You should enter at least six characters"
            return false;
        }

        if (!pwd.value.match(/[A-Z]/)) {
            pwd.classList.add("error")
            span2.style.display = "block"
            span2.textContent = "You should enter at least one uppercase letter"
            return false;
        }

        if (!pwd.value.match(/[0-9]/)) {
            pwd.classList.add("error")
            span2.style.display = "block"
            span2.textContent = "You should enter at least one number"
            return false;
        }

        if (!pwd.value.match(/[!,@,#,$,%,^,&,*,+]/)) {
            pwd.classList.add("error")
            span2.style.display = "block"
            span2.textContent = "You should enter at least one special character"
            return false;
        }

        if (pwd.value !== confirm.value) {
            pwd.classList.add("error")
            confirm.classList.add("error")
            span3.style.display = "block"
            span3.textContent = "Password and confirm password fields should match"
            return false;
        }

        return true

        // e.preventDefault();
    }
}
