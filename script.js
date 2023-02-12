// const axios = require("axios");
const register_dev = document.getElementById("register-dev");

if (register_dev) {
  register_dev.addEventListener("submit", (e) => {
    e.preventDefault();

    let form = e.currentTarget;
    let url = form.action;
    let formData = new FormData(form);

    let technologies = formData.getAll("technologies");
    console.log(technologies);
    formData.delete("technologies");

    let formDataJson = Object.fromEntries(formData.entries());

    formDataJson.technologies = technologies;
    // console.log(formDataJson);

    axios
      .post(url, formDataJson)
      .then(function (response) {
        console.log(response.data.message);
        //   e.target.innerHTML = response.data.message;
        window.location.href = "login.html";
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
//Fetch Developers List
const devList = document.getElementById("devList");
if (devList) {
  console.log(devList);
  axios.get("http://localhost:5001/dev-list").then((response) => {
    console.log(response);
    response.data.forEach((res) => {
      devList.innerHTML += `
      <div class="col-md-4 col-sm-4 col-lg-4">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${res.name}</h5>
                        <p class="card-text">${res.technologies}</p>
                        <a href="#"><i class="fa-brands fa-github"></i></a><br />
                        <a href="#" class="btn btn-primary">Send Request</a>
                    </div>
                </div>
            </div>
      `;
    });
  });
}

//Fetch company List
// const compList = document.getElementById("compList");
// if (compList) {
//   console.log(compList);
//   axios.get("http://localhost:5001/comp-list").then((response) => {
//     console.log(response);
//     response.data.forEach((res) => {
//       compList.innerHTML += `
//       <div class="col">
//                 <div class="card" style="width: 18rem;">
//                     <div class="card-body">
//                         <h5 class="card-title">${res.name}</h5>
//                         <p class="card-text">${res.phone}</p>
//                         <p class="card-text">${res.email}</p>
//                         <a href="#"><i class="fa-brands fa-github"></i></a><br />
//                         <a href="#" class="btn btn-primary">Send Request</a>
//                     </div>
//                 </div>
//             </div>
//       `;
//     });
//   });
// }

//Fetch Job List
const jobList = document.getElementById("compList");
if (jobList) {
  axios.get("http://localhost:5001/job-list").then((response) => {
    console.log(response);
    response.data.forEach((res) => {
      compList.innerHTML += `
      <div class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${res.name}</h5>
                        <p class="card-text">${res.jtitle}</p>
                        <p class="card-text">${res.technologies}</p>
                        <a href="#"><i class="fa-brands fa-github"></i></a><br />
                        <a href="#" class="btn btn-primary">Send Request</a>
                    </div>
                </div>
            </div>
      `;
    });
  });
}

//Login function
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  console.log(loginForm);
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    let url = form.action;
    let formData = new FormData(form);

    let formDataJson = Object.fromEntries(formData.entries());

    axios.post(url, formDataJson).then((response) => {
      console.log(response);
      if (response.status === 200 && response.data.message === "success") {
        window.location.href = `/${response.data.redirect}-landing.html`;
      } else {
        document.getElementById("error").textContent = response.data.message;
      }
    });
  });
}
