import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { Big } from "../../components/game/numUtils";
import database from "../../lib/firebase";
import { Action, TimeStamp, UserData } from "../game";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise(async () => {
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

		const currentTime = Date.now();
		if (currentTime - data.lastRequest < 100) {
			return res.status(400).send("Failure");
		}

		let newQueue: { [key: string]: Action } = {};

		for (let [key, action] of Object.entries(data.queue)) {
			if (action.actionType === "profit") {
				const business = data.businesses.find(
					(biz) => biz.name === action.business
				);
				const timeStamp = action.timeStamp as unknown as TimeStamp;
				const actualTime =
					action.timeStamp.seconds * 1000 +
					action.timeStamp.nanoseconds / 1000000;

				if (business.time * 1000 > currentTime - actualTime) {
					newQueue[key] = action;
				} else {
					data.money = Big(data.money).plus(Big(business.profit)).toFixed(5);
				}
			}
		}

		if (Object.keys(data.queue).length != Object.keys(newQueue).length) {
			data.queue = newQueue;
			data.lastRequest = currentTime;

			await doc.set(data);
		}

		res.status(200).send("Success");
	});
}
