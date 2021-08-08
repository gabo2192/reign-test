import React from "react";
import "./App.css";
import Layout from "./components/ui/layout";
import PostList from "./components/post/post-list";

function App() {
  return (
    <Layout>
      <PostList />
    </Layout>
  );
}

export default App;
