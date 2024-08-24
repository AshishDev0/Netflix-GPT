import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className="absolute top-0 left-0 right-0 px-36 py-1 z-10 flex items-center justify-between text-white">
            <div>
                <img className="w-44" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" />
            </div>
            {user && (
                <div className="flex items-center gap-x-2">
                    <img className="w-10" src={user?.photoURL} />
                    <span className="cursor-pointer" onClick={handleSignOut}>(Sign out)</span>
                </div>
            )}
        </div>
    )
}

export default Header;