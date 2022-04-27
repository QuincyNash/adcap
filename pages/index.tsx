import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home(props: {}) {
	return <div className="w-screen h-screen"></div>;
}

export async function getServerSideProps(context) {
	const db = await clientPromise;
	return {
		props: {},
	};
}
