import { useEffect, useState, useRef } from "react";
import ReactDOM, { flushSync } from "react-dom";

interface MoneyMakerProps {
	altText: string;
	completion: number;
	automatic: boolean;
	time: number;
	onCompletion: () => void;
}

function usePrevious(value: any) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

function getInterval(time: number) {
	let interval = 1000 * (time % 1);
	return interval === 0 ? 1000 : interval;
}

export default function MoneyMaker(props: MoneyMakerProps) {
	const isFast = props.time < 0.15;

	const [behind, setBehind] = useState(0);
	const [start, setStart] = useState(performance.now());
	const [timeBehind, setTimeBehind] = useState(0);
	const [timeStart, setTimeStart] = useState(performance.now());

	const [percentage, setPercentage] = useState(isFast ? 100 : props.completion);
	const [firstUpdate, setFirstUpdate] = useState(false);

	const [time, setTime] = useState((props.time * (100 - percentage)) / 100);
	const actualTime = Math.ceil(time - 1);

	let transitionDuration: number | string =
		props.time * ((100 - (usePrevious(percentage) ?? percentage)) / 100);

	if (transitionDuration === 0) {
		transitionDuration = "0.01ms";
	} else if (props.automatic && !firstUpdate) {
		transitionDuration = `${transitionDuration - behind}s`;
	} else {
		transitionDuration = `${transitionDuration}s`;
	}

	const hours = Math.floor(actualTime / 3600);
	const minutes = Math.floor(actualTime / 60) - hours * 60;
	const seconds = Math.floor(actualTime % 60);

	const displayHours = hours.toString().padStart(2, "0");
	const displayMinutes = minutes.toString().padStart(2, "0");
	const displaySeconds = seconds.toString().padStart(2, "0");
	const timeDisplay = `${displayHours}:${displayMinutes}:${displaySeconds}`;

	let previousTime: number = (usePrevious(time) as number) % 1;
	previousTime = previousTime === 0 ? 1 : previousTime;

	useEffect(() => {
		if (percentage !== 0 || props.automatic) {
			setPercentage(100);
			setTimeout(() => setTime(actualTime), getInterval(time));
		}
	}, []);

	useEffect(() => {
		if (props.automatic || percentage === 100) {
			let current = performance.now();

			let timeTook = current - timeStart;
			let newBehind = timeTook - previousTime * 1000;
			newBehind = isNaN(newBehind) ? 0 : newBehind;

			let interval = getInterval(time);

			setTimeStart(current);
			setTimeout(() => {
				if (actualTime > 0) {
					setTime(actualTime);
					setTimeBehind(newBehind);
				}
			}, interval - (newBehind % props.time));
		}
	}, [actualTime]);

	return (
		<div className="w-full h-full flex">
			<button
				className="aspect-square h-full"
				onClick={() => {
					if (!props.automatic && percentage !== 100) {
						setPercentage(100);
						setTimeStart(performance.now());
						setTimeout(() => setTime(actualTime), getInterval(time));
					}
				}}
			>
				<div className="relative h-full aspect-square rounded-full border-2 border-black bg-blue-100">
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
						className="w-full h-full transition-transform ease-linear transform-gpu bg-blue-300"
						onTransitionEnd={() => {
							if (isFast && props.automatic) return;

							if (percentage === 0 && props.automatic) {
								setPercentage(100);
								setStart(performance.now());
							} else {
								props.onCompletion();

								let timeTook = performance.now() - start;
								let newBehind = timeTook / 1000 - props.time;
								newBehind = isNaN(newBehind) ? 0 : newBehind;

								setTimeBehind(0);
								setBehind((behind + newBehind) % props.time);
								setFirstUpdate(true);

								ReactDOM.flushSync(() => {
									setTime(props.time);
								});
								ReactDOM.flushSync(() => {
									setPercentage(0);
								});
							}
						}}
						style={{
							transform: `translateX(-${100 - percentage}%)`,
							transitionDuration,
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
					<div className="absolute top-0 left-tri w-6 h-full z-50 bg-primary"></div>
					<div className="absolute top-0 left-full -translate-x-full not-left-tri w-6 h-full z-50 bg-primary"></div>
				</div>
				<div className="w-full h-1/2 flex mt-1">
					<button className="flex-grow flex items-center rounded-md bg-blue-200">
						<div className="h-full text-left leading-[3vh]">
							<span className="ml-1 text-[1.5vw] font-cursive">Buy</span>
							<br></br>
							<span className="ml-1 text-[1.5vw] font-cursive">x1</span>
						</div>
						<div className="ml-auto text-right leading-[2.5vh]">
							<span className="mr-1 text-[1.8vw] font-primary">15.129</span>
							<br />
							<span className="mr-1 md:text-[1.1vw] font-bold font-skinny2">
								million
							</span>
						</div>
					</button>
					<div className="w-[max(25%,100px)] flex-center rounded-md ml-2 bg-gray-400">
						<span className="text-white text-[max(1.8vw,20px)] leading-none font-skinny">
							{timeDisplay}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
