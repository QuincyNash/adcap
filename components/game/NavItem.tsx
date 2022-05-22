interface NavItemProps {
	text: string;
	shop?: boolean;
	notif?: boolean;
	onClick: React.MouseEventHandler;
}

interface JustText {
	text: string;
}

interface TextAndNotif {
	text: string;
	notif: boolean;
}

export default function NavItem(props: NavItemProps) {
	const isNotif = props.notif ?? false;
	const isShop = props.shop ?? false;

	return (
		<button
			className="w-4/5 h-[6%] flex items-center overflow-hidden rounded-md bg-gray-50 transition-colors duration-100 hover:bg-orange-200 focus-visible:bg-orange-200"
			onClick={props.onClick}
		>
			{isShop ? (
				<Shop text={props.text}></Shop>
			) : (
				<Item text={props.text} notif={isNotif}></Item>
			)}
		</button>
	);
}

function Item(props: TextAndNotif) {
	return (
		<>
			<div
				className={`w-[min(5vh,24px)] aspect-square ml-4 mr-4 rounded-full border-2 ${
					props.notif
						? "bg-orange-500 border-gray-400"
						: "bg-gray-400 border-gray-300"
				}`}
			></div>
			<span className="w-28 text-center font-cursive text-[min(2.8vh,25px)] text-gray-600">
				{props.text}
			</span>
		</>
	);
}

function Shop(props: JustText) {
	return (
		<>
			<img
				className="w-[min(9vh,64px)] aspect-square ml-2 mr-2 select-none"
				src="gold-bars.svg"
			></img>
			<span className="w-16 text-center font-cursive text-[min(2.8vh,25px)] text-gray-600">
				{props.text}
			</span>
		</>
	);
}
