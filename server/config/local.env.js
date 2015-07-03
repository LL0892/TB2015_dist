'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "tb-secret",

  FACEBOOK_ID: '1435864036716003',
  FACEBOOK_SECRET: 'bc8221f815f2375ac902091f90af8aa2',

  GOOGLE_ID: '353411394574-7pc0lbb2io0q437bf3qqol8fed9s2hf6.apps.googleusercontent.com',
  GOOGLE_SECRET: 'ntWV3eY8EI2DaAFzbCBNVuVH',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
