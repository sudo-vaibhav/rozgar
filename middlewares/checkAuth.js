var admin = require("firebase-admin");

// required for configuring firebase admin sdk
var serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

console.log("process env", process.env);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://apptitude-c2141.firebaseio.com/",
});

console.log("initialised firebase app");

const checkAuth = (req, res, next) => {
  if (req.headers.authtoken) {
    console.log("<" + req.headers.authtoken + ">");
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then((decodedToken) => {
        console.log("decoded token", decodedToken);
        req.user = decodedToken;
        next();
      })
      .catch(() => {
        console.log("some problem with token. Unable to decode");
        return res.status(403).send({
          message: "Unauthorized",
        });
      });
  } else {
    return res.status(403).send({
      message: "no authtoken provided in header",
    });
  }
};

module.exports = checkAuth;
