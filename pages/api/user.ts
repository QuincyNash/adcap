import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import database from "../../lib/firebase";
import { UserData } from "../game";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise(async () => {
		const idToken = req.headers.authorization;
		const db = database();

		if (idToken) {
			const auth = admin.auth();

			const decodedToken = await auth.verifyIdToken(idToken);
			const user = await auth.getUser(decodedToken.uid);
			const doc = db.collection("progress").doc(decodedToken.uid);

			const entry = await doc.get();
			const data = entry.data() as UserData;

			if (data === undefined) {
				return res.status(401).json({ message: "Authentication Failed" });
			}

			// Increase Google Icon Size
			let photo = user.photoURL;
			if (
				user.providerData[0].providerId === "google.com" &&
				user.photoURL.endsWith("=s96-c")
			) {
				photo = user.photoURL.split("=s96-c")[0] + "=s480-c";
			}

			return res.status(200).json({
				money: data.money,
				businesses: data.businesses,
				photo,
			});
		} else {
			return res.status(401).json({ message: "Authentication Failed" });
		}
	});
}
