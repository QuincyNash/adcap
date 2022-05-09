import admin from "firebase-admin";
import functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
	res.status(200).send("Hello, World!");
});
