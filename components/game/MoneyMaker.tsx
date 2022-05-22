import { useEffect, useRef, RefObject } from "react";
import { Big } from "./numUtils";

interface MoneyMakerProps {
	altText: string;
	completion: number;
	automatic: boolean;
	time: number;
	moneyPerFinish: string;
	makeMoney: (amount: string) => void;
}

function getInterval(time: number) {
	let interval = 1000 * (time % 1);
	return interval === 0 ? 1000 : interval;
}

function formatTime(time: number) {
	const roundedTime = Math.ceil(time);

	const hours = Math.floor(roundedTime / 3600);
	const minutes = Math.floor(roundedTime / 60) - hours * 60;
	const seconds = Math.floor(roundedTime % 60);

	const displayHours = hours.toString().padStart(2, "0");
	const displayMinutes = minutes.toString().padStart(2, "0");
	const displaySeconds = seconds.toString().padStart(2, "0");

	return `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

export default function MoneyMaker(props: MoneyMakerProps) {
	const progressRef: RefObject<HTMLDivElement> = useRef();
	const timeRef: RefObject<HTMLSpanElement> = useRef();

	const isFast = props.time < 0.15;
	const moneyPerSecond = Big(props.moneyPerFinish).div(Big(props.time));

	let completion = isFast ? 100 : props.completion;
	let time = (props.time * (100 - completion)) / 100;
	let going = props.automatic ? true : completion === 0 ? false : true;

	const timeDisplay = formatTime(time);

	useEffect(() => {
		let lastTime = performance.now();

		function update() {
			let currentTime = performance.now();

			if (going || props.automatic) {
				(() => {
					let dt = (currentTime - lastTime) / 1000;

					if (isFast) {
						return props.makeMoney(moneyPerSecond.times(dt).toString());
					}

					let increase = (100 * dt) / props.time;
					completion += increase;
					time -= dt;

					if (completion > 100) {
						if (!isFast || !props.automatic) {
							props.makeMoney(props.moneyPerFinish);
						}

						if (!props.automatic) {
							completion = 0;
							time = props.time;
							going = false;
						} else {
							completion %= 100;
							time = (props.time * (100 - completion)) / 100;
						}
					}

					progressRef.current.style.transform = `translateX(${
						completion - 100
					}%)`;

					timeRef.current.innerText = formatTime(time);
				})();
			}

			lastTime = currentTime;
			requestAnimationFrame(update);
		}

		requestAnimationFrame(update);
	});

	return (
		<div className="w-full h-full flex 2.5rem + 1/4 1/3 - 1/12 - 2.5rem">
			<button
				className="aspect-square h-full group"
				tabIndex={props.automatic ? -1 : 0}
				style={{
					cursor: props.automatic ? "default" : "pointer",
				}}
				onClick={() => {
					if (!props.automatic && !going) {
						going = true;
					}
				}}
			>
				<div
					className={
						"relative h-full aspect-square rounded-full z-50 border-2 border-black  bg-blue-100" +
						(props.automatic
							? ""
							: " opacity-80 transition-opacity hover:opacity-100 group-focus-visible:opacity-100")
					}
				>
					<img
						className="w-full h-full select-none"
						src="person.svg"
						alt={props.altText}
					/>
					<div className="absolute top-full w-full h-[30%] -translate-y-[calc(100%-2px)] flex-center rounded-full border-2 border-black bg-blue-100">
						<span className="text-[3.2vh] leading-none font-thin font-primary">
							1000
						</span>
					</div>
				</div>
			</button>
			<div className="flex-grow flex flex-col ml-2">
				<div className="relative w-full h-1/2 overflow-hidden bg-slate-600">
					<div
						className="w-full h-full bg-blue-300"
						ref={progressRef}
						style={{
							transform: `translateX(-${100 - completion}%)`,
						}}
					>
						{isFast && props.automatic && (
							<div
								className="absolute inset-0 animate-progress bg-[length:6rem_6rem]"
								style={{
									backgroundImage:
										"linear-gradient(-45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent)",
								}}
							></div>
						)}
					</div>
					<div className="absolute top-0 left-tri w-6 h-full z-40 bg-primary"></div>
					<div className="absolute top-0 left-full -translate-x-full not-left-tri w-6 h-full z-40 bg-primary"></div>
				</div>
				<div className="w-full h-1/2 flex mt-1">
					<button className="flex-grow flex items-center rounded-md overflow-hidden opacity-80 transition-opacity bg-blue-200 hover:opacity-100 focus-visible:opacity-100">
						<div className="h-full text-left leading-[3vh]">
							<span className="ml-1 text-[1.5vw] font-cursive">Buy</span>
							<br></br>
							<span className="ml-1 text-[1.5vw] font-cursive">x1</span>
						</div>
						<div className="ml-auto text-right leading-[2.5vh]">
							<span className="mr-1 text-[1.8vw] font-primary">15.129</span>
							<br />
							<span className="mr-1 text-[1.1vw] font-bold font-skinny2">
								million
							</span>
						</div>
					</button>
					<div className="w-[max(25%,100px)] flex-center rounded-md ml-2 bg-gray-400">
						<span
							className="text-white text-[max(1.8vw,20px)] leading-none font-skinny"
							ref={timeRef}
						>
							{timeDisplay}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
