// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const smsController = {};

smsController.sendSMS = async (req, res, next) => {
  const { phoneNumber, messageBody } = req.body;
  console.log(JSON.stringify(messageBody));
  try {
    const message = await client.messages
      .create({
        body: JSON.stringify(messageBody),
        to: `+1${phoneNumber}`, // Text this number
        from: '+18563020352', // From a valid Twilio number
      })
      .then(message => console.log(message.sid));
    res.locals.message = message;
    return next();
  } catch (e) {
    return next(e);
  }
};

module.exports = smsController;
