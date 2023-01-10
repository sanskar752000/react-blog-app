import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentFrom from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
const ArticlePage = () => {
    
    const [articleInfo, setArticleInfo] = React.useState({ 
        upvotes: 0, 
        comments: [],
        canUpvote: true 
    })
    const { canUpvote } = articleInfo

    // console.log('Can upvote: ' + canUpvote)

    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    
    useEffect(() => {
        const loadArticleInfo = async() => {
            const token = user && await user.getIdToken()
            const headers = token ? {authtoken: token} : {}
            const response = await axios.get(`/api/articles/${articleId}`, { headers })
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo)
        }
        if(isLoading){
            loadArticleInfo();
        }

    }, [isLoading, user])
    
    const article = articles.find(article => article.name === articleId)

    const addUpvote = async() => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {}
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers })
        const updatedArticle = response.data
        setArticleInfo(updatedArticle)
    }
    
    if(!article) {
        return (<NotFoundPage />)
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                {
                    user 
                    ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : "Already Upvoted"}</button>
                    : <button>Log in to upvote</button>
                }
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            { user
                ? 
                <AddCommentFrom 
                    articleName={articleId}
                    onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
                />
                : <button>Log in to add a comment </button>
            }
            <CommentsList 
                comments={articleInfo.comments}
            />
        </>
        
        
    )
}

export default ArticlePage;