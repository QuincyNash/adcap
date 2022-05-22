import { BrowserRouter } from "react-router-dom";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default MyApp;
