var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.post("/", function(req, res, next) {
  // lay data trong data-sample.json
  __filename = "./data/data-sample.json";
  let rawdata = fs.readFileSync(__filename);
  let data_array = JSON.parse(rawdata);
  // console.log(data_array);

  // Tao object json newuser dua tren data nhan duoc trong req.body
  if(req.body.name == ""){
    res.send(
      JSON.stringify({
        function: "add-data",
        is_success: false,
        res: "fail"
      })
    );
    return false;
  }
  let new_user = {
    id: data_array.length + 1,
    name: req.body.name,
    job: req.body.job,
    workspace: req.body.workspace,
    job_description: req.body.job_description,
    skill_name: req.body.skill_name,
    level: req.body.level,
    skill_description: req.body.skill_description,
    school: req.body.school,
    school_description: req.body.school_description,
    achievements: req.body.achievements,
    videos: req.body.videos
  };

  // them newuser vao trong mang data
  data_array.push(new_user);

  //viet lai data-sample voi mang data moi
  fs.writeFile(__filename, JSON.stringify(data_array), "utf8", function readFileCallback(
    err,
    data
  ) {
    if (err) {
      // tra ve {function: "add-data", is_success:; false, res: "fail"} khi gap loi ghi vao trong database
      console.log(err);
      res.send(
        JSON.stringify({
          function: "add-data",
          is_success: false,
          res: "fail"
        })
      );
    }
    else{
      // tra ve {function: "add-data", is_success:; true, res: null} khi gap loi ghi vao trong database

      res.send(
        JSON.stringify({
          function: "add-data",
          is_success: true,
          res: null
        })
      );
    }
  });
});

module.exports = router;