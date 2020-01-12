var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function(req, res, next) {
  __filename = "./data/data-sample.json";
  let rawdata = fs.readFileSync(__filename);
  let data_array = JSON.parse(rawdata);
  // console.log(data_array);

  //dua tren id nhan duoc trong req.body
  //tim kiem thong tin voi id phu hop va tra ve cho client

  for (i = 0; i < data_array.length; i++) {
    if (req.body.id == data_array[i]["id"]) {
      // console.log(data_array[i]);
      //res.send(JSON.stringify({ data: data_array[i], is_success: true }));
      res.send(data_array[i]);              //success!
      return true;
    }
  }
  //res.send(JSON.stringify({ data: data_array[i], is_success: false }));
  res.send("-1");
  return false;
});

module.exports = router;
