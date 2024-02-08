import React from 'react'
import PostItem from './PostItem'
import { TransitionGroup } from 'react-transition-group'
import { CSSTransition } from 'react-transition-group'

const PostList = ({ posts, title, remove }) => {
    if (!posts.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>
                Post haven't been found
            </h1>
        )
    }
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{title}s</h1>
            <TransitionGroup>
            {posts.map((post, index) =>
                <CSSTransition 
                   key={post.id} 
                   timeout={500}
                   className="post"
                >
                <PostItem remove={remove} number={index + 1} post={post}  />
                </CSSTransition>
            )}
            </TransitionGroup>
        </div>
    )
}

export default PostList
