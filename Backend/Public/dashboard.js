const noticeBtn = document.querySelector(`.noticeClose`);
const dashboardP1 = document.querySelector(`.dashboardP1`);
const jobError = document.querySelector(`.jobError`);
const jobsContainer = document.querySelector(`.jobsContainer`);

function Remove(e) {
  e.target.parentElement.style.display = `none`;
}

noticeBtn.addEventListener(`click`, Remove);

// script for logging out
const boardExit = document.querySelector(`.boardExit`);
const Logout = async () => {
  document.cookie = `name=; expires=${new Date(Date.now() + 0 * 0)}`;
  localStorage.removeItem(`token`);
  const me = await fetch(`/remove`);
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
  const responseObject2 = await fetch(`/api/v1/jobs`, {
    headers: {
      Authorization: localStorage.getItem(`token`),
    },
  });
  if (responseObject2.status === 200) {
    const response = await responseObject2.json();
    const elements = response.map((each) => {
      return `<div data-id="${each._id}" class="jobsMain">
      <h5 class="jobsDate"> ${each.Date} </h5>
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
    // hobsContainer declared at line 4 already
    jobsContainer.innerHTML = elements.reverse().join(` `);
  } else {
    window.location.assign(`/Register.html`);
  }
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
      Authorization: localStorage.getItem(`token`),
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
  dashboardP1.style.display = `block`;
  dashboardP1.style.color = `green`;
  dashboardP1.innerText = `Congrats!!, Job request sent, kindly wait, for us to get back soon.`;
  setTimeout(() => {
    dashboardP1.style.display = `none`;
  }, 3500);
  if (responseObject.status === 200) {
    const responseObject2 = await fetch(`/api/v1/jobs/`, {
      headers: {
        Authorization: localStorage.getItem(`token`),
      },
    });
    const response = await responseObject2.json();
    const elements = response.map((each) => {
      return `<div data-id="${each._id}" class="jobsMain">
    <h5 class="jobsDate"> ${each.Date} </h5>
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
    // hobsContainer declared at line 4 already
    jobsContainer.innerHTML = elements.reverse().join(` `);
  } else {
    window.location.assign(`/Register.html`);
  }

  // elements.reverse();
};

jobBtn.addEventListener(`click`, sendJobData);

// script for editing and deleting jobs

const dashboardBody1 = document.querySelector(`.dashboardBody1`);
const dashboardDiv = document.querySelector(`.dashboardDiv`);
const companyChanged = document.querySelector(`.companyChanged`);
const positionChanged = document.querySelector(`.positionChanged`);
const statuses = document.querySelector(`#status`);

jobsContainer.addEventListener(`click`, (e) => {
  let id;
  // script for ediing jobs and companies  data sent to the server
  if (e.target.className === `edit`) {
    const Edit = async () => {
      // dashboardP1 already declared at line 2 of this script
      dashboardP1.innerText = ``;
      // jobsContainer declared at line 4 already
      jobsContainer.style.display = `none`;
      dashboardDiv.style.display = `none`;
      const title = document.querySelector(`.title`);
      title.style.display = `block`;
      const jobs = e.target.parentElement.parentElement.parentElement;
      id = jobs.getAttribute(`data-id`);
      // dashboardBody1 already declared at line 123 of this script
      dashboardBody1.style.display = `grid`;
      const responseObject = await fetch(`/api/v1/jobs/${id}`, {
        headers: {
          Authorization: localStorage.getItem(`token`),
        },
      });
      if (responseObject.status === 200) {
        const response = await responseObject.json();
        const { companyInput, positionInput, status } = response;
        companyChanged.value = companyInput;
        positionChanged.value = positionInput;
      } else {
        window.location.assign(`/Register.html`);
      }
      // statuses.options[statuses.selectedIndex].innerText = status;
    };
    Edit();

    const updateBtn = document.querySelector(`.updateBtn`);
    const Updating = async () => {
      const responseObject3 = await fetch(`/api/v1/jobs/${id}`, {
        method: `PUT`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(`token`),
        },
        body: JSON.stringify({
          companyInput: companyChanged.value,
          positionInput: positionChanged.value,
          status: statuses.options[statuses.selectedIndex].innerText,
        }),
      });
      const response = await responseObject3.json();
      const responseTag = document.querySelector(`.response`);
      responseTag.style.color = `green`;
      responseTag.innerHTML = response.msg;
      setTimeout(() => {
        responseTag.style.display = `none`;
      }, 3000);
    };
    updateBtn.addEventListener(`click`, Updating);
  }
  // script for deleting jobs and companies data sent to the server
  else if (e.target.className === `delete`) {
    const Delete = async () => {
      const jobs = e.target.parentElement.parentElement.parentElement;
      const id = jobs.getAttribute(`data-id`);
      const test = await fetch(`/api/v1/jobs/${id}`, {
        method: `DELETE`,
      });
      jobs.style.display = `none`;
    };
    Delete();
  }
});
