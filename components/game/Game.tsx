import { useRef, RefObject } from "react";
import MoneyMaker from "./MoneyMaker";
import { Big, formatNum } from "./numUtils";
import { GameProps } from "../../pages/game";

export default function Game(props: GameProps) {
	function makeMoney(amount: string) {
		money = money.plus(Big(amount));
		const [num, placeValue] = formatNum(money);
		numRef.current.innerText = num;
		placeRef.current.innerText = placeValue;
	}

	let money = Big(props.money);
	const [num, placeValue] = formatNum(money);

	const numRef: RefObject<HTMLSpanElement> = useRef();
	const placeRef: RefObject<HTMLSpanElement> = useRef();

	return (
		<main className="flex-grow flex flex-col bg-primary">
			<div className="w-full flex flex-col">
				<div className="w-full flex items-center">
					<span className="text-[min(4vw,42px)] ml-5 font-skinny font-bold text-white">
						$
					</span>
					<div>
						<span
							className="text-[min(7.2vw,76px)] ml-1 font-primary font-semibold text-white"
							ref={numRef}
						>
							{num}
						</span>
						<span
							className="text-[min(4.25vw,45px)] ml-[min(1.7vw,16px)] font-skinny uppercase text-white"
							ref={placeRef}
						>
							{placeValue}
						</span>
					</div>
				</div>
				<div className="w-full h-14 bg-red-500"></div>
			</div>
			<div className="w-full flex-grow flex justify-center">
				<div className="w-5/6 h-[90%] grid gap-x-5 gap-y-4 grid-cols-game grid-rows-game">
					{Array.from(Array(10)).map((_e, i) => {
						return (
							<MoneyMaker
								key={i}
								altText=""
								completion={0}
								time={10}
								moneyPerFinish={"1"}
								makeMoney={makeMoney}
								automatic={false}
							></MoneyMaker>
						);
					})}
				</div>
			</div>
		</main>
	);
}
