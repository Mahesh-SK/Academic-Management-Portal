
let form = document.querySelector('form');
form.addEventListener('submit', (e) => {

    e.preventDefault();

    let user = document.getElementById('user').value.trim();
    let pass = document.getElementById('pass').value.trim();
    let cpass = document.getElementById('cpass').value.trim();
    let mail = document.getElementById('mail').value.trim();
    let num = document.getElementById('num').value.trim();


    let usererror = document.getElementById('uerror');
    let perror = document.getElementById('perror');
    let merror = document.getElementById('merror');
    let cperror = document.getElementById('cperror');
    let nerror = document.getElementById('nerror');

    usererror.textContent = "";
    perror.textContent = "";
    merror.textContent = "";
    cperror.textContent = "";
    nerror.textContent = "";

    let valid = true;

    let usernamepattern = /^[A-Z][a-zA-Z0-9]{8,15}$/;
    if (!user) {
        usererror.textContent = "cannot be empty";
        valid = false;
    }
    else if (!usernamepattern.test(user)) {
        usererror.textContent = "Characters must be uppercase,numbers"
        valid = false;
    }
    let Passwordpattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[&*%$#@])(A-Za-z\d&*%$#@){8,15}$/;
    if (!pass) {
        perror.textContent = "Password cannot be empty";
        valid = false;
    }
    else if (Passwordpattern.test(pass)) {
        perror.textContent = "Password must be capital letter,number,special characters"
        valid = false;
    }

    let cpassword = cpass.trim();
    if (!cpassword) {
        cperror.textContent = "cannot be empty";
        valid = false;
    }
    else if (cpass!== pass) {
        cperror.textContent = "password is not matching";
        valid = false;
    }

    let numberpattern = /^[0-9]{10}$/;
    if (!num) {
        nerror.textContent = "cannot be empty";
        valid = false;
    }
    else if (!numberpattern.test(num)) {
        nerror.textContent = "number should be 10 digit"
        valid = false;
    }

    let mailpattern = /^[^\@\s]+@[^\@\s]+\.[^\@\s]+$/

    if (!mail) {
        merror.textContent = "cannot be empty";
        valid = false;
    }
    else if (!mailpattern.test(mail)) {
        merror.textContent = "Invalid email"
        valid = false;
    }

    if (valid) {
        const register = {
            username: user,
            password: pass,
            mail: mail,
            cpassword: cpass,
            num: num
        }
        localStorage.setItem('register', JSON.stringify(register));
        location.href="../Login/Login.html"
        alert('registration is successfull');
    }

})