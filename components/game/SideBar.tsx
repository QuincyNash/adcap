import ProfilePicture from "./ProfilePicture";
import NavItem from "./NavItem";
import { signOut, getAuth } from "firebase/auth";

export default function SideBar() {
	return (
		<nav className="w-60 h-full bg-gray-600">
			<ul className="w-full h-full flex-center flex-col gap-[3%]">
				<ProfilePicture
					onClick={() => {
						signOut(getAuth());
					}}
				></ProfilePicture>
				<NavItem text="Account" onClick={() => {}}></NavItem>
				<NavItem text="Unlocks" onClick={() => {}}></NavItem>
				<NavItem text="Upgrades" onClick={() => {}}></NavItem>
				<NavItem text="Managers" onClick={() => {}}></NavItem>
				<NavItem text="Investors" onClick={() => {}}></NavItem>
				<NavItem text="Connect" onClick={() => {}}></NavItem>
				<NavItem text="Adventures" onClick={() => {}}></NavItem>
				<NavItem text="Shop" shop={true} onClick={() => {}}></NavItem>
			</ul>
		</nav>
	);
}
