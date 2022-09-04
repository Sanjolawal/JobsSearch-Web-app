const loginP = document.querySelector(`.loginP1`);
const RegisterP = document.querySelector(`.registerP1`);
const login = document.querySelector(`.loginDiv`);
const Register = document.querySelector(`.registerDiv`);

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

// script for sending inputted login user data to server

const loginBtn = document.querySelector(`.loginBtn`);

const sendLoginData = async () => {
  const email = document.querySelector(`.email`);
  const password = document.querySelector(`.password`);
  if (!email.value || !password.value) {
    const loginErrors = document.querySelector(`.loginErrors`);
    setTimeout(() => {
      loginErrors.style.color = `red`;
      loginErrors.style.marginBottom = `1vh`;
      loginErrors.innerText = `Kindly input all fields`;
    }, 5);
    return setTimeout(() => {
      loginErrors.innerText = ``;
      loginErrors.style.marginBottom = `0`;
    }, 2500);
  }
  const responseObject = await fetch(``, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  email.value = ``;
  password.value = ``;
};

loginBtn.addEventListener(`click`, sendLoginData);

// script for sending inputted registeration user data to server

const registerBtn = document.querySelector(`.registerBtn`);

const sendRegisterationData = async () => {
  const email = document.querySelector(`.email`);
  const name = document.querySelector(`.name`);
  const password = document.querySelector(`.password`);
  if (!email.value || !password.value || !name) {
    const loginError = document.querySelector(`.loginError`);
    setTimeout(() => {
      loginError.style.color = `red`;
      loginError.style.marginBottom = `1vh`;
      loginError.innerText = `Kindly input all fields`;
    }, 5);
    return setTimeout(() => {
      loginError.innerText = ``;
      loginError.style.marginBottom = `0`;
    }, 2500);
  }
  const responseObject = await fetch(``, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      name: name.value,
      password: password.value,
    }),
  });
  name.value = ``;
  email.value = ``;
  password.value = ``;
};

registerBtn.addEventListener(`click`, sendRegisterationData);
