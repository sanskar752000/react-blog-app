import axios from "axios";
import React from "react";
import useUser from "../hooks/useUser";

const AddCommentFrom = ({ articleName, onArticleUpdated }) => {
    // const [name, setName] = React.useState('')
    // const [commentText, setCommentText] = React.useState('')
    const { user } = useUser();
    const [commentFormData, setCommentFormData] = React.useState(
        {
            name: "",
            commentText: ""
        }
    )

    const handleChange = (event) => {
        const { name, value } = event.target
        setCommentFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

    }

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {}
        const response = await axios.post(`/api/articles/${articleName}/postComment`, {
            postedBy: commentFormData.name,
            text: commentFormData.commentText
        }, { headers })
        const updatedArticle = response.data
        onArticleUpdated(updatedArticle)
        setCommentFormData({
            name: "",
            commentText: ""
        })
    }

    return (
        <div id="add-comment-form">
            <h3>
                Add a Comment
            </h3>
            { user && <p>You are posting as {user.email}</p> }
            <textarea   
                rows="4" 
                cols="50" 
                name="commentText"
                value={commentFormData.commentText}
                onChange={handleChange}
            />
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}   

export default AddCommentFrom;