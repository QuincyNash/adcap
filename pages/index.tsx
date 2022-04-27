import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home(props: { isConnected }) {
	return <div></div>;
}

export async function getServerSideProps(context) {
	try {
		const db = await clientPromise;
	} catch (e) {
		console.error(e);
	}
}
