const loginP = document.querySelector(`.loginP1`);
const RegisterP = document.querySelector(`.registerP1`);
const login = document.querySelector(`.loginDiv`);
const Register = document.querySelector(`.registerDiv`);
const loginErrors = document.querySelector(`.loginErrors`);

// script for my contacts on top of webpage
const noticeBtn = document.querySelector(`.noticeClose`);

function Remove(e) {
  e.target.parentElement.style.display = `none`;
}

noticeBtn.addEventListener(`click`, Remove);

// script  for toggling between register and login page
function Hidelogin() {
  login.style.display = `none`;
  Register.style.display = `block`;
}

loginP.addEventListener(`click`, Hidelogin);

function Showlogin() {
  Register.style.display = `none`;
  login.style.display = `block`;
}

RegisterP.addEventListener(`click`, Showlogin);

// script for sending inputted LOGIN user data to server

const loginBtn = document.querySelector(`.loginBtn`);

const sendLoginData = async () => {
  const email = document.querySelector(`.email`);
  const password = document.querySelector(`.password`);
  if (!email.value || !password.value) {
    // login errors variable already declared at line 5
    loginErrors.style.color = `red`;
    loginErrors.style.marginBottom = `1vh`;
    loginErrors.innerText = `Kindly input all fields`;
    return setTimeout(() => {
      loginErrors.innerText = ``;
      loginErrors.style.marginBottom = `0`;
    }, 2500);
  }
  const responseObject = await fetch(`api/v1/users`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: email.value,
      password: password.value,
    }),
  });
  email.value = ``;
  password.value = ``;
  // login errors variable already declared at line 5
  const response = await responseObject.json();
  const { msg } = response;
  if (responseObject.status === 200) {
    return (
      (loginErrors.style.color = `green`),
      (loginErrors.style.marginBottom = `1vh`),
      (loginErrors.innerText = `Welcome back`),
      setTimeout(() => {
        (loginErrors.innerText = ``), (loginErrors.style.marginBottom = `0`);
      }, 1500),
      (document.cookie = `name=${msg}; expires=${new Date(
        Date.now() + 720 * 3600000
      )}; path=/`),
      location.assign(`/dashboard.html`)
    );
  }
  loginErrors.style.color = `red`;
  loginErrors.style.marginBottom = `1vh`;
  loginErrors.innerText = msg;
  setTimeout(() => {
    loginErrors.innerText = ``;
    loginErrors.style.marginBottom = `0`;
  }, 2500);
};

loginBtn.addEventListener(`click`, sendLoginData);

// script for sending inputted RREGISTERATION user data to server

const registerBtn = document.querySelector(`.registerBtn`);
const loginError = document.querySelector(`.loginError`);

const sendRegisterationData = async () => {
  const email2 = document.querySelector(`.email2`);
  const name = document.querySelector(`.name`);
  const password2 = document.querySelector(`.password2`);
  if (!email2.value || !password2.value || !name.value) {
    console.log(name.value, password2.value, email2.value);
    // login error already declared at line 79 of this script
    loginError.style.color = `red`;
    loginError.style.marginBottom = `1vh`;
    loginError.innerText = `Kindly input all fields`;
    return setTimeout(() => {
      loginError.innerText = ``;
      loginError.style.marginBottom = `0`;
    }, 2500);
  }
  const responseObject = await fetch(`/api/v1/userinfo`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: email2.value,
      Name: name.value,
      protection: password2.value,
    }),
  });
  name.value = ``;
  email2.value = ``;
  password2.value = ``;
  const { msg } = await responseObject.json();
  console.log(responseObject);
  // login error already declared at line 79 of this script
  if (responseObject.status === 200) {
    loginError.style.color = `green`;
    loginError.style.marginBottom = `1vh`;
    loginError.innerText = `Data sent succesfully`;
    setTimeout(() => {
      loginError.innerText = ``;
      loginError.style.marginBottom = `0`;
    }, 2000);
    document.cookie = `name=${msg}; expires=${new Date(
      Date.now() + 720 * 3600000
    )}; path=/`;
    location.assign(`/dashboard.html`);
  } else {
    loginError.style.color = `red`;
    loginError.style.marginBottom = `1vh`;
    loginError.innerText = msg;
    setTimeout(() => {
      loginError.innerText = ``;
      loginError.style.marginBottom = `0`;
    }, 10000);
  }
};

registerBtn.addEventListener(`click`, sendRegisterationData);
