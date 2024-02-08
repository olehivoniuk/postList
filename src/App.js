import React, { useEffect, useState } from "react";
import {usePosts} from './hooks/usePosts'
import { getPageCount, getPagesArray } from "./utils/pages";
import { useFetching } from "./hooks/useFetching";
import PostList from "./components/PostList";
import Postform from "./components/Postform";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import './styles/App.css'
import Pagination from "./components/UI/pagination/Pagination";



function App() {

  const [ posts, setPosts] = useState ([])
  const [filter, setFilter ] = useState ({sort:'', query: ''}); 
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState (0); 
  const [limit, setLimit] = useState (10);
  const [page, setPage] = useState (1); 
 


  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);


  const[fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page); 
    setPosts(response.data)
     const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })

  console.log(totalPages)

  useEffect(()=>{
    fetchPosts(limit, page)
  }, [page])

   const createPost = (newPost) =>{
     setPosts([...posts, newPost])
     setModal (false)
   }

   const removePost = (post) =>{
     setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (page) => {
     setPage(page)
     fetchPosts(limit,page)
   }


  return (
    <div className="App">
       <button onClick={fetchPosts}>GET POSTS</button>
       <MyButton style ={{marginTop: 30}} onClick = {() => setModal(true)} >Create user</MyButton>
      <MyModal visible={modal} setVisible ={setModal}>  
        <Postform create ={createPost} />
        </MyModal>
    

      <hr  style={{margin: '15px 0'}}/>
      <PostFilter  filter={filter} setFilter = {setFilter}/>
      {postError && 
       <h1>The error has occured ${postError}</h1>
      }
      {isPostLoading
         ?  <div style={{display:'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
         : <PostList remove ={removePost} posts = {sortedAndSearchPosts} title = 'List about JS'/>

      }
      
      <Pagination
       page={page}
       changePage ={changePage}
       totalPages={totalPages}/>
    </div>
  );
}

export default App;
