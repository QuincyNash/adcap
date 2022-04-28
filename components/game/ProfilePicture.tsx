interface ProfilePictureProps {
	image?: string;
	onClick: React.MouseEventHandler;
}

export default function ProfilePicture(props: ProfilePictureProps) {
	const image = props.image ?? "person.svg";

	return (
		<button
			className="w-[min(66%,30vh)] aspect-square flex-center rounded-lg bg-gray-50 transition-colors duration-100 hover:bg-orange-200"
			onClick={props.onClick}
		>
			<img className="material-icons w-4/5 h-4/5 select-none" src={image}></img>
		</button>
	);
}
