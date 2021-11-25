function UserPosts({ post }) {
  return (
    <div className="post-temp-comp">
      <div className="post-title">Title: {post.title}</div>
      <div className="post-body"> </div>
      Body:{post.body}
    </div>
  );
}

export default UserPosts;
