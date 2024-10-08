import { useRef, useState } from "react";
import Header from "./Header";
import { validate } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"
import { BACKGROUND_URL, PROFILE_URL } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleSignUP = () => {
        if (email?.current)
            email.current.value = null;
        if (password?.current)
            password.current.value = null;

        setErrorMsg(null);

        setIsSignInForm(!isSignInForm)
    }

    const handleSubmit = () => {
        const error = validate(name?.current?.value, email?.current?.value, password?.current?.value)

        setErrorMsg(error);

        if (error) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(auth.currentUser, {
                        displayName: name.current.value, 
                        photoURL: PROFILE_URL
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser({ 
                                uid: uid, 
                                email: email,
                                displayName: displayName, 
                                photoURL: photoURL 
                            }
                        ))

                    }).catch((error) => {

                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        } else {
            signInWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(error.message);
                });
        }
    }

    return (
        <div>
            <Header />
            <div style={{
                backgroundImage: "url(" + BACKGROUND_URL + ")"
            }} className="bg-no-repeat bg-center bg-cover min-h-dvh flex items-center justify-center brightness-75">
                <form className="w-[28%] px-16 py-16 rounded" 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="text-3xl text-white font-bold mb-7">
                        Sign {isSignInForm ? 'In' : 'Up'} 
                    </div>
                    {!isSignInForm && 
                        <input 
                            ref={name} 
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} 
                            className="w-full py-3 mb-4 border border-slate-500 text-white px-3 rounded" 
                            placeholder="Name" 
                            type="text" 
                        />
                    }
                    <input 
                        ref={email} 
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} 
                        className="w-full py-3 mb-4 border border-slate-500 text-white px-3 rounded" 
                        placeholder="Email or mobile number" 
                        type="text"                         
                    />
                    <input 
                        ref={password} 
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} 
                        className="w-full py-3 mb-4 border border-slate-500 text-white px-3 rounded" 
                        placeholder="Password" 
                        type="password" 
                    />
                    {errorMsg && 
                        <p 
                            className="text-sm text-red-500 font-bold mb-3"
                        >
                            {errorMsg}
                        </p>
                    }
                    <button 
                        style={{ background: 'rgb(229, 9, 20)' }} 
                        onClick={handleSubmit} 
                        className="w-full text-white py-2 font-semibold rounded"
                    >
                        Sign {isSignInForm ? 'In' : 'Up'}
                    </button>
                    <p className="text-slate-100 mt-7">
                        {isSignInForm ? "New to Netflix? " : "Already registered? "}
                        <span 
                            onClick={handleSignUP} 
                            className="text-slate-50 font-semibold cursor-pointer"
                        >
                            {isSignInForm ? "Sign up now" : "Sign in now"}.
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;