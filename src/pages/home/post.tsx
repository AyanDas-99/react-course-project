import { Post as IPost } from "./Home"

interface Props {
    post: IPost
}

export const Post = (props: Props) => {
    const { post } = props;
    return (
        <div style={{ margin: "2em", border: "1px solid black", width: "200px", padding: "1em" }}>
            <p>{post.username}</p>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <div className="footer" style={{ borderTop: "1px solid grey", margin: "10px 0" }}>
                <button style={{background: 'none', border: "none", cursor: "pointer"}}>&#128077;</button>
            </div>
        </div>
    )
}