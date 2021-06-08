//Express Configuration
const express = require("express");
const app = express();
const PORT = 4000;

require("dotenv").config();

//Cors Configuration
const cors = require("cors");
app.use(cors());

//BodyParser Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Node Mailer Configuration
const nodemailer = require("nodemailer");

//Creating transport instance
const transport = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

//Creating a Nodemailer Transport instance
const transporter = nodemailer.createTransport(transport);

//Verifying the Nodemailer Transport instance
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

//Express Router Configuration
const router = express.Router();

router.post("/send", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const ejs = require("ejs");

  ejs.renderFile(
    __dirname + "/Hello.ejs",
    { name: name },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const mainOptions = {
          from: "bmuday971@gmail.com",
          to: email,
          subject: "Account Activated",
          html: data,
        };
        //console.log("html data ======================>", mainOptions.html);

        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.json({
              msg: "fail",
            });
          } else {
            res.json({
              msg: "success",
            });
          }
        });
      }
    }
  );
});

app.use("/api", router);

app.listen(PORT, function () {
  console.log("Server is running at PORT:", PORT);
});
