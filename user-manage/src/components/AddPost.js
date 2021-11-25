import { useState } from "react";
function AddPost({ userId, callbackCancelPost, callbackAddPost }) {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = () => {
    if (post.title !== "" && post.body !== "") {
      callbackAddPost(post);
    }
  };

  return (
    <div className="add-post-box">
      <h3>New Post - User{userId}</h3>

      <div className="add-box">
        <label>
          {" "}
          Title:
          <input
            className="add-inp"
            type="text"
            required
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />{" "}
        </label>
        <br />
        <label>
          {" "}
          Body:
          <input
            className="add-inp"
            type="text"
            required
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />{" "}
        </label>
        <br />
        <div className="btn-add-gen">
          <input
            className="add-btn"
            type="button"
            value="Cancel"
            onClick={callbackCancelPost}
          />
          <input
            className="add-btn"
            type="button"
            value="Add"
            onClick={addNewPost}
          />
        </div>
      </div>
    </div>
  );
}

export default AddPost;
