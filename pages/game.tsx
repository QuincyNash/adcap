import Head from "next/head";
import NavItem from "../components/game/NavItem";
import ProfilePicture from "../components/game/ProfilePicture";
import clientPromise from "../lib/mongodb";

export default function Home(props: {}) {
	return (
		<>
			<Head>
				<title>Adventure Capitalist</title>
				<link
					href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined"
					rel="stylesheet"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Courgette&family=Roboto:wght@100&display=swap"
					rel="stylesheet"
				></link>
				<noscript>You need to enable javascript to run this app</noscript>
			</Head>
			<div className="flex w-screen h-screen">
				<nav className="w-60 h-full bg-gray-600">
					<ul className="w-full h-full flex-center flex-col gap-5">
						<ProfilePicture image="" onClick={() => {}}></ProfilePicture>
						<NavItem text="Account" onClick={() => {}}></NavItem>
						<NavItem text="Unlocks" onClick={() => {}}></NavItem>
						<NavItem text="Upgrades" onClick={() => {}}></NavItem>
						<NavItem text="Managers" onClick={() => {}}></NavItem>
						<NavItem text="Investors" onClick={() => {}}></NavItem>
						<NavItem text="Connect" onClick={() => {}}></NavItem>
						<NavItem text="Adventures" onClick={() => {}}></NavItem>
						<NavItem text="Shop" shop={true} onClick={() => {}}></NavItem>
					</ul>
				</nav>
				<main className="flex-grow bg-green-700"></main>
			</div>
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const db = await clientPromise;
// 	return {
// 		props: {},
// 	};
// }
