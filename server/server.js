//Express Configuration
var express = require("express");
const app = express();
const PORT = 4000;

//Cors Configuration
const cors = require("cors");
app.use(cors());

//BodyParser Configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Node Mailer Configuration
var nodemailer = require("nodemailer");

//Creating transport instance
var transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

//Creating a Nodemailer Transport instance
var transporter = nodemailer.createTransport(transport);

//Verifying the Nodemailer Transport instance
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

//Express Router Configuration
var router = express.Router();

router.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  const ejs = require("ejs");

  ejs.renderFile(
    __dirname + "/Hello.ejs",
    { name: name },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: '"YOUR_NAME" YOUR_EMAIL_ADDRESS',
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
