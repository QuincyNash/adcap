import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { GoogleAuthProvider, EmailAuthProvider, getAuth } from "firebase/auth";
import initApp from "../lib/firebase-client";

initApp();

const uiConfig = {
	signInSuccessUrl: "/game",
	signInOptions: [
		GoogleAuthProvider.PROVIDER_ID,
		EmailAuthProvider.PROVIDER_ID,
	],
};

function SignInScreen() {
	return (
		<div>
			<h1>Sign in</h1>
			<StyledFirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={getAuth()}
			></StyledFirebaseAuth>
		</div>
	);
}

export default SignInScreen;
