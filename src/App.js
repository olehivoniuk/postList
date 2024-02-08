import React, { useState, useMemo } from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import Postform from "./components/Postform";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";


function App() {
   const [ posts, setPosts] = useState ([
    {id: 1,  title : 'hello', body: 'congrants'},
    {id: 2,  title : 'hi', body: 'sayHi'}, 
    {id: 3,  title : 'Bonjour', body: 'welcome'}
   ])

  const [filter, setFilter ] = useState ({sort:'', query: ''}); 
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo( () => {
    if(filter.sort){
      return [...posts].sort( (a, b)=> a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts; 
  }, [filter.sort, posts])

  const sortedAndSearchPosts = useMemo(() => {
     return sortedPosts.filter( post => post.title.toLowerCase().includes(filter.query.toLocaleLowerCase()))
  }, [filter.query,  sortedPosts])

   const createPost = (newPost) =>{
     setPosts([...posts, newPost])
     setModal (false)
   }
   const removePost = (post) =>{
     setPosts(posts.filter(p => p.id !== post.id))
   }


  return (
    <div className="App">
       <MyButton style ={{marginTop: 30}} onClick = {() => setModal(true)} >Create user</MyButton>
      <MyModal visible={modal} setVisible ={setModal}>  
        <Postform create ={createPost} />
        </MyModal>
    

      <hr  style={{margin: '15px 0'}}/>
      <PostFilter  filter={filter} setFilter = {setFilter}/>
      
         <PostList remove ={removePost} posts = {sortedAndSearchPosts} title = 'List about JS'/>
    </div>
  );
}

export default App;
