import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogOut() {
	const router = useRouter();

	const redirect = () => {
		signOut(auth).then(() => router.push("/"));
		return null;
	};
	useEffect(redirect);

	return null;
}
