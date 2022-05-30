import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import isBase64 from "is-base64";
import stream from "stream";
import path from "path";
import { getExtension } from "mime";
import { readFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import defaultUserData from "../../lib/default-entry";
import database from "../../lib/firebase";

export interface User {
	email: string;
	password: string;
	username: string;
	photo: string;
}

function u(variable: any) {
	return variable === undefined || variable === null;
}

function getMime(url: string) {
	return url.substring(url.indexOf(":") + 1, url.indexOf(";"));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise(async () => {
		if (!req.body) {
			return res.status(400).send("Failure");
		}

		const { email, password, username, photo } = JSON.parse(req.body) as User;

		if (u(email) || u(password) || u(username) || u(photo)) {
			return res.status(400).send("Failure");
		}

		if (
			(!isBase64(photo, {
				mimeRequired: true,
				allowEmpty: false,
			}) ||
				!getMime(photo).startsWith("image")) &&
			photo !== "default"
		) {
			return res.status(400).send("Failure");
		}

		let photoB64: string;
		let photoMime: string;

		if (photo === "default") {
			photoB64 = readFileSync(
				path.resolve(__dirname, "../../../../public/person.svg"),
				{
					encoding: "base64url",
				}
			).toString();
			photoMime = "image/svg+xml";
		} else {
			photoB64 = photo.split(",")[1];
			photoMime = getMime(photo);
		}

		database();

		const auth = admin.auth();

		auth
			.createUser({
				email,
				password,
				displayName: username,
			})
			.then((user) => {
				const firestore = admin.firestore();
				firestore
					.doc(`progress/${user.uid}`)
					.set(defaultUserData)
					.then(() => {
						const bucket = admin.storage().bucket();

						const ext = getExtension(photoMime);
						const filename = `${user.uid}.${ext}`;
						const file = bucket.file(filename);

						const buffer = Buffer.from(photoB64, "base64url");
						const passThrough = new stream.PassThrough().end(buffer);

						const uuid = uuidv4();

						passThrough
							.pipe(
								file.createWriteStream({
									metadata: {
										contentType: getMime(photo),
										metadata: {
											firebaseStorageDownloadTokens: uuid,
										},
									},
								})
							)
							.on("finish", () => {
								auth.updateUser(user.uid, {
									photoURL: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${filename}?alt=media&token=${uuid}`,
								});
								return res.status(200).send("Success");
							});
					});
			})
			.catch((err) => {
				console.error(err);
				return res.status(400).send("Failure");
			});
	});
}
