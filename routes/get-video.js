var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");


//INPUT: VIDEO_ID (theo dạng query)
// VD: localhost:3000/get-video?vid_id=1712052aaa
//OUTPUT: MP4 VIDEO FILE

router.get('/', function(req, res) {

    vpath = "";                                 //đường dẫn gián tiếp
    //lấy từ file videos_pathList.json, ghép path vào
    __filename = "./data/videos_pathList.json";
    let rawdata = fs.readFileSync(__filename);
    let data_array = JSON.parse(rawdata);               //lấy ra videos_pathList thành data_array
    //console.log(data_array);
    
    for (i = 0; i < data_array.length; i++)
    if (data_array[i]["vid_id"] == req.query.vid_id)
        {
            vpath = path.join(__dirname, "..", "data", "videos", data_array[i]["vid_name"]);
            console.log("Ok got video path :" + vpath);
            break;
        }


    // BƯỚC 2: Bắt đầu gửi các bytes về

    const stat = fs.statSync(vpath)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(vpath, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(vpath).pipe(res)
    }
  });

module.exports = router;
