import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import { useState } from "react"

export const Navbar = () => {
    const [user] = useAuthState(auth);
    const [btnVisibility, setBtnVisibility] = useState(false)

    const logout = async () => {
        await signOut(auth);
    }
    return (
        <div className="navbar">
            <section className="logo">
                HELLO
            </section>
            <div className="links">
                <Link to="/">HOME</Link>
                {!user ?
                    <Link to="/login">LOGIN</Link> :
                    <Link to="/createpost">CREATE POST</Link>
                }
            </div>

            {user && (
                <div className="user-detail" onClick={() => setBtnVisibility(!btnVisibility)}>
                    <img src={user.photoURL || "https://lh3.googleusercontent.com/jUoaTIlBn5ibfQcND2n5OMD6Z7xoqNj-ShHlFR6QuLffLXD5pS8V2eNg1rGlrsRrnDkoQ28O8UHzqzBQKAGY4l1CS2NQSq2SkRScK6FOjl82jppyohK-"} alt="dp" />
                    {btnVisibility && <div className="additional" id="additional">
                        <p>{user.displayName}</p>
                        <button onClick={logout}>Logout</button>
                    </div>}
                </div>
            )}
        </div>
    )
}
