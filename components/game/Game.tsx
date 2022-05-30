import { useRef, RefObject } from "react";
import Loader from "../auth/Loader";
import MoneyMaker from "./MoneyMaker";
import { UserData } from "../../pages/game";
import { Big, formatNum } from "./numUtils";
import { User } from "firebase/auth";

interface GameProps {
	loading: boolean;
	user: User;
	userData: UserData;
}

export default function Game(props: GameProps) {
	function makeMoney(amount: string) {
		money = money.plus(Big(amount));
		const [num, placeValue] = formatNum(money);
		numRef.current.innerText = num;
		placeRef.current.innerText = placeValue;
	}

	let money = Big(props.userData.money);
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
						const business = props.userData.businesses[i];

						return (
							<MoneyMaker
								key={i}
								user={props.user}
								altText={business.name}
								completion={business.completion}
								time={business.time}
								moneyPerFinish={business.profit}
								makeMoney={makeMoney}
								automatic={business.automatic}
							></MoneyMaker>
						);
					})}
				</div>
			</div>
		</main>
	);
}
