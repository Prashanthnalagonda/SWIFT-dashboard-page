import React, { useEffect, useState } from "react";

const CommentTable = () => {
  const [comments, setComments] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [pageSize, setPageSize] = useState(() => Number(localStorage.getItem("pageSize")) || 10);
  const [currentPage, setCurrentPage] = useState(() => Number(localStorage.getItem("currentPage")) || 1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("sortKey", sortKey);
    localStorage.setItem("sortOrder", sortOrder);
    localStorage.setItem("pageSize", pageSize);
    localStorage.setItem("currentPage", currentPage);
  }, [search, sortKey, sortOrder, pageSize, currentPage]);

  useEffect(() => {
    let filtered = comments.filter((c) =>
      [c.name, c.email, c.body].some((f) => f.toLowerCase().includes(search.toLowerCase()))
    );

    if (sortKey) {
      filtered.sort((a, b) => {
        if (sortOrder === "asc") return a[sortKey] > b[sortKey] ? 1 : -1;
        if (sortOrder === "desc") return a[sortKey] < b[sortKey] ? 1 : -1;
        return 0;
      });
    }

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayed(filtered.slice(start, end));
  }, [comments, search, sortKey, sortOrder, pageSize, currentPage]);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
    } else {
      setSortOrder((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
      if (sortOrder === null) setSortKey(null);
    }
  };

  const totalPages = Math.ceil(
    comments.filter((c) =>
      [c.name, c.email, c.body].some((f) => f.toLowerCase().includes(search.toLowerCase()))
    ).length / pageSize
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <button onClick={() => toggleSort("postId")}>Sort Post ID</button>
        <button onClick={() => toggleSort("name")}>Sort Name</button>
        <button onClick={() => toggleSort("email")}>Sort Email</button>
        <input
          type="text"
          placeholder="Search name, email, comment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((item) => (
              <tr key={item.id}>
                <td>{item.postId}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <div>
          <span>
            {displayed.length} of {comments.length} items | Page {currentPage} of {totalPages}
          </span>
        </div>
        <div>
          <select onChange={(e) => setPageSize(Number(e.target.value))} value={pageSize}>
            <option value="10">10 / Page</option>
            <option value="50">50 / Page</option>
            <option value="100">100 / Page</option>
          </select>
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Prev</button>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CommentTable;