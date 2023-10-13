const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
  const id = req.params.id;
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "sahilchopade233@gmail.com",
      pass: "7bBZOchYJs4SyfjH",
    },
  });
  // const transporter = nodemailer.createTransport({
  //   host: "pop3.mailtrap.io",
  //   port: 587,
  //   auth: {
  //     user: "be1dc8ca38f443",
  //     pass: "5758768145bb04",
  //   },
  // });
  let info = await transporter.sendMail({
    from: `"Sahil Chopade 👻" <${testAccount.user}>`, // sender address
    to: `${req.body.receiversMail}`, // list of receivers
    subject: "Hello Sahil, Here is the download link of ", // Subject line
    text: "Hello world?", // plain text body
    html: `Here is your link:<br> <a href="${req.body.url}">${req.body.url}</a>`, // html body
  });
  console.log(info);
  res.send({ message: "Mail Sent" , status: true});
};

module.exports = sendMail;
