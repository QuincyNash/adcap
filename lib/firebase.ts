import admin from "firebase-admin";
import * as firebase from "firebase/app";

export default function database() {
	if (!admin.apps.length) {
		const app = admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				privateKey: process.env.NEXT_PRIVATE_FIREBASE_KEY,
				clientEmail: process.env.NEXT_PRIVATE_FIREBASE_CLIENT_EMAIL,
			}),
			storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		});
	}

	return admin.firestore();
}
