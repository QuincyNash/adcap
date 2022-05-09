import { useEffect, useState } from "react";
import { BigInteger } from "jsbn";
import MoneyMaker from "./MoneyMaker";
import { GameProps } from "../../pages/game";

function Big(value: string | number) {
	return new BigInteger(value.toString());
}

function placeValue(num: BigInteger) {
	num = num;

	const simplePlaces = [
		"million",
		"billion",
		"trillion",
		"quadrillion",
		"quintillion",
		"sextillion",
		"septillion",
		"octillion",
		"nonillion",
		"decillion",
	];
}

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

export default function Game(props: GameProps) {
	const [money, setMoney] = useState(props.money);

	return (
		<div className="w-full flex-grow flex justify-center">
			<div className="w-5/6 h-[90%] grid gap-x-5 gap-y-4 grid-cols-game grid-rows-game">
				{Array.from(Array(2)).map((_e, i) => (
					<MoneyMaker
						key={i}
						altText=""
						completion={0}
						time={2}
						automatic={true}
						onCompletion={() => {
							console.log("FINISH");
						}}
					></MoneyMaker>
				))}
			</div>
		</div>
	);
}
