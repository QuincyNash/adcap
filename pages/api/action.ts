import { TimeStamp } from "./../game";
import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { Big } from "../../components/game/numUtils";
import database from "../../lib/firebase";
import { UserData } from "../game";

export interface ActionRequest {
	actionType: string;
	business: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise(async () => {
		if (!req.body) {
			return res.status(400).send("Failure");
		}

		const { actionType, business } = JSON.parse(req.body) as ActionRequest;
		const idToken = req.headers.authorization;

		if (!idToken) {
			return res.status(400).send("Failure");
		}

		const auth = admin.auth();
		const db = database();

		const decodedToken = await auth.verifyIdToken(idToken);
		const user = await auth.getUser(decodedToken.uid);
		const doc = db.collection("progress").doc(decodedToken.uid);

		const entry = await doc.get();
		const data = entry.data() as UserData;

		if (!data) {
			return res.status(400).send("Failure");
		}

		let currentTime = Date.now();
		if (currentTime - data.lastRequest < 100) {
			return res.status(400).send("Failure");
		}

		if (actionType === "profit") {
			const businessData = data.businesses.find((biz) => biz.name === business);

			if (businessData === undefined || businessData.automatic) {
				return res.status(400).send("Failure");
			}

			console.log(data.queue);

			data.queue[Object.keys(data.queue).length] = {
				actionType: "profit",
				business,
				timeStamp:
					admin.firestore.FieldValue.serverTimestamp() as unknown as TimeStamp,
			};

			data.lastRequest = currentTime;

			await doc.set(data);

			return res.status(200).send("Success");
		} else if (actionType === "upgrade") {
		} else if (actionType === "global-upgrade") {
		} else if (actionType === "manager") {
		} else {
			res.status(400).send("Failure");
		}
	});
}
