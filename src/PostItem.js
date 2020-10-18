import React from "react"
import {connect} from "react-redux"
import {like,dislike} from "./redux"
import {Link} from "react-router-dom"
function PostItem(props){
    let data= props.data[props.index]
    return (
        <div className = "PostItem">
            <Link to={"/post/"+data.id} style={{textDecoration:"none"}}>
            <h2>#{data.id}. <i>{data.title}</i></h2>
                </Link>
            <p>{data.body}</p>
            <p>{props.data[props.index].title}</p>
            <h3>Posted by user {data.userId}</h3>
            <div className="votes">
                <button className="likes" onClick={()=>{
                    props.like(props.index+1);
                }}>+{data.l}</button>
                <button className="dislikes" onClick={()=>{
                    props.dislike(props.index+1);
                }}>-{data.d}</button>
                <button className="total">Total {data.l-data.d}</button>    
            </div>
            
        </div>
    )
}

export default connect(posts=>({data:posts}),{like,dislike})(PostItem)