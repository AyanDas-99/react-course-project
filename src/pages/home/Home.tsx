import { db } from '../../config/firebase';
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Post as PostElement} from './post';

export interface Post {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
}

export const Home = () => {
    const postRef = collection(db, "posts");

    const [postList, setPostlist] = useState<Post[] | null>(null)

    const getData = async () => {
        const posts = await getDocs(postRef);
        setPostlist(posts.docs.map((e) => (
            { ...e.data(), id: e.id }) as Post
        ));
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div style={{display: "flex"}}>
                {postList && postList.map((post, key) => <PostElement post={post} key={key}/>)}
            </div>
        </div>
    )
}

