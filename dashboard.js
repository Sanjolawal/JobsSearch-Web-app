const noticeBtn = document.querySelector(`.noticeClose`);

function Remove(e) {
  e.target.parentElement.style.display = `none`;
}

noticeBtn.addEventListener(`click`, Remove);
