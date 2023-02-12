const fs = require("fs");

const homePage = (req, res) => {
  res.send("Homepagenew");
};

const hireDeveloper = (req, res) => {
  fs.readFile("companies.json", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
    let existingData = JSON.parse(data);
    existingData.push(req.body);
    existingData = JSON.stringify(existingData);

    fs.writeFile("companies.json", existingData, (err) => {
      if (err) throw err;
      console.log("Data appended to file");
    });
  });

  return res.json({ message: "form submitted" });
};

const registerDeveloper = (req, res) => {
  fs.readFile("developers.json", "utf-8", (err, data) => {
    if (err) throw err;
    let existingData = JSON.parse(data);
    existingData.push(req.body);
    existingData = JSON.stringify(existingData);

    fs.writeFile("developers.json", existingData, (err) => {
      if (err) throw err;
      console.log("Data appended to file");
    });
  });

  return res.json({ message: "form submitted" });
  //open json file and append it with latest userdata
};
const login = (req, res) => {
  const { username, password, role } = req.body;
  fs.readFile(`${role}.json`, (err, data) => {
    if (err) console.log(err);
    let dataString = JSON.parse(Buffer.from(data).toString());
    // console.log(dataString);
    let validData = dataString.filter((d) => {
      return username === d.uname;
    });
    console.log(validData);
    //verify uname/pass
    if (validData.length > 0 && password === validData[0].pword) {
      res.status(200).json({ message: "success", redirect: role });
    } else {
      res.json({ message: "invalid credentials" });
    }
  });

  // res.send("login page");
};

//Dev list
const devList = async (req, res) => {
  const devData = fs.readFileSync("developers.json");
  res.send(devData);
};
//Comp list
const compList = async (req, res) => {
  const compData = fs.readFileSync("companies.json");
  res.send(compData);
};
//Job list
const jobList = async (req, res) => {
  const jobData = fs.readFileSync("joblist.json");
  res.send(jobData);
};

//Post Job
const postJob = async (req, res) => {
  // const { name, jtitle, technologies } = req.body;
  fs.readFile("joblist.json", "utf-8", (err, data) => {
    if (err) throw err;
    let existingData = JSON.parse(data);
    existingData.push(req.body);
    existingData = JSON.stringify(existingData);

    fs.writeFile("joblist.json", existingData, (err) => {
      if (err) throw err;
      console.log("Data appended to file");
    });
  });
};
module.exports = {
  homePage,
  hireDeveloper,
  registerDeveloper,
  login,
  devList,
  compList,
  postJob,
  jobList,
};
