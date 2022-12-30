import { auth, provider } from '../config/firebase';
import { signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider);
        navigate('/');
    }

    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className='login'>
            <p>Sign In to continue</p>
            <div className='loginBtn' onClick={signInWithGoogle}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU' alt='google icon' /> Sign In with Google</div>
            <div className='loginBtn' onClick={signInWithGoogle}><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='github icon' />Sign In with Github</div>
            <p onClick={signUserOut} style={{ color: "red", textAlign: 'left' }}>Sign Out</p>
        </div>
    )
}