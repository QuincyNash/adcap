import Head from "next/head";
import admin from "firebase-admin";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import initApp from "../lib/firebase-client";
import defaultUserData from "../lib/default-entry";
import SideBar from "../components/game/SideBar";
import Game from "../components/game/Game";
import Loader from "../components/auth/Loader";
import { ActionRequest } from "./api/action";

export interface BusinessData {
	name: string;
	profit: string;
	time: number;
	automatic: boolean;
	completion: number;
}

export interface Action {
	business?: string;
	actionType?: string;
	timeStamp: TimeStamp;
}

export interface TimeStamp {
	seconds: number;
	nanoseconds: number;
}

export interface UserData {
	photo: string;
	money: string;
	lastRequest: number;
	queue: { [key: number]: Action };
	businesses: BusinessData[];
}

export default function Home() {
	const router = useRouter();

	let defaultUser = new Object(defaultUserData);
	defaultUser["photo"] = "person.svg";

	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(defaultUser as UserData);
	const [user, setUser] = useState(null);

	useEffect(() => {
		initApp();

		const auth = getAuth();

		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const token = await user.getIdToken();

				await fetch("api/update", {
					method: "GET",
					headers: {
						Authorization: token,
					},
				});

				setInterval(async () => {
					fetch("api/update", {
						method: "GET",
						headers: {
							Authorization: await user.getIdToken(),
						},
					});
				}, 30000);

				const response = await fetch("/api/user", {
					method: "GET",
					headers: {
						Authorization: token,
					},
				});

				response
					.json()
					.then(async (data: UserData) => {
						console.log(data);

						setUserData(data);
						setLoading(false);
						setUser(user);
					})
					.catch((err) => router.push("/login"));
			} else {
				router.push("/login");
			}
		});
	}, []);

	return (
		<>
			<Head>
				<title>Adventure Capitalist</title>
				<link
					href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined"
					rel="stylesheet"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Courgette&family=Titillium+Web&family=Bebas+Neue&family=PT+Sans+Narrow&display=swap"
					rel="stylesheet"
				></link>
				<noscript>You need to enable javascript to run this app</noscript>
			</Head>
			<Loader visible={loading}></Loader>
			<div
				className="flex w-screen h-screen overflow-hidden"
				style={{
					opacity: loading ? "0.15" : "1",
					pointerEvents: loading ? "none" : "all",
				}}
			>
				<SideBar loading={loading} photo={userData.photo}></SideBar>
				<Game userData={userData} user={user} loading={loading}></Game>
			</div>
		</>
	);
}
