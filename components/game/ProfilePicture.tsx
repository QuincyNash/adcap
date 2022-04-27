interface ProfilePictureProps {
	image: string;
	onClick: React.MouseEventHandler;
}

export default function ProfilePicture(props: ProfilePictureProps) {
	return (
		<div
			className="w-2/3 aspect-square flex-center rounded-lg cursor-pointer bg-gray-50 transition-colors duration-100 hover:bg-orange-200"
			onClick={props.onClick}
		>
			<img
				className="material-icons w-100 h-100 select-none"
				src="person.svg"
			></img>
		</div>
	);
}
