import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home(props: {}) {
	return <div></div>;
}

export async function getServerSideProps(context) {
	const db = await clientPromise;
	return {
		props: {},
	};
}
