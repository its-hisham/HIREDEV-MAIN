const express = require("express");
const app = express();
const cors = require("cors");
const PageController = require("./controllers/PageController");

app.use(cors());
app.use(express.json());
//required when using form
app.use(express.urlencoded());

//paths
app.get("/", PageController.homePage);
app.post("/hire-developer", PageController.hireDeveloper);
app.post("/register-developer", PageController.registerDeveloper);
app.post("/login", PageController.login);
app.post("/post-job", PageController.postJob);

//Fetch Developers
app.get("/dev-list", PageController.devList);
app.get("/comp-list", PageController.compList);
app.get("/job-list", PageController.jobList);

app.listen(5001, () => console.log("Server running on 5001"));
