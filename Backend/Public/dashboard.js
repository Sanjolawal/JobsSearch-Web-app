const noticeBtn = document.querySelector(`.noticeClose`);
const dashboardP1 = document.querySelector(`.dashboardP1`);
const jobError = document.querySelector(`.jobError`);

function Remove(e) {
  e.target.parentElement.style.display = `none`;
}

noticeBtn.addEventListener(`click`, Remove);

// script for logging out
const boardExit = document.querySelector(`.boardExit`);
const Logout = async () => {
  console.log(boardExit);
  document.cookie = `name=; expires=${new Date(Date.now() + 0 * 0)}`;
  const me = await fetch(`/remove`);
  console.log(boardExit);
  window.location.assign(`/dashboard.html`);
};
boardExit.addEventListener(`click`, Logout);

// script for timed greetings
const mobileName = document.querySelector(`.mobileName`);
setTimeout(() => {
  mobileName.style.display = `none`;
}, 4500);

// script for accessing job data present  in the server

const display = async () => {
  const responseObject2 = await fetch(`/api/v1/jobs`);
  const response = await responseObject2.json();
  console.log(response);
  const elements = response.map((each) => {
    return `<div class="jobsMain">
    <h5 class="jobsDate"> ${new Date().toDateString()} </h5>
    <p class="position">${each.positionInput}</p>
    <p class="company">${each.companyInput.toUpperCase()}</p>
    <div class="jobsCtas">
      <div>
        <button class="edit">Edit</button>
         <button class="delete">Delete</button>
       </div>
       <p class="status">${each.status}</p>
     </div>
      </div>`;
  });
  if (elements.length >= 1) {
    const dashboardP1 = document.querySelector(`.dashboardP1`);
    dashboardP1.style.display = `none`;
  }
  const jobsContainer = document.querySelector(`.jobsContainer`);
  jobsContainer.innerHTML = elements.reverse().join(` `);
};
display();

// script for sending user inputted job and company data to server

const jobBtn = document.querySelector(`.jobBtn`);

const sendJobData = async () => {
  const companyInput = document.querySelector(`.companyInput`);
  const positionInput = document.querySelector(`.positionInput`);
  if (!companyInput.value || !positionInput.value) {
    // job error variable already declared at line 3 of this script
    jobError.style.color = `red`;
    jobError.style.marginBottom = `1vh`;
    jobError.innerText = `Kindly input all fields`;
    return setTimeout(() => {
      jobError.innerText = ``;
      jobError.style.marginBottom = `0`;
    }, 2500);
  }
  const responseObject = await fetch(`/api/v1/jobs`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyInput: companyInput.value,
      positionInput: positionInput.value,
      status: `PENDING`,
    }),
  });
  companyInput.value = ``;
  positionInput.value = ``;
  // dashboardP1 already declared at line 2 of this script
  dashboardP1.innerText = ``;
  dashboardP1.style.color = `green`;
  dashboardP1.innerText = `Congrats!!, Job request sent, kindly wait, for us to get back soon.`;
  setTimeout(() => {
    dashboardP1.style.display = `none`;
  }, 3500);

  const responseObject2 = await fetch(`/api/v1/jobs`);
  const response = await responseObject2.json();
  console.log(response);
  const elements = response.map((each) => {
    return `<div class="jobsMain">
    <h5 class="jobsDate"> ${new Date().toDateString()} </h5>
    <p class="position">${each.positionInput}</p>
    <p class="company">${each.companyInput.toUpperCase()}</p>
    <div class="jobsCtas">
      <div>
        <button class="edit">Edit</button>
         <button class="delete">Delete</button>
       </div>
       <p class="status">${each.status}</p>
     </div>
      </div>`;
  });
  // elements.reverse();
  const jobsContainer = document.querySelector(`.jobsContainer`);
  jobsContainer.innerHTML = elements.reverse().join(` `);
};

jobBtn.addEventListener(`click`, sendJobData);

// // script for ediing jobs and companies  data sent to the server
// const edit = document.querySelector(`.edit`);

// const Edit = async () => {
//   const dashboardDiv = document.querySelector(`.dashboardDiv`);
//   const jobsContainer = document.querySelector(`.jobsContainer`);
//   // dashboardP1 already declared at line 2 of this script
//   dashboardP1.innerText = ``;
//   dashboardDiv.style.display = `none`;
//   jobsContainer.style.display = `none`;
//   const responseObject = await fetch(``);
//   const title = document.querySelector(`.title`);
//   const dashboardBody1 = document.querySelector(`.dashboardBody1`);
//   title.style.display = `none`;
//   dashboardBody1.style.display = `grid`;
// };

// edit.addEventListener(`click`, Edit);

// // script for deleting jobs and companies data sent to the server
// const deletes = document.querySelector(`.delete`);

// const Delete = async () => {
//   const jobsMain = document.querySelector(`.jobsMain`);
//   jobsMain.style.display = `none`;
// };

// deletes.addEventListener(`click`, Delete);

// // script for updating  jobs and companies data sent to the server
// const updateBtn = document.querySelector(`.updateBtn`);

// const Updating = async () => {
//   const companyChanged = document.querySelector(`.companyChanged`);
//   const positionChanged = document.querySelector(`.positionChanged`);
//   await fetch(``, {
//     method: `PATCH`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       company: companyChanged.value,
//       position: positionChanged.value,
//       status: ``,
//     }),
//   });
// };

// updateBtn.addEventListener(`click`, Updating);
