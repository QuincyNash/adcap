import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import defaultUserData from "../../lib/default-entry";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise(async () => {
		const idToken: string = req.body;
		if (!idToken) return res.status(200).send("/signup");

		const user = await admin
			.auth()
			.verifyIdToken(idToken)
			.catch(() => {});
		if (!user) return res.status(200).send("/signup");

		const doc = admin.firestore().doc(`progress/${user.uid}`);
		const existingData = await doc.get();

		if (!existingData.exists) {
			await doc.set(defaultUserData);
		}

		return res.status(200).send("/game");
	});
}
