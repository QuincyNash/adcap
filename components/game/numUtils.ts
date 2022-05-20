import BigNumber from "bignumber.js";

BigNumber.set({ DECIMAL_PLACES: 5 });

export function Big(value: string | number) {
	return new BigNumber(value.toString());
}

export function getPlaceValue(placeNumber: number) {
	const simplePlaces = [
		"thousand",
		"million",
		"billion",
		"trillion",
		"quadrillion",
		"quintillion",
		"sextillion",
		"septillion",
		"octillion",
		"nonillion",
	];
	const tensPlaces = [
		"",
		"decillion",
		"vigintillion",
		"trigintillion",
		"quadragintillion",
		"quinquagintillion",
		"sexagintillion",
		"septuagintillion",
		"octogintillion",
		"nonagintillion",
		"centillion",
	];
	const prefixes = [
		"",
		"un",
		"duo",
		"tre",
		"quattuor",
		"quin",
		"sex",
		"septem",
		"octo",
		"novem",
	];

	if (placeNumber < 0) return null;
	if (placeNumber < 10) return simplePlaces[placeNumber];

	let prefix = prefixes[placeNumber % 10];
	let tensPlace = tensPlaces[Math.floor(placeNumber / 10)];

	return prefix + tensPlace;
}

export function getStart(num: BigNumber, placeNumber: number) {
	const numString = num.toFixed(0, BigNumber.ROUND_DOWN);

	const placeLength = (placeNumber + 1) * 3 + 1;
	const numLength = numString.length;
	const frontLength = numLength - placeLength + 1;

	let front = numString.substring(0, frontLength);
	let back = numString.substring(frontLength, frontLength + 3);
	// back = back.replace(/0*$/, ""); // Remove Trailing Zeros

	if (num.isLessThan(1000)) {
		let floatNum = parseFloat(num.toFixed(3));
		let decimal = Math.round((floatNum - Math.trunc(floatNum)) * 100) / 100;
		// if (decimal.toString().length > 1) {
		front += decimal.toFixed(2).substring(1);
		// }
	}

	if (back.length === 0) return front;

	return `${front}.${back}`;
}

export function formatNum(num: BigNumber) {
	num = num;

	const length = num.toFixed(0, BigNumber.ROUND_DOWN).length;
	const placeNumber = Math.floor((length - 1) / 3) - 1;

	const placeValue = getPlaceValue(placeNumber);
	const numStart = getStart(num, placeNumber);

	return [numStart, placeValue];
}
