module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#78726d",
			},
			fontFamily: {
				cursive: ["Courgette", "cursive"],
				primary: ["Tittilium Web", "sans-serif"],
				skinny: ["Bebas Neue", "cursive"],
			},
			width: {
				120: "120px",
			},
			height: {
				120: "120px",
			},
		},
	},
	safelist: [
		"bg-gray-400",
		"border-gray-300",
		"bg-orange-500",
		"border-gray-400",
	],
	plugins: [],
};
