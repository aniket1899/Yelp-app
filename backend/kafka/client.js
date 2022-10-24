/* eslint-disable global-require */
/* eslint-disable no-var */
/* eslint-disable camelcase */
var rpc = new (require('./kafkarpc'))();

// Make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log('in make request');
  console.log(msg_payload);
  rpc.makeRequest(queue_name, msg_payload, (err, response) => {
    if (err) console.error('here 1 is the error: ', err);
    else {
      // console.log('response', response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
