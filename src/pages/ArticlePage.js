import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import axios from 'axios';
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentFrom from "../components/AddCommentForm";
const ArticlePage = () => {
    
    const [articleInfo, setArticleInfo] = React.useState({ 
        upvotes: 0, 
        comments: [] 
    })

    const { articleId } = useParams();
    
    useEffect(() => {
        console.log('request made!')
        const loadArticleInfo = async() => {
            const response = await axios.get(`/api/articles/${articleId}`)
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo)
        }
        loadArticleInfo();
    }, [articleId])
    
    const article = articles.find(article => article.name === articleId)

    const addUpvote = async() => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`)
        const updatedArticle = response.data
        console.log(updatedArticle)
        setArticleInfo(updatedArticle)
    }
    
    if(!article) {
        return (<NotFoundPage />)
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                <button onClick={addUpvote}>Upvote</button>
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <AddCommentFrom 
                articleName={articleId}
                onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
            />
            <CommentsList 
                comments={articleInfo.comments}
            />
        </>
        
        
    )
}

export default ArticlePage;