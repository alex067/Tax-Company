/*script to control captcha callback

let widget;
const onloadCallBack = function() {
    widget = grecaptcha.render("html_element", {
        sitekey: "6LfqPokUAAAAAKtxJavHl5ytQkooUCcnIc5Lp2f3",
        theme:"dark",
        size:"normal"
    });
};*/
let response;

const submitBtn = document.querySelector("#submitBtn");

let onCallBack = function () {
    submitBtn.removeAttribute("disabled");
    submitBtn.style.opacity = 1;
};
let onExpired = function () {
    submitBtn.setAttribute("disabled", true);
    submitBtn.style.opacity = 0.5;
}


window.onCallBack = onCallBack;
window.onExpired = onExpired; 