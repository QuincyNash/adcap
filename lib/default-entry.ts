import { UserData } from "./../pages/game";

const names = [
	"Lemonade Stands",
	"Newspaper Deliveries",
	"Car Washes",
	"Pizza Deliveries",
	"Donut Shops",
	"Shrimp Boats",
	"Hockey Teams",
	"Movie Studios",
	"Banks",
	"Oil Companies",
];

export default {
	money: "0",
	businesses: names.map((name) => {
		return {
			name,
			profit: "1",
			time: 1,
			automatic: false,
			completion: 0,
		};
	}),
	lastRequest: 0,
	queue: {},
};
