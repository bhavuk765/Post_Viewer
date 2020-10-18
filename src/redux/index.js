import redux, {createStore} from "redux"
export function like(id){
    return {
        type:"LIKE",
        id:id
    }
}
export function dislike(id){
    return {
        type:"DISLIKE",
        id:id
    }
}
export function setPosts(data){
    return {
        type:"SET_POSTS",
        payload:data
    }
}
const initialState = null;
let newPost = null;
function reducer(posts = initialState,action){
    switch (action.type) {
        case "LIKE":
            newPost = [...posts]
            newPost[action.id-1] = {
                ...newPost[action.id-1], 
                l:(newPost[action.id-1].l+1)%2,
                d:0}
            return newPost
        case "DISLIKE":
            newPost = [...posts]
            newPost[action.id-1] = {
                ...newPost[action.id-1], 
                l:0, 
                d:(newPost[action.id-1].d+1)%2}
            return newPost
        case "SET_POSTS":
            return [
                ...action.payload
            ]
        default:
            return posts;
    }
}
const store = createStore(reducer)
// store.subscribe(() => console.log(store.getState()))
export default store