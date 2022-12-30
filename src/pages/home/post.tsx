import { collection, addDoc, query, where, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post as IPost } from "./Home"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";

interface Props {
    post: IPost
}

export const Post = (props: Props) => {

    const { post } = props;

    const [user] = useAuthState(auth);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const [likeAmount, setLikeAmount] = useState<number | null>(null);

    const addLike = async () => {
        await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id,
        })
        getLikes();
    }

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikeAmount(data.docs.length);
    }

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div style={{ margin: "2em", border: "1px solid black", width: "200px", padding: "1em" }}>
            <p style={{ margin: "10px 0" }}>{post.username}</p>
            <h4 style={{ margin: "10px 0" }}>{post.title}</h4>
            <p style={{ margin: "10px 0" }}>{post.description}</p>
            <div className="footer" style={{ borderTop: "1px solid grey", margin: "10px 0" }}>
                <button onClick={addLike} style={{ background: 'none', border: "none", cursor: "pointer" }}>&#128077;</button>
                {likeAmount && <p>Likes: {likeAmount}</p>}
            </div>
        </div>
    )
}