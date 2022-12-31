import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post as IPost } from "./Home"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";

interface Props {
    post: IPost
}

interface Like {
    userId: string;
}

export const Post = (props: Props) => {

    const { post } = props;

    const [user] = useAuthState(auth);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const [Likes, setLikes] = useState<Like[] | null>(null);

    const addLike = async () => {
        await addDoc(likesRef, {
            userId: user?.uid,
            postId: post.id,
        })
        getLikes();
    }

    const removeLike = async () => {
        const likeToDeleteQuery = query(likesRef, where('postId', "==", post.id), where('userId', '==', user?.uid));
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);

        await deleteDoc(likeToDelete)
        getLikes();
    }



    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
    }

    const hasLiked = Likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
        console.log(Likes)
    }, []);

    return (
        <div style={{ margin: "2em", border: "1px solid black", width: "200px", padding: "1em" }}>
            <p style={{ margin: "10px 0" }}>{post.username}</p>
            <h4 style={{ margin: "10px 0" }}>{post.title}</h4>
            <p style={{ margin: "10px 0" }}>{post.description}</p>
            <div className="footer" style={{ borderTop: "1px solid grey", margin: "10px 0" }}>
                <button onClick={hasLiked? removeLike: addLike} style={{ background: 'none', border: "none", cursor: "pointer" }}>{hasLiked ? <>❤️</> : <>♡</>}</button>
                {Likes && <p>Likes: {Likes.length}</p>}
            </div>
        </div>
    )
}