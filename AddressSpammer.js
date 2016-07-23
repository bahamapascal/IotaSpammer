
var requestify = require("requestify"); 
var counter    = 0;

startSpamming();

function sendRequest(requestData, callback) {
 console.log("Sending a request with data " + JSON.stringify(requestData));

 

requestify.post("http://localhost:14265", requestData, {"timeout": 12000000})
   .then(function(response) {
     var data = response.getBody();

     if (data.exception) {
       console.log("Exception: " + data.exception);
     } else if (data.error) {
       console.log("Error: " + data.error);
     } else {counter++};

     // Always do callback.. (even if an error)

     callback(data);
   }).fail(function(err) {
     console.log("Request failed:");
     console.log(err);
   });
}

function startSpamming() {
 console.log("Starting to make a tx..");
 var seed = "SPAMMERSERVERTWOSEND99999999999999999999999999999999999999999999999999999999999999999999999999999";
 var address = "RH9JINAYPFDDZPJBR9AQFMNYMBAQAOV9THCODHPNKCQYPFODXBFIEXIORYHT9ANJVIEBVCSBQTLXQFHMP9SUUTTLIY";
 sendRequest({"command"             : "transfer", 
              "seed"               : seed,
              "securityLevel"      : 1,
			  "address"            : address,
			  "value"              : "0",
			  "message"            : "",
              "minWeightMagnitude" : 13}, function(data) {
   
   
   console.log("Got tx: " + JSON.stringify(data));
   console.log("Total tx made: " + counter);

   startSpamming();
 });
}
