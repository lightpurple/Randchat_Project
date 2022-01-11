import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_KEYID,
  secretAccessKey: process.env.S3_PRIVATE_KEY,
  region: process.env.REIGION,
});

const twoWord = (data) => (data < 10 ? "0" : "");

function getTodayFormat() {
  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hour = today.getHours();
  let minute = today.getMinutes(); // 분
  let seconds = today.getSeconds();

  let format = `${year - 2000}${twoWord(month)}${month}${twoWord(
    date
  )}${date}_${twoWord(hour)}${hour}${twoWord(minute)}${minute}${twoWord(
    seconds
  )}${seconds}`;
  // ex) 22_01_11_18:30:32
  return format;
}

export default multer({
  storage: multerS3({
    s3: s3,
    bucket: "randchat-bucket",
    acl: "public-read",
    key: (req, file, cb) => {
      cb(
        null,
        `profile/${getTodayFormat()}-${
          req.decoded.id
        }${file.originalname.substring(file.originalname.lastIndexOf("."))}`
      );
    },
  }),
  limits: { fileSize: 4 * 1024 * 1024 },
});
