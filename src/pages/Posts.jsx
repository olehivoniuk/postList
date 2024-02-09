import React, { useEffect, useRef, useState } from "react";
import PostService from '../API/PostService'
import {usePosts} from '../hooks/usePosts'
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import Postform from "../components/Postform";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";






function Posts() {

  const [ posts, setPosts] = useState ([])
  const [filter, setFilter ] = useState ({sort:'', query: ''}); 
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState (0); 
  const [limit, setLimit] = useState (10);
  const [page, setPage] = useState (1);
  const lastElement = useRef();
 


  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);


  const[fetchPosts, isPostLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page); 
    setPosts([...posts,...response.data])
     const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })

  console.log(totalPages)
  
  useObserver(lastElement,  page < totalPages, isPostLoading, () =>{
      setPage(page + 1)
  })
  

  useEffect(()=>{
    fetchPosts(limit, page)
  }, [page, limit])

   const createPost = (newPost) =>{
     setPosts([...posts, newPost])
     setModal (false)
   }

   const removePost = (post) =>{
     setPosts(posts.filter(p => p.id !== post.id))
   }

   const changePage = (page) => {
     setPage(page)
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
      <MySelect value={limit}
      onChange={value => setLimit (value)}
      defaultValue = "Quantity of elements on the page"
      options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Show all'},

      ]}
      />

      
      {postError && 
          <h1>The error has occured ${postError}</h1>
      }
      {isPostLoading &&
          <div style={{display:'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
          }

          <PostList remove ={removePost} posts = {sortedAndSearchPosts} title = 'List about JS'/>
         <div ref={lastElement} style={{height: 20, background: 'red'}}/>

      <Pagination
       page={page}
       changePage ={changePage}
       totalPages={totalPages}/>
    </div>
  );
}

export default Posts;
