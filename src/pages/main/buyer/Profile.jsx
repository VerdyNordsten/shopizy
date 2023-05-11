/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import defaultImg from "../../../assets/images/default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faBoxArchive,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/profile.css";
import EditProfileBuyer from "../../../components/profile/EditProfileBuyer";
import Address from "../../../components/profile/Address";
import Order from "../../../components/profile/Order";
import { useDispatch, useSelector } from "react-redux";
import { getDetailUser } from "../../../redux/action/users";
import DetailTransaction from "../../../components/profile/DetailTransaction";
import { Code } from "react-content-loader";
import { getMyOrderBuyer } from "../../../redux/action/myOrderBuyer";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.detailUser;
  });
  const myOrderBuyer = useSelector((state) => {
    return state.myOrderBuyer;
  });
  const [idOrder, setIdOrder] = useState(null);
  const [form, setForm] = useState({
    birth: "",
    email: "",
    gender: "",
    id: "",
    name: "",
    phone: "",
    photo: "",
  });

  useEffect(() => {
    document.title = "SHOPIZY - My Profile";
    dispatch(getDetailUser());
  }, []);

  useEffect(() => {
    setForm({
      birth: data.data.birth,
      email: data.data.email,
      gender: data.data.gender,
      id: data.data.id,
      name: data.data.name,
      phone: data.data.phone,
      photo: data.data.photo,
    });
  }, [data]);

  useEffect(() => {
    dispatch(getMyOrderBuyer());
    //console.log(myOrderBuyer);
  }, []);

  //console.log(data);
  const [profile, setprofile] = useState(true);
  const [edit, setEdit] = useState(true);
  const [address, setAddress] = useState(false);
  const [order, setOrder] = useState(false);
  const [orderDetail, setOrderDetail] = useState(false);

  const setContent = (item) => {
    if (item === "profile") {
      setprofile(true);
      setAddress(false);
      setOrder(false);
      setOrderDetail(false);
    }
    if (item === "address") {
      setprofile(false);
      setAddress(true);
      setOrder(false);
      setOrderDetail(false);
    }
    if (item === "order") {
      setprofile(false);
      setAddress(false);
      setOrder(true);
      setOrderDetail(false);
    }
    if (item === "order detail") {
      setprofile(false);
      setAddress(false);
      setOrder(false);
      setOrderDetail(true);
    }
  };

  return (
    <>
      <div
        className="profile d-flex flex-column container-fluid align-items-center"
        style={{ padding: "0px" }}
      >
        <Navbar login={token} />
        <div className="d-flex" style={{ width: "100%", marginTop: "-50px" }}>
          <div
            className="d-flex flex-column"
            style={{
              width: "30%",
              backgroundColor: "#F5F5F5",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              paddingTop: "50px",
            }}
          >
            <div
              className="d-flex"
              style={{
                width: "80%",
                marginBottom: "60px",
              }}
            >
              <img
                src={
                  data.data.photo
                    ? `https://drive.google.com/uc?export=view&id=${data.data.photo}`
                    : defaultImg
                }
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  margin: "0px 30px 30px 0px",
                }}
              />
              <div>
                <h4>{data.data.name}</h4>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#9B9B9B",
                  }}
                  onClick={() => setEdit(!edit)}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    style={{
                      color: "#9B9B9B",
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                  Ubah Profile
                </label>
              </div>
            </div>
            <div
              className="d-flex flex-column"
              style={{
                width: "80%",
              }}
            >
              <label
                style={
                  profile
                    ? {
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        margin: "10px 0px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "black",
                      }
                    : {
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        margin: "10px 0px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#9B9B9B",
                      }
                }
                onClick={() => setContent("profile")}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    backgroundColor: "#456BF3",
                    color: "#FFFFFF",
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                    marginRight: "20px",
                    padding: "10px",
                  }}
                />
                My account
              </label>
              <label
                style={
                  address
                    ? {
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        margin: "10px 0px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "black",
                      }
                    : {
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        margin: "10px 0px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#9B9B9B",
                      }
                }
                onClick={() => setContent("address")}
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{
                    backgroundColor: "#F36F45",
                    color: "#FFFFFF",
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                    marginRight: "20px",
                    padding: "10px",
                  }}
                />
                Shipping Adress
              </label>
              <label
                style={
                  order
                    ? {
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        margin: "10px 0px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "black",
                      }
                    : {
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                        margin: "10px 0px",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#9B9B9B",
                      }
                }
                onClick={() => setContent("order")}
              >
                <FontAwesomeIcon
                  icon={faBoxArchive}
                  style={{
                    backgroundColor: "#F3456F",
                    color: "#FFFFFF",
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                    marginRight: "20px",
                    padding: "10px",
                  }}
                />
                My order
              </label>
            </div>
          </div>
          {data.isLoading ? (
            <Code />
          ) : (
            <EditProfileBuyer
              hidden={profile}
              data={form}
              detailUser={data}
              edit={edit}
              setEdit={() => setEdit(true)}
              setData={(item) => setForm(item)}
              getData={() => dispatch(getDetailUser())}
            />
          )}

          <Address hidden={address} />
          <Order
            hidden={order}
            data={myOrderBuyer}
            setOrder={(transId) => {
              setIdOrder(transId);
              setContent("order detail");
            }}
          />
          {myOrderBuyer
            ? myOrderBuyer?.data?.data?.length > 0
              ? myOrderBuyer?.data?.data?.map((item, i) => {
                  if (idOrder) {
                    if (item.id == idOrder) {
                      return (
                        <DetailTransaction
                          hidden={orderDetail}
                          key={i}
                          data={item}
                          setOrder={() => {
                            setContent("order");
                          }}
                        />
                      );
                    }
                  }
                })
              : null
            : null}
        </div>
      </div>
    </>
  );
}
