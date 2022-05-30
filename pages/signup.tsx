import {
	getAuth,
	getRedirectResult,
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithRedirect,
	browserSessionPersistence,
	signInWithEmailAndPassword,
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
					fetch("/api/provider-signup", {
						method: "POST",
						body: await res.user.getIdToken(),
					}).then((r) => {
						r.text().then((url) => {
							router.push(url);
						});
					});
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
				<title>Adventure Capitalist | Sign Up</title>
			</Head>
			<div className="w-screen h-screen flex-center bg-[#f8f9fd]">
				<Loader visible={loading}></Loader>

				<div
					className="w-[calc(100%-2rem)] h-fit p-6 pt-12 bg-white rounded-lg shadow-md md:w-[500px] sm:w-[600px] sm:p-12"
					style={{
						opacity: loading ? "0.15" : "1",
						pointerEvents: loading ? "none" : "all",
					}}
				>
					<h3 className="text-4xl text-center mb-4 font-cursive">
						Create an Account
					</h3>
					<form
						action="api/signup"
						method="post"
						className="w-full h-full flex flex-col gap-4"
						onSubmit={async (event) => {
							event.preventDefault();

							const usernameElem = document.getElementById(
								"username"
							) as HTMLInputElement;
							const emailElem = document.getElementById(
								"email"
							) as HTMLInputElement;
							const passwordElem = document.getElementById(
								"password"
							) as HTMLInputElement;
							const photoElem = document.getElementById(
								"photo"
							) as HTMLInputElement;

							initApp();

							await fetch("api/signup", {
								method: "POST",
								body: JSON.stringify({
									username: usernameElem.value,
									email: emailElem.value,
									password: passwordElem.value,
									photo: photoElem.value,
								}),
							});

							signInWithEmailAndPassword(
								getAuth(),
								emailElem.value,
								passwordElem.value
							)
								.then(() => {
									router.push("/game");
								})
								.catch((err) => console.error(err));
						}}
					>
						<input
							id="photo-input"
							className="m-auto"
							type="file"
							accept="image/*"
							hidden
							onChange={async (e) => {
								let file = e.target.files[0];

								if (file) {
									let url = URL.createObjectURL(file);
									let blob = await fetch(url).then((r) => r.blob());

									let reader = new FileReader();
									reader.readAsDataURL(blob);

									reader.addEventListener("load", () => {
										let img = document.getElementById(
											"display-photo"
										) as HTMLImageElement;
										img.src = reader.result as string;

										let elem = document.getElementById(
											"photo"
										) as HTMLInputElement;
										elem.value = reader.result as string;
									});
								}
							}}
						></input>
						<input id="photo" type="text" defaultValue="default" hidden></input>
						<label
							className="m-auto outline-none border border-dashed border-black transition-[border-color,background-color,transform] rounded-full focus:border-black focus:border-solid focus:border-2 focus:bg-gray-100 focus:scale-110 hover:bg-gray-100 hover:scale-110"
							htmlFor="photo-input"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									document.getElementById("photo-input").click();
								}
							}}
						>
							<img
								id="display-photo"
								src="person.svg"
								className="w-16 h-16 rounded-full"
							></img>
						</label>
						<input
							id="username"
							className="form-element"
							type="text"
							autoComplete="username"
							placeholder="Username"
							required
						/>
						<input
							id="email"
							className="form-element"
							type="email"
							autoComplete="email"
							placeholder="Email"
							required
						/>
						<input
							id="password"
							className="form-element"
							type="password"
							autoComplete="new-password"
							placeholder="Password"
							required
						/>

						<button type="submit" className="form-submit">
							Sign Up
						</button>
						<div className="flex w-full">
							<button
								type="button"
								formNoValidate
								className="google-signin"
								onClick={() => {
									signInWithRedirect(getAuth(), new GoogleAuthProvider());
								}}
							>
								<img
									src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
									className="w-5 h-5 inline-block mr-3"
								></img>
								<span className="hidden signup-wrap:inline">
									Sign Up with Google
								</span>
								<span className="inline signup-wrap:hidden">Google</span>
							</button>
							<button
								type="button"
								formNoValidate
								className="github-signin"
								onClick={() => {
									signInWithRedirect(getAuth(), new GithubAuthProvider());
								}}
							>
								<img
									src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg"
									className="w-5 h-5 inline-block mr-3"
								></img>
								<span className="hidden signup-wrap:inline">
									Sign Up with Github
								</span>
								<span className="inline signup-wrap:hidden">Github</span>
							</button>
						</div>
					</form>
					<p className="text-center mt-4">
						Already have an account?{" "}
						<a
							className="underline text-blue-600 hover:text-purple-700 focus:text-purple-700"
							href="/login"
						>
							Login
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
