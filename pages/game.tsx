import Head from "next/head";
import SideBar from "../components/game/SideBar";
import GameHeader from "../components/game/GameHeader";
import Game from "../components/game/Game";

import { auth, defaultFirestore, firestore } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

async function getData(...items: string[]) {
	const result = await getDoc(
		doc(defaultFirestore, items[0], ...items.slice(1))
	);
	return result.data();
}

export interface GameProps {
	money: string;
}

export default function Home(props: GameProps) {
	console.log(useAuthState(auth));

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
				<main className="flex-grow flex flex-col bg-primary">
					<GameHeader></GameHeader>
					<Game {...props}></Game>
				</main>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	return {
		props: {
			money: "100",
		} as GameProps,
	};
}
