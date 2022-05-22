import Head from "next/head";
import { useEffect, useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useRouter } from "next/router";
import initApp from "../lib/firebase-client";
import SideBar from "../components/game/SideBar";
import Game from "../components/game/Game";

export interface GameProps {
	money: string;
}

interface UserData {
	hello: string;
}

export default function Home(props: GameProps) {
	const router = useRouter();

	useEffect(() => {
		initApp();

		const auth = getAuth();

		auth.onAuthStateChanged(async (user) => {
			if (user) {
				const token = await user.getIdToken();

				const response = await fetch("/api/user", {
					method: "GET",
					headers: {
						Authorization: token,
					},
				});
				response
					.json()
					.then((data: UserData) => {
						console.log(data);
					})
					.catch((err) => router.push("/auth"));
			} else {
				router.push("/auth");
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
			<div className="flex w-screen h-screen overflow-hidden">
				<SideBar></SideBar>
				<Game {...props}></Game>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	return {
		props: {
			money: "1",
		} as GameProps,
	};
}
