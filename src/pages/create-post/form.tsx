import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from "firebase/firestore"
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

// typescript onsubmit data type
interface FormData {
    title: string;
    description: string;
}

export const PostForm = () => {
    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    // database to send data to
    const postRef = collection(db, "posts");

    const schema = yup.object().shape({
        title: yup.string().required("You must specify a title"),
        description: yup.string().required("You must add a description"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onsubmit = async (data: FormData) => {
        await addDoc(postRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate('/');
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)} className="post-form">
            <p>{errors.title?.message}</p>
            <input type="text" placeholder='Title' {...register("title")} />
            <p>{errors.description?.message}</p>
            <textarea placeholder='Description'{...register("description")} rows={10} cols={3} />
            <input type="submit" value="Post" />
        </form>
    )
}