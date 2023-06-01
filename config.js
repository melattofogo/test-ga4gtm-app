// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  gtmid: process.env.GTM_ID,
  ga4id: process.env.GA4_ID
};