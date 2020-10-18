import React from "react"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import PostItem from "./PostItem"
class SearchBar extends React.Component{
    constructor(){
        super()
        this.state = {
            value:'',
            newPosts:null,
        }
    }
    containsInput = (value) => {
        return function (post){
            return post.title.includes(value) || post.body.includes(value)
        }
    }

    handleChange = (e) => {
        this.setState({value:e.target.value})
        const newPosts = this.props.posts.filter(this.containsInput(e.target.value))
        this.setState({newPosts})
        if(e.target.value==='')this.setState({newPosts:null})
    }
    
    render(){

        return (<>
            <form className="SearchBar" 
                onSubmit={e =>{
                e.preventDefault()
                const count=this.state.newPosts.length
                alert(count+" results found")
                }}>
                <input 
                    type="search" 
                    value={this.state.value} 
                    placeholder="Search posts"
                    onChange={this.handleChange}/>
                <button type="submit"><i className="fa fa-search"></i></button>
                <br/>
            </form>    
            {this.state.newPosts===null?(<>Enter search query</>):
                this.state.newPosts.length===0?(<>No results found</>):(
                    this.state.newPosts.map(item=>(
                        <PostItem key={item.id} index={item.id-1} />
                    ))
                )}
            </>
        )
    }
}
export default connect(posts=>({posts}))(SearchBar)