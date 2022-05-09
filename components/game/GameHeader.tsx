export default function GameHeader() {
	return (
		<div className="w-full flex flex-col">
			<div className="w-full flex items-center">
				<span className="text-[min(4vw,42px)] ml-5 font-skinny font-bold text-white">
					$
				</span>
				<div>
					<span className="text-[min(7.2vw,76px)] ml-1 font-primary font-semibold text-white">
						162.101
					</span>
					<span className="text-[min(4.25vw,45px)] ml-[min(1.75vw,16px)] font-skinny uppercase text-white">
						octovigintillion
					</span>
				</div>
			</div>
			<div className="w-full h-14 bg-red-500"></div>
		</div>
	);
}
