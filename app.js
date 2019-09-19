let express = require("express"),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

let app = express();

app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send-email', function (req, res) {

      const output = `
          <h4>Greetings From Digifoxlabs</h4>
          <h4>Hello ${req.body.name} Hope You Are Doing Well!!!</h4><br>
          <h5>Message:</h5>
          <p>${req.body.message}</p>
          <img src="put image link" alt="Logo" height="25" width="72">
          <p>Palash Boro (${req.body.phone})</p>
      `;

      let transporter = nodeMailer.createTransport({
            host: 'xyz.abc.com',
            port: 587,
            auth: {
            user: 'xyz@abc.com',
            pass: 'xyz'
            },
      });

      let mailOptions = {
          // should be replaced with real recipient's account
          from: '"xyz 👻" <xyz@abc.com>', // sender address
          to: req.body.email,
          subject: req.body.subject,
          html: output
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
      });
      res.writeHead(301, { Location: 'index.html' });
      res.end();
});


let server = app.listen(8081, function(){
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});