
const mobileNav = document.querySelector("#toggleMobileNav");
const closeNav = document.querySelector("#closeNav");
const showNavIcon = document.querySelector("#showNav");
let windowDirect;
function showNavigation(e) {
    mobileNav.style.display = "inline-block";
    showNavIcon.style.display = "none";
    closeNav.style.display = "flex";
}
function closeNavigation() {
    mobileNav.style.display = "none";
    showNavIcon.style.display = "flex";
    closeNav.style.display = "none";
}
const fullName_input = document.querySelector("#fullName");
const email_input = document.querySelector("#email");
const message_input = document.querySelector("#message");
const number_input = document.querySelector("#phone");
let nameBool = false;
let emailBool = false;


document.querySelector("#contactForm").submit = (e) => {
    e.preventDefault();
}

function validBool(e, errorType) {
    //index 1 = invalid input
    //index 3 = neutral input
    //index 5 = valid input
    const inputLength = e.target.value.length;
    if (errorType == "nameType") {

        let reg = /[^a-zA-z\s]/;
        if (inputLength > 30) {
            e.target.nextElementSibling.childNodes[1].style.display = "flex";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "none";
            document.querySelector("#nameError").innerHTML = "Cannot be longer than 30 characters."
        }
        else if (reg.test(e.target.value)) {
            e.target.nextElementSibling.childNodes[1].style.display = "flex";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "none";
            document.querySelector("#nameError").innerHTML = "Please enter a valid name."
        }
        else if (inputLength == 0) {
            e.target.nextElementSibling.childNodes[1].style.display = "flex";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "none";
            document.querySelector("#nameError").innerHTML = "Please enter a valid name."
        }
        else {
            e.target.nextElementSibling.childNodes[1].style.display = "none";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "flex";
            document.querySelector("#nameError").innerHTML = "";
            return true;
        }
    }
    else if (errorType == "emailType") {
        let reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
        if (!reg.test(e.target.value)) {
            e.target.nextElementSibling.childNodes[1].style.display = "flex";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "none";
            document.querySelector("#emailError").innerHTML = "Please enter a valid email."
        }
        else if (inputLength == 0) {
            e.target.nextElementSibling.childNodes[1].style.display = "flex";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "none";
            document.querySelector("#emailError").innerHTML = "Please enter a valid email."
        }
        else {
            e.target.nextElementSibling.childNodes[1].style.display = "none";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "flex";
            document.querySelector("#emailError").innerHTML = "";
            return true;
        }
    }
    else if (errorType = "phoneType") {
        let reg = /^\d+$/;
        if (!reg.test(e.target.value)) {
            e.target.nextElementSibling.childNodes[1].style.display = "flex";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "none";
            document.querySelector("#phoneError").innerHTML = "Please enter a valid number."
        }
        else {
            e.target.nextElementSibling.childNodes[1].style.display = "none";
            e.target.nextElementSibling.childNodes[3].style.display = "none";
            e.target.nextElementSibling.childNodes[5].style.display = "flex";
            document.querySelector("#phoneError").innerHTML = "";
        }
    }
    return false;
}



fullName_input.addEventListener("keyup", function (e) {
    nameBool = validBool(e, "nameType");
});


email_input.addEventListener("keyup", (e) => {
    emailBool = validBool(e, "emailType");
});

number_input.addEventListener("keyup", (e) => {
    validBool(e, "phoneType");
});


function validSubmit() {
    if (emailBool && nameBool) {
        const userDetails = {};
        userDetails.name = fullName_input.value;
        userDetails.email = email_input.value;
        userDetails.phone = number_input.value || "0";
        userDetails.message = message_input.value;
        if (document.querySelector("#emailaddress").value.length > 0 || document.querySelector("#fullname").value.length > 0) {
            userDetails.emailaddress = document.querySelector("#emailaddress").value;
            userDetails.fullname = document.querySelector("#fullname").value;
        }

        const url = "contact.php";
        //validate
        $.ajax({
            type: "POST",
            url: url,
            data: {
                jsonFile: JSON.stringify(userDetails),
                captcha: grecaptcha.getResponse()
            },
            dataType: 'text',
            cache: false,
            success: function (data) {
                if (data == 200) window.location.href = "https://www.dfctaxcenter.com/contact/thankyou.html";
                else if (data == 404) window.location.href = "https://www.dfctaxcenter.com";
                else if (data == 405) window.location.href = "https://www.dfctaxcenter.com/contact/error.html";
            },
            error: function (xhr) {
                window.location.href = "https://www.dfctaxcenter.com/contact/error.html";


            }
        });
    }
}

function sendWindow(status) {
    console.log(status);
    if (status == 200) {
        window.location.href = "https://www.dfctaxcenter.com/contact/thankyou.html";
    }
}

