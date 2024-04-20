import React, { useState } from "react";

const PostList = () => {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, isFetching } = useListPostsQuery(page);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!posts?.data) {
    return <div>No posts :(</div>;
  }

  return (
    <div>
      {posts.data.map(({ id, title, status }) => (
        <div key={id}>
          {title} - {status}
        </div>
      ))}
      <button onClick={() => setPage(page - 1)} isLoading={isFetching}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} isLoading={isFetching}>
        Next
      </button>
    </div>
  );
};
