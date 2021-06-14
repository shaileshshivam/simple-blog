import React, { useState, createContext, useEffect } from "react";
import { firestore } from "./firebase";

export const PostContext = createContext();

const collectDocAndIds = (doc) => {
  return {
    id: doc.id,
    ...doc.data(),
  };
};

const PostProvider = (props) => {
  const [posts, setPosts] = useState(null);

  const { children } = props;

  useEffect(() => {
    async function getPosts() {
      const snapshot = await firestore.collection("posts").get();
      setPosts(snapshot.docs.map((doc) => collectDocAndIds(doc)));
    }
    getPosts();
  }, []);

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};

export default PostProvider;
