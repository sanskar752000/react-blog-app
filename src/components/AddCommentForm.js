import axios from "axios";
import React from "react";

const AddCommentFrom = ({ articleName, onArticleUpdated }) => {
    // const [name, setName] = React.useState('')
    // const [commentText, setCommentText] = React.useState('')

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
        const response = await axios.post(`/api/articles/${articleName}/postComment`, {
            postedBy: commentFormData.name,
            text: commentFormData.commentText
        })
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
            <label>
                Name:
                <input 
                    name="name"
                    value={commentFormData.name}
                    onChange={handleChange}
                    type="text" 
                />
            </label>
            <label>
                Comment:
                <textarea   
                    rows="4" 
                    cols="50" 
                    name="commentText"
                    value={commentFormData.commentText}
                    onChange={handleChange}
                />
            </label>
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}   

export default AddCommentFrom;