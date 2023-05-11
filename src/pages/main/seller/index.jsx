/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Code, Facebook } from "react-content-loader";
import Navbar from "../../../components/Navbar";
import singa from "../../../assets/images/singa.png";
import defaultImg from "../../../assets/images/default.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faPen,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/profile.css";

import Order from "../../../components/ProfileSeller/Order";
import DetailTransaction from "../../../components/ProfileSeller/DetailTransaction";
import EditProfileSeller from "../../../components/ProfileSeller/EditProfileSeller";
import ListProduct from "../../../components/ProfileSeller/ListProduct";
import AddProduct from "../../../components/ProfileSeller/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { getDetailSeller } from "../../../redux/action/detailSeller";
import { getMyProduct } from "../../../redux/action/myProduct";
import { getMyOrderSeller } from "../../../redux/action/myOrderSeller";

export default function Index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");
  const detailSeller = useSelector((state) => {
    return state.detailSeller;
  });
  const myProduct = useSelector((state) => {
    return state.myProduct;
  });
  const myOrderSeller = useSelector((state) => {
    return state.myOrderSeller;
  });
  // give title at head
  useEffect(() => {
    document.title = "SHOPIZY - Profile";
  }, []);

  // get data
  useEffect(() => {
    dispatch(getDetailSeller());
    dispatch(getMyProduct());
    dispatch(getMyOrderSeller());
    if (
      myOrderSeller.isError == true ||
      myProduct.isError == true ||
      detailSeller.isError == true
    ) {
      setErr(true);
    }
    if (
      myOrderSeller.isLoading == false &&
      myProduct.isLoading == false &&
      detailSeller.isLoading == false
    ) {
      setLoading(false);
    }
  }, []);
  const [profile, setprofile] = useState(true);
  const [product, setProduct] = useState(false);
  const [order, setOrder] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [orderCancel, setOrderCancel] = useState(false);
  // tes
  const [orderDetail, setOrderDetail] = useState(false);

  const [isProfileOpen, setIsprofileOpen] = useState(true);
  const [isProductOpen, setProductOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  //
  const [idOrder, setIdOrder] = useState(null);

  const setOpen = (item) => {
    if (item === "profile") {
      setIsprofileOpen(!isProfileOpen);
      setProductOpen(false);
      setIsOrderOpen(false);
    }
    if (item === "product") {
      setIsprofileOpen(false);
      setProductOpen(!isProductOpen);
      setIsOrderOpen(false);
    }
    if (item === "order") {
      setIsprofileOpen(false);
      setProductOpen(false);
      setIsOrderOpen(!isOrderOpen);
    }
  };

  const setContent = (item) => {
    if (item === "profile") {
      setprofile(true);
      setProduct(false);
      setOrder(false);
      setAddProduct(false);
      setOrderCancel(false);
      setOrderDetail(false);
    }
    if (item === "product") {
      setprofile(false);
      setProduct(true);
      setOrder(false);
      setAddProduct(false);
      setOrderCancel(false);
      setOrderDetail(false);
    }
    if (item === "order") {
      setprofile(false);
      setProduct(false);
      setOrder(true);
      setAddProduct(false);
      setOrderCancel(false);
      setOrderDetail(false);
    }
    if (item === "add product") {
      setprofile(false);
      setProduct(false);
      setOrder(false);
      setAddProduct(true);
      setOrderCancel(false);
      setOrderDetail(false);
    }
    if (item === "order cancel") {
      setprofile(false);
      setProduct(false);
      setOrder(false);
      setAddProduct(false);
      setOrderCancel(true);
      setOrderDetail(false);
    }
    if (item === "order detail") {
      setprofile(false);
      setProduct(false);
      setOrder(false);
      setAddProduct(false);
      setOrderCancel(false);
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
        {loading ? (
          <>
            <Facebook />
          </>
        ) : err ? (
          <div>Error...</div>
        ) : (
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
                {detailSeller.data?.data?.photo ? (
                  <img
                    src={`https://drive.google.com/uc?export=view&id=${detailSeller.data.data.photo}`}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      margin: "0px 30px 30px 0px",
                    }}
                  />
                ) : (
                  <img
                    src={defaultImg}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      margin: "0px 30px 30px 0px",
                    }}
                  />
                )}
                <div>
                  <h4>{detailSeller.data?.data?.name}</h4>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#9B9B9B",
                    }}
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
                    isProfileOpen
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
                  onClick={() => setOpen("profile")}
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
                  My store
                  <FontAwesomeIcon
                    icon={isProfileOpen ? faAngleUp : faAngleDown}
                    style={
                      isProfileOpen
                        ? {
                            height: "18px",
                            margin: "10px 10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "black",
                            width: "150px",
                          }
                        : {
                            height: "18px",
                            margin: "10px 10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#9B9B9B",
                            width: "150px",
                          }
                    }
                  />
                </label>
                <label
                  hidden={isProfileOpen ? "" : "hidden"}
                  style={
                    profile
                      ? {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                          marginLeft: "65px",
                        }
                      : {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#9B9B9B",
                          marginLeft: "65px",
                        }
                  }
                  onClick={() => setContent("profile")}
                >
                  Store profile
                </label>

                <label
                  style={
                    isProductOpen
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
                  onClick={() => setOpen("product")}
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
                  Product
                  <FontAwesomeIcon
                    icon={isProductOpen ? faAngleUp : faAngleDown}
                    style={
                      isProductOpen
                        ? {
                            height: "18px",
                            margin: "10px 10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "black",
                            width: "163px",
                          }
                        : {
                            height: "18px",
                            margin: "10px 10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#9B9B9B",
                            width: "163px",
                          }
                    }
                  />
                </label>
                <label
                  hidden={isProductOpen ? "" : "hidden"}
                  style={
                    product
                      ? {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                          marginLeft: "65px",
                        }
                      : {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#9B9B9B",
                          marginLeft: "65px",
                        }
                  }
                  onClick={() => setContent("product")}
                >
                  My product
                </label>
                <label
                  hidden={isProductOpen ? "" : "hidden"}
                  style={
                    addProduct
                      ? {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                          marginLeft: "65px",
                        }
                      : {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#9B9B9B",
                          marginLeft: "65px",
                        }
                  }
                  onClick={() => setContent("add product")}
                >
                  Selling products
                </label>

                <label
                  style={
                    isOrderOpen
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
                  onClick={() => setOpen("order")}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
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
                  Order
                  <FontAwesomeIcon
                    icon={isOrderOpen ? faAngleUp : faAngleDown}
                    style={
                      isOrderOpen
                        ? {
                            height: "18px",
                            margin: "10px 10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "black",
                            width: "195px",
                          }
                        : {
                            height: "18px",
                            margin: "10px 10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#9B9B9B",
                            width: "195px",
                          }
                    }
                  />
                </label>
                <label
                  hidden={isOrderOpen ? "" : "hidden"}
                  style={
                    order
                      ? {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                          marginLeft: "65px",
                        }
                      : {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#9B9B9B",
                          marginLeft: "65px",
                        }
                  }
                  onClick={() => setContent("order")}
                >
                  My store order
                </label>
                <label
                  hidden={isOrderOpen ? "" : "hidden"}
                  style={
                    orderCancel
                      ? {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                          marginLeft: "65px",
                        }
                      : {
                          alignItems: "center",
                          height: "40px",
                          margin: "10px 0px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#9B9B9B",
                          marginLeft: "65px",
                        }
                  }
                  onClick={() => setContent("order cancel")}
                >
                  Order cancel
                </label>
              </div>
            </div>

            {detailSeller.data.data ? (
              <EditProfileSeller hidden={profile} data={detailSeller} />
            ) : null}
                <ListProduct hidden={product} data={myProduct} />
                
            {detailSeller.isLoading ? (
              <Code />
            ) : (
              <AddProduct hidden={addProduct} detail={detailSeller} />
            )}

            <Order
              hidden={order}
              data={myOrderSeller}
              setOrder={(transId) => {
                setIdOrder(transId);
                setContent("order detail");
              }}
            />

            {myOrderSeller
              ? myOrderSeller?.data?.data?.length > 0
                ? myOrderSeller?.data?.data?.map((item, i) => {
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

            <Order hidden={orderCancel} />
          </div>
        )}
      </div>
    </>
  );
}
