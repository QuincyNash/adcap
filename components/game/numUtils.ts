import { BigInteger } from "jsbn";

export function Big(value: string | number) {
	return new BigInteger(value.toString());
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

export function getStart(num: BigInteger, placeNumber: number) {
	const numString = num.toString();

	const placeLength = (placeNumber + 1) * 3 + 1;
	const numLength = numString.length;
	const frontLength = numLength - placeLength + 1;

	const front = numString.substring(0, frontLength);
	let back = numString.substring(frontLength, frontLength + 3);
	back = back.replace(/0*$/, ""); // Remove Trailing Zeros

	if (back.length === 0) return front;

	return `${front}.${back}`;
}

export function formatNum(num: BigInteger) {
	num = num;

	const length = num.toString().length;
	const placeNumber = Math.floor((length - 1) / 3) - 1;

	const placeValue = getPlaceValue(placeNumber);
	const numStart = getStart(num, placeNumber);

	return [numStart, placeValue];
}
