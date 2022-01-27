const { google } = require("googleapis");

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID_EMAIL;
const CLIENT_SECRET = process.env.CLIENT_SECRET_EMAIL;
const REDIRECT_URI = process.env.REDIRECT_URI_EMAIL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_EMAIL;

const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = oauth2client;