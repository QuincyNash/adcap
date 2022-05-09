module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				progress: {
					"0%": { backgroundPosition: "0 0" },
					"100%": { backgroundPosition: "6rem 6rem" },
				},
			},
			animation: {
				progress: "progress 2s linear infinite",
			},
			screens: {
				md: "910px",
			},
			colors: {
				primary: "#78726d",
			},
			fontFamily: {
				cursive: ["Courgette", "cursive"],
				primary: ["Tittilium Web", "sans-serif"],
				skinny: ["Bebas Neue", "cursive"],
				skinny2: ["PT Sans Narrow", "sans-serif"],
			},
			width: {
				120: "120px",
			},
			height: {
				120: "120px",
			},
			gridTemplateColumns: {
				game: "repeat(2, minmax(0, 1fr))",
			},
			gridTemplateRows: {
				game: "repeat(5, minmax(0, 1fr))",
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
