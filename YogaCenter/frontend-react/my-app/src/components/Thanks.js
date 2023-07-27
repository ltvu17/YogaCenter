import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { URL_API, notification } from "../pages/staff/components/ConstDefine";
import "../css/thank.css";
import uuidv4 from "../pages/staff/components/ConstDefine";
import { Grid, Typography } from "@mui/material";
import { HmacSHA512 } from "crypto-js";
import { secretKey } from "../pages/customer/components/ConstDefine";

export default function Thanks() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [user, setUser, removeUser] = useCookies();
  const [customer, setCustomer] = useState();
  const [course, setCourse] = useState();
  const navigate = useNavigate();
  const [noteId] = useState(uuidv4());
  const [invoiceId] = useState(uuidv4());
  const [lession, setLession] = useState();
  const [cookies] = useCookies();
  console.log(user);
  params.get("vnp_TxnRef");
  ///URL_API
  let customerAPI = URL_API + `Customer/${user.userId}`;
  let courseAPI = URL_API + `Course/${params.get("vnp_OrderInfo")}`;
  let postNotificationAPI = URL_API + `Notification`;
  let postUserNotificationAPI = URL_API + `UserNotification`;
  let lessionByClassIdAPI = URL_API + `Lesson/${cookies.classId}`;
  let classCustmerAPI = URL_API + `ClassCustomer/${cookies.classId}`;
  let customerLessonAPI = URL_API + `CustomerLesson/`;
  // const [showPopup, setShowPopup] = useState(true);
  let postInvoiceAPI = URL_API + `Invoice/VNPay`;
  function filterDay(day) {
    const split = day.split("T");
    let value = split[0];
    return value;
  }
  var date = new Date().toISOString();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(customerAPI)
        .then((r) => {
          setCustomer(r.data);
          axios
            .get(courseAPI)
            .then((r) => {
              setCourse(r.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };
    return async () => {
      await fetchData();
    };
  }, []);
  useEffect(() => {
    axios
      .get(lessionByClassIdAPI)
      .then((res) => {
        setLession(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (
    course !== undefined &&
    customer !== undefined &&
    user.timeout === HmacSHA512(params.get("vnp_TxnRef"), secretKey).toString()
  ) {
    console.log(1);
    removeCookie();
    createInvoice();
  }

  function removeCookie() {
    removeUser("timeout");
  }

  async function createInvoice() {
    if (params.get("vnp_TransactionStatus") === "00") {
      await axios
        .post(
          postInvoiceAPI,
          {
            id: invoiceId,
            dateRequest: filterDay(date),
            datePay: filterDay(date),
            note: `Paid_${cookies.classId}`,
            totalPay: params.get("vnp_Amount") / 100,
          },
          {
            headers: {
              customerId: customer.id,
              courseId: params.get("vnp_OrderInfo"),
            },
          }
        )
        .catch((err) => console.log(err));
      await axios
        .post(postNotificationAPI, {
          id: noteId,
          title: "Register Course",
          detail: `Customer:${customer.customerName}\nRegister course:${
            course.courseDescription
          }\nAmount:${params.get("vnp_Amount") / 100}`,
          status: 1,
        })
        .then((r) => {
          console.log(r);
        })
        .catch((err) => console.log(err));
      await axios
        .post(postUserNotificationAPI, "", {
          headers: {
            senderId: user.userId,
            receiverId: notification,
            noteId: noteId,
          },
        })
        .then((r) => console.log(r))
        .catch((err) => console.log(err));

      await axios
        .post(
          classCustmerAPI,
          {},
          {
            headers: {
              customerId: customer.id,
            },
          }
        )
        .then((r) => console.log(r))
        .catch((err) => console.log(err));

        fetchCustomerData();
    } else {
      navigate("/registerClass");
    }
  }
  const fetchCustomerData = async () => {
    try {
      for (const lesson of lession) {
        const api = customerLessonAPI + `${lesson.id}/${customer.id}`;
        const response = await axios.post(api);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(lession);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <Grid container md={12} className="thanks-main">
      <Grid
        item
        md={6}
        className="thanks-title"
        sx={{ marginTop: "5%", padding: "3%" }}
      >
        <Typography variant="h1">
          Thank you for choosing and trusting us
        </Typography>
        <Typography variant="subtitle1">
          Wish you have a nice experience
        </Typography>
      </Grid>
      <Grid item md={6} className="item-thanks">
        <img src="assets/images/item-thanks.png" />
      </Grid>
    </Grid>
  );
}
