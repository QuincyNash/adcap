import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";

const uiConfig = {
	signInSuccessUrl: "/",
	signInOptions: [
		GoogleAuthProvider.PROVIDER_ID,
		EmailAuthProvider.PROVIDER_ID,
	],
};

console.log(uiConfig);

function SignInScreen() {
	return (
		<div>
			<h1>Sign in</h1>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
		</div>
	);
}

export default SignInScreen;
