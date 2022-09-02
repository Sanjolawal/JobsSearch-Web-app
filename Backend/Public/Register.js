const loginP = document.querySelector(`.loginP1`);
const RegisterP = document.querySelector(`.registerP1`);
const login = document.querySelector(`.loginDiv`);
const Register = document.querySelector(`.registerDiv`);
const noticeBtn = document.querySelector(`.noticeClose`);

function Remove(e) {
  e.target.parentElement.style.display = `none`;
}

noticeBtn.addEventListener(`click`, Remove);

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
