import React from 'react'
import PostItem from './PostItem'

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
            <TransitionGroup></TransitionGroup>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
            )}
        </div>
    )
}

export default PostList
