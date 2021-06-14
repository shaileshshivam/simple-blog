import { useEffect, useState } from "react";
import { post } from "request";
import { firestore } from "./firebase";
import PostListItem from "./PostListItem";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getAllPosts() {
      const snapshot = await firestore.collection("posts").get();
      const documents = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setPosts(documents);
    }

    getAllPosts();
  }, [setPosts]);
  return (
    <div className="post-list-container">
      {post.length > 0 && posts.map((post) => <PostListItem post={post} />)}
    </div>
  );
};

export default PostList;
