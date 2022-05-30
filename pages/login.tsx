import {
	signInWithRedirect,
	getAuth,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	GithubAuthProvider,
	getRedirectResult,
} from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/auth/Loader";
import initApp from "../lib/firebase-client";

export default function SignUp() {
	const router = useRouter();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		initApp();
		const auth = getAuth();

		getRedirectResult(auth)
			.then(async (res) => {
				if (res?.user) {
					const token = await res.user.getIdToken();

					const response = await fetch("/api/user", {
						method: "GET",
						headers: {
							Authorization: token,
						},
					});

					if (!response.ok) {
						await fetch("/api/provider-signup", {
							method: "POST",
							body: await res.user.getIdToken(),
						});
						router.push("/game");
					} else {
						router.push("/game");
					}
				} else {
					setLoading(false);
				}
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<Head>
				<meta></meta>
				<title>Adventure Capitalist | Login</title>
			</Head>
			<div className="w-screen h-screen flex-center bg-[#f8f9fd]">
				<Loader visible={loading}></Loader>

				<div
					className="w-[calc(100%-2rem)] h-fit p-12 bg-white rounded-lg shadow-md md:w-[500px] sm:w-[600px]"
					style={{
						opacity: loading ? "0.15" : "1",
						pointerEvents: loading ? "none" : "all",
					}}
				>
					<h3 className="text-4xl text-center mb-4 font-cursive">Login</h3>
					<form
						method="post"
						className="w-full h-full flex flex-col gap-4"
						onSubmit={async (event) => {
							event.preventDefault();

							const emailElem = document.getElementById(
								"email"
							) as HTMLInputElement;
							const passwordElem = document.getElementById(
								"password"
							) as HTMLInputElement;

							initApp();

							await signInWithEmailAndPassword(
								getAuth(),
								emailElem.value,
								passwordElem.value
							).catch((err) => console.error(err));

							router.push("/game");
						}}
					>
						<input
							id="email"
							className="form-element"
							type="email"
							name="email"
							autoComplete="email"
							placeholder="Email"
							required
						/>
						<input
							id="password"
							className="form-element"
							type="password"
							name="password"
							autoComplete="new-password"
							placeholder="Password"
							required
						/>

						<button type="submit" className="form-submit">
							Login
						</button>
						<div className="flex w-full">
							<button
								type="button"
								className="google-signin"
								formNoValidate
								onClick={() => {
									signInWithRedirect(getAuth(), new GoogleAuthProvider());
								}}
							>
								<img
									src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
									className="w-5 h-5 inline-block mr-3"
								></img>
								<span className="hidden login-wrap:inline">
									Login with Google
								</span>
								<span className="inline login-wrap:hidden">Google</span>
							</button>
							<button
								type="button"
								className="github-signin"
								formNoValidate
								onClick={() => {
									signInWithRedirect(getAuth(), new GithubAuthProvider());
								}}
							>
								<img
									src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"
									className="w-5 h-5 inline-block mr-3"
								></img>
								<span className="hidden login-wrap:inline">
									Login with Github
								</span>
								<span className="inline login-wrap:hidden">Github</span>
							</button>
						</div>
					</form>
					<p className="text-center mt-4">
						Don't have an account?{" "}
						<a
							className="underline text-blue-600 hover:text-purple-700 focus:text-purple-700"
							href="/signup"
						>
							Sign Up
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
