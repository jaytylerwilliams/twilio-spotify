module.exports = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    twilioNumber: process.env.TWILIO_NUMBER,

    port: process.env.PORT || 5000,

    herokuAppName: process.env.HEROKU_APP_NAME
};