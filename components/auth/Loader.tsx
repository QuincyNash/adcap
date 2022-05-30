import { CircularProgress } from "@mui/material";

export default function Loader(props: { visible: boolean }) {
	if (props.visible) {
		return (
			<div className="w-full h-full fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-center z-50">
				<CircularProgress size={"5rem"}></CircularProgress>
			</div>
		);
	}
	return null;
}
