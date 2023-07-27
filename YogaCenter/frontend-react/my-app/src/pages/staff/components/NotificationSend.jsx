import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { URL_API, notification } from "./ConstDefine";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
function NotificationSend() {
  const [sendPost, setSendPost] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  ///URP_API
  let getSendPostAPI = URL_API + `UserNotification/` + notification;
  useEffect(() => {
    axios
      .get(getSendPostAPI)
      .then((r) => {
        setSendPost(r.data);
        setState(false);
      })
      .catch((err) => console.log(err));
  }, [state]);
  function filterDate(time) {
    const split = time.split("T");
    let value = split[0];
    return value;
  }
  function readHanlder(noteId) {
    let maskAsReadAPI = URL_API + `Notification/${noteId}`;
    axios
      .put(maskAsReadAPI)
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
    setState(true);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalItems = sendPost.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPosts = sendPost.slice(startIndex, endIndex);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  console.log(sendPost);
  return (
    <div className="staff-inbox">
      <table className="table-staff-noti">
        <thead>
          <tr>
            <th>Index</th>
            <th>Title</th>
            <th>Desctiption</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedPosts ? (
            displayedPosts.map((item, index) => (
              <tr key={index}>
                <td>
                  {startIndex + index + 1}
                  {item.notification.status === 1 ? (
                    <p style={{ color: "red" }}>Unread</p>
                  ) : (
                    ""
                  )}
                  <Link
                    onClick={() => readHanlder(item.notification.id)}
                    style={{ padding: "20% 350%" }}
                  ></Link>
                </td>

                <td>{item.notification.title}</td>
                <td>
                  <textarea
                    disabled
                    style={{ whiteSpace: "pre-wrap" }}
                    rows={5}
                    cols={50}
                    value={item.notification.detail}
                  >
                  </textarea>
                </td>
                <td>{filterDate(item.daycreate)}</td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}
export default React.memo(NotificationSend);
