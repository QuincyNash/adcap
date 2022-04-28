import Head from "next/head";
import SideBar from "../components/game/SideBar";
import GameHeader from "../components/game/GameHeader";
import Game from "../components/game/Game";

import { auth, defaultFirestore, firestore } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home(props: {}) {
	const [user, loading, error] = useAuthState(auth);
	const [votes, votesLoading, votesError] = useCollection(
		firestore.collection(defaultFirestore, "votes"),
		{}
	);

	if (!votesLoading && votes) {
		votes.docs.map((doc) => console.log(doc.data()));
	}

	return (
		<>
			<Head>
				<title>Adventure Capitalist</title>
				<link
					href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined"
					rel="stylesheet"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Courgette&family=Titillium+Web&family=Bebas+Neue&display=swap"
					rel="stylesheet"
				></link>
				<noscript>You need to enable javascript to run this app</noscript>
			</Head>
			<div className="flex w-screen h-screen">
				<SideBar></SideBar>
				<main className="flex-grow flex flex-col gap-4 bg-primary">
					<GameHeader></GameHeader>
					<Game></Game>
				</main>
			</div>
		</>
	);
}
