// making a login page that switches to register page as well 
const loginPage = document.getElementById('login-page');
const registerPage = document.getElementById('register-page');
const registerLink = document.getElementById('show-register');
const needAccount = document.getElementById('need-account');


//  show n hide
function showRegisterForm() {
    loginPage.style.display = 'none';
    registerPage.style.display = 'block';
    registerLink.style.display = 'none';
    needAccount.style.display = 'none';
}

// if register link is clicked.., register page  appears 
registerLink.addEventListener('click', function (event) {
    event.preventDefault();
    showRegisterForm();
});

// alert for  loginpage submission
const loginForm = document.getElementById('login-page');
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Login Form Submitted');
});

// creating account w identical pw's
const registerForm = document.getElementById('register-page');
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const password1 = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;

// make a rule for passwords to match before submission 
    if (password1 !== password2) {
        alert('Passwords do not match. Give it another shot.');
        return;
    }

// alert when page is submitted
    alert('Register Form Submitted');
    registerForm.submit();

});