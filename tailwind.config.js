module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			cursive: ["Courgette", "cursive"],
		},
		extend: {
			width: {
				100: "100px",
			},
			height: {
				100: "100px",
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
