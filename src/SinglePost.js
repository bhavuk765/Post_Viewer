import React from "react"
import {connect} from "react-redux"
import {like,dislike} from "./redux"
import {useParams} from "react-router-dom"
function SinglePost(props){
    const postId = useParams()[0]
    const data = props.data[postId-1]
    return (
        <div className = "PostItem">
            <h2>#{data.id}. <i>{data.title}</i></h2>
            <p style={{overflow:"visible", whiteSpace:"normal"}}>{data.body}</p>
            <h3>Posted by user {data.userId}</h3>
            <div className="votes">
                <button className="likes" onClick={(e)=>{
                    e.preventDefault()
                    props.like(postId);
                }}>+{data.l}</button>
                <button className="dislikes" onClick={(e)=>{
                    e.preventDefault()
                    props.dislike(postId);
                }}>-{data.d}</button>
                <button className="total">Total {data.l-data.d}</button>    
            </div>
        </div>    
    )
   
}
export default connect(posts=>({data:posts}),{like,dislike})(SinglePost)