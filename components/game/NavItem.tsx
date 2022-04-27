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
		<div
			className="w-4/5 h-12 flex items-center rounded-md cursor-pointer bg-gray-50 transition-colors duration-100 hover:bg-orange-200"
			onClick={props.onClick}
		>
			{isShop ? (
				<Shop text={props.text}></Shop>
			) : (
				<Item text={props.text} notif={isNotif}></Item>
			)}
		</div>
	);
}

function Item(props: TextAndNotif) {
	return (
		<>
			<div
				className={`w-6 h-6 ml-4 mr-4 rounded-full border-2 ${
					props.notif
						? "bg-orange-500 border-gray-400"
						: "bg-gray-400 border-gray-300"
				}`}
			></div>
			<span className="w-28 text-center font-cursive text-[22px] text-gray-700">
				{props.text}
			</span>
		</>
	);
}

function Shop(props: JustText) {
	return (
		<>
			<img className="w-16 h-16 ml-2 mr-2" src="gold-bars.svg"></img>
			<span className="w-16 text-center font-cursive text-[22px] text-gray-700">
				{props.text}
			</span>
		</>
	);
}
