import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import database from "../../lib/firebase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const idToken = req.headers.authorization;
	const db = database();

	if (idToken) {
		const auth = admin.auth();
		auth.verifyIdToken(idToken).then((decodedToken) => {
			const doc = db.collection("progress").doc(decodedToken.uid);

			doc.get().then((entry) => {
				return res.status(200).json(entry.data());
			});
		});
	} else {
		return res.status(401).send("Authentication Failed");
	}
}
