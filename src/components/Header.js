import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO_URL } from "../utils/constants";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {

        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({ 
                        uid: uid, 
                        email: email, 
                        displayName: displayName, 
                        photoURL: photoURL 
                    }
                ))
                navigate("/browse")
            } else {
                dispatch(removeUser());
                navigate("/")
            }
        });

        // unsubscribe when component unmounts
        return () => unsubscribe();

    }, [])

    return (
        <div className="absolute top-0 left-0 right-0 px-36 py-1 z-10 flex items-center justify-between text-white">
            <div>
                <img className="w-44" src={LOGO_URL} />
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