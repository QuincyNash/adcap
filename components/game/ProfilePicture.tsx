interface ProfilePictureProps {
	image: string;
	onClick: React.MouseEventHandler;
}

export default function ProfilePicture(props: ProfilePictureProps) {
	return (
		<button
			className="w-[min(66%,30vh)] aspect-square flex-center rounded-lg bg-gray-50 transition-colors duration-100 hover:bg-orange-200 focus-visible:bg-orange-200"
			onClick={props.onClick}
		>
			<img
				className="w-4/5 h-4/5 rounded-lg select-none"
				src={props.image}
			></img>
		</button>
	);
}
