// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", (req, res) => {
    // No params
    const currentTime = new Date();
    console.log(`${currentTime} requested`);

    res.json({
      unix: Math.floor(currentTime.getTime()),
      utc: currentTime.toUTCString()
    });
});

app.get("/api/:date", (req, res) => {
  // Assuming it's an ISO date
  const myDate = new Date (req.params.date);
  //console.log(myDate);

  // Assuming it's UNIX
  const myDate2 = new Date (parseInt(req.params.date));
  //console.log(myDate2);

  if (myDate instanceof Date && !isNaN(myDate)) {
    console.log(`Case 1 ${myDate}`);
    res.json({
      unix: Math.floor(myDate.getTime()),
      utc: myDate.toUTCString()
    });
  } else if (myDate2 instanceof Date && !isNaN(myDate2)) {
    console.log(`Case 2 unix`);
    res.json({
      unix: Math.floor(myDate2.getTime()),
      utc: myDate2.toUTCString()
    });
  } else {
    console.log(`Case 3 invalid`);
    res.json({
      error: "Invalid Date"
    });
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
