import { useEffect, useState } from "react";
import { users } from "../../data/users";
import "./Table.css";

export const Table = () => {
  const [userData, setUserData] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [pagination, setPagination] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setUserData(users);
  }, []);

  useEffect(() => {
    setPagination(Math.ceil(users.length / limit));
  }, [limit]);

  useEffect(() => {
    // console.log(nameSearch);
    nameSearch.length > 0
      ? setUserData(filterName(nameSearch))
      : setUserData(users);
    setCurrentPage(0);
  }, [nameSearch]);

  const renderUserInfo = (users) =>
    users.length > 0 &&
    users
      /**
       * 0 * 5, 5 + 0 * 5 -> 0,5
       * 1* 5 , 5 + 1 * 5 -> 5,10
       * ...
       * n * 5 , 5 + n * 5 -> n,n+5
       */
      .slice(currentPage * limit, limit + currentPage * limit)
      .map((user, index) => (
        <tr key={index}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.age}</td>
        </tr>
      ));

  const filterName = (name) => users.filter((user) => user.name.includes(name));

  const renderPagination = (pagination) =>
    Array.from(Array(pagination).keys()).map((pagination, index) => (
      <button key={index} onClick={() => setCurrentPage(pagination)}>
        {pagination + 1}
      </button>
    ));

  return (
    <div>
      <div>
        <input
          className="input-search"
          type="text"
          placeholder="Enter name's user that you want to search"
          onChange={(e) => setNameSearch(e.target.value)}
        />
        <select
          className="styled-select"
          onChange={(e) => setLimit(Number.parseInt(e.target.value))}
        >
          <option value="5">Hiển thị 5</option>
          <option value="10">Hiển thị 10</option>
          <option value="15">Hiển thị 15</option>
        </select>
      </div>
      <table id="customers">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>{renderUserInfo(userData)}</tbody>
      </table>
      <div>{renderPagination(pagination)}</div>
    </div>
  );
};
