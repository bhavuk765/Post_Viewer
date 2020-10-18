import React from 'react';
import './App.css';
import PostItem from './PostItem'
import SearchBar from './SearchBar'
import {connect} from "react-redux"
import {like,dislike,setPosts} from "./redux"
import {Link, Route, Switch} from "react-router-dom"
import SinglePost from "./SinglePost"
import { wait } from '@testing-library/react';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      posts:null,
      failed:false
    }
  }

componentDidMount() {
    this.setState({loading: true})
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => {
          const posts = data.map(item=>({...item, l:0,d:0}))
          this.setState({
                loading:false,
                posts:posts
            })
          this.props.setPosts(posts)
          })
}
  render(){
  const text = this.state.loading ? "loading..." :"Done"
  if(this.props.posts==null){
    return <h1>Loading...</h1>
  }
  wait(800);
  const postItems = this.props.posts.map(item => (
    <PostItem key={item.id} index={item.id-1}/>
    )
   )
   
  return (
    <div className="App">
      <h1 >Post Viewer Application</h1>
      <h1>{text}</h1>
      <nav>
      &nbsp;<Link to="/">Home </Link> &nbsp;&nbsp;
        <Link to="/search">Search </Link>
      </nav>
      <Switch>
        <Route exact path="/">
          {postItems}
        </Route>
        <Route path="/search">
          <SearchBar posts={this.state.posts}/>
        </Route>
        <Route path="/post/(\d+)">
          <SinglePost data={this.state.posts}/>
        </Route>
      </Switch>     
    </div>
  );
}
} 

export default connect(posts=>({posts:posts}), {like, dislike, setPosts})(App);
