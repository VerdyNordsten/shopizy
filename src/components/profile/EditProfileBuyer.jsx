/* eslint-disable indent */
import moment from "moment";
import swal from "sweetalert2";
import { toastr } from "../../utils/toastr";
import React, { useState } from "react";
import { updateUserBuyer } from "../../redux/action/users";
import defaultImg from "../../assets/images/default.png";

export default function EditProfileBuyer(props) {
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState({
    year: moment(props.data.birth).format("YYYY"),
    month: moment(props.data.birth).format("MM"),
    day: moment(props.data.birth).format("DD"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    props.setEdit();
    setLoading(true);
    if (props.data.name == "" || props.data.name == null) {
      swal
        .fire({
          title: "Error!",
          text: "Name field can't be empty",
          icon: "error",
        })
        .then(() => {
          setLoading(false);
        });
      return;
    }
    if (props.data.gender == null) {
      swal
        .fire({
          title: "Error!",
          text: "Select gender can't be empty",
          icon: "error",
        })
        .then(() => {
          setLoading(false);
        });
      return;
    }
    if (props.data.phone == "" || props.data.phone == null) {
      swal
        .fire({
          title: "Error!",
          text: "Phone field can't be empty",
          icon: "error",
        })
        .then(() => {
          setLoading(false);
        });
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("email", props.data.email);
    formData.append("gender", props.data.gender);
    formData.append("name", props.data.name);
    formData.append("phone", props.data.phone);
    formData.append("birth", moment(date).format("YYYY-MM-DD"));

    updateUserBuyer(formData)
      .then((response) => {
        console.log(response);
        swal.fire("Success", "Edit profile success", "success").then(() => {
          props.getData();
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message == "Validation Failed") {
          const error = err.response.data.error;
          error.map((e) => {
            toastr(e.msg, "error");
          });
        } else {
          const message = err.response.data.error;
          swal.fire({
            title: "Error!",
            text: message,
            icon: "error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="content" hidden={props.hidden ? "" : "hidden"}>
      <form className="edit-profile" onSubmit={(e) => onSubmit(e)}>
        <h2>My Profile</h2>
        <label
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#9B9B9B",
          }}
        >
          Manage your profile information
        </label>
        <hr
          style={{
            border: "1px solid #9B9B9B",
            height: "1px",
            backgroundColor: "#9B9B9B",
            width: "100%",
          }}
        />
        <div className="form-edit">
          <div className="form-content">
            <div className="form-input">
              <div
                style={{
                  margin: "12px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#9B9B9B",
                  marginRight: "40px",
                }}
              >
                Name
              </div>
              <input
                value={props.data.name}
                onChange={(e) =>
                  props.setData({ ...props.data, name: e.target.value })
                }
                disabled={props.edit ? "disable" : ""}
                type="text"
                placeholder="Your Name"
                style={{
                  width: "348px",
                  height: "48px",
                  border: "1px solid #9B9B9B",
                  padding: "12px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="form-input">
              <div
                style={{
                  margin: "12px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#9B9B9B",
                  marginRight: "40px",
                }}
              >
                Email
              </div>
              <input
                disabled
                type="text"
                value={props.data.email}
                placeholder="Your Email"
                style={{
                  width: "348px",
                  height: "48px",
                  border: "1px solid #9B9B9B",
                  padding: "12px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="form-input">
              <div
                style={{
                  margin: "12px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#9B9B9B",
                  marginRight: "40px",
                }}
              >
                Phone Number
              </div>
              <input
                onChange={(e) =>
                  props.setData({ ...props.data, phone: e.target.value })
                }
                disabled={props.edit ? "disable" : ""}
                type="text"
                value={props.data.phone == null ? "" : props.data.phone}
                placeholder="Your Phone Number"
                style={{
                  width: "348px",
                  height: "48px",
                  border: "1px solid #9B9B9B",
                  padding: "12px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="form-input">
              <div
                style={{
                  margin: "12px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#9B9B9B",
                  marginRight: "40px",
                }}
              >
                Gender
              </div>
              <div
                className="d-flex"
                style={{
                  width: "348px",
                  height: "48px",
                  padding: "12px",
                }}
              >
                <input
                  disabled={props.edit ? "disable" : ""}
                  checked={props.data.gender == "0" ? "checked" : ""}
                  type="radio"
                  id="male"
                  name="gender"
                  value="0"
                  style={{
                    height: "28px",
                    border: "none",
                    margin: "0px 20px",
                  }}
                  onChange={(e) =>
                    props.setData({ ...props.data, gender: e.target.value })
                  }
                />
                <label
                  htmlFor="male"
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#9B9B9B",
                    marginRight: "40px",
                    minWidth: "80px",
                  }}
                >
                  Laki-laki
                </label>
                <br></br>
                <input
                  disabled={props.edit ? "disable" : ""}
                  checked={props.data.gender == "1" ? "checked" : ""}
                  type="radio"
                  id="female"
                  name="gender"
                  value="1"
                  style={{
                    height: "28px",
                    border: "none",
                    margin: "0px 20px",
                  }}
                  onChange={(e) =>
                    props.setData({ ...props.data, gender: e.target.value })
                  }
                />
                <label
                  htmlFor="female"
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#9B9B9B",
                    marginRight: "40px",
                  }}
                >
                  perempuan
                </label>
                <br></br>
              </div>
            </div>
            <div className="form-input">
              <div
                style={{
                  minWidth: "100px",
                  margin: "12px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#9B9B9B",
                  marginRight: "40px",
                }}
              >
                Date of birth
              </div>
              <div
                id="dropdown-date"
                className="d-flex justify-content-between"
              >
                <div id="dropdown-year">
                  <select
                    className="form-select"
                    disabled={props.edit ? "disable" : ""}
                    onChange={(e) => setDate({ ...date, year: e.target.value })}
                  >
                    <option value="-1">
                      {props.data.birth
                        ? moment(props.data.birth).format("YYYY")
                        : "Year"}
                    </option>
                    <option value="1945">1945</option>
                    <option value="1946">1946</option>
                    <option value="1947">1947</option>
                    <option value="1948">1948</option>
                    <option value="1949">1949</option>
                    <option value="1950">1950</option>
                    <option value="1951">1951</option>
                    <option value="1952">1952</option>
                    <option value="1953">1953</option>
                    <option value="1954">1954</option>
                    <option value="1955">1955</option>
                    <option value="1956">1956</option>
                    <option value="1957">1957</option>
                    <option value="1958">1958</option>
                    <option value="1959">1959</option>
                    <option value="1960">1960</option>
                    <option value="1961">1961</option>
                    <option value="1962">1962</option>
                    <option value="1963">1963</option>
                    <option value="1964">1964</option>
                    <option value="1965">1965</option>
                    <option value="1966">1966</option>
                    <option value="1967">1967</option>
                    <option value="1968">1968</option>
                    <option value="1969">1969</option>
                    <option value="1970">1970</option>
                    <option value="1971">1971</option>
                    <option value="1972">1972</option>
                    <option value="1973">1973</option>
                    <option value="1974">1974</option>
                    <option value="1975">1975</option>
                    <option value="1976">1976</option>
                    <option value="1977">1977</option>
                    <option value="1978">1978</option>
                    <option value="1979">1979</option>
                    <option value="1980">1980</option>
                    <option value="1981">1981</option>
                    <option value="1982">1982</option>
                    <option value="1983">1983</option>
                    <option value="1984">1984</option>
                    <option value="1985">1985</option>
                    <option value="1986">1986</option>
                    <option value="1987">1987</option>
                    <option value="1988">1988</option>
                    <option value="1989">1989</option>
                    <option value="1990">1990</option>
                    <option value="1991">1991</option>
                    <option value="1992">1992</option>
                    <option value="1993">1993</option>
                    <option value="1994">1994</option>
                    <option value="1995">1995</option>
                    <option value="1996">1996</option>
                    <option value="1997">1997</option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
                <div id="dropdown-month">
                  <select
                    className="form-select"
                    style={{ width: "130px" }}
                    disabled={props.edit ? "disable" : ""}
                    onChange={(e) =>
                      setDate({ ...date, month: e.target.value })
                    }
                  >
                    <option value="-1">
                      {props.data.birth
                        ? moment(props.data.birth).format("MMMM")
                        : "Month"}
                    </option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                  </select>
                </div>
                <div id="dropdown-day">
                  <select
                    className="form-select"
                    disabled={props.edit ? "disable" : ""}
                    onChange={(e) => setDate({ ...date, day: e.target.value })}
                  >
                    <option value="-1">
                      {" "}
                      {props.data.birth
                        ? moment(props.data.birth).format("DD")
                        : "Day"}
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="form-image">
            <img
              src={
                props.data.photo
                  ? `https://drive.google.com/uc?export=view&id=${props.data.photo}`
                  : defaultImg
              }
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                margin: "20px",
              }}
            />
            <label
              disabled={props.edit ? "disable" : ""}
              style={{
                border: "1px solid #9B9B9B",
                height: "36",
                width: "140px",
                borderRadius: "25px",
                textAlign: "center",
                padding: "8px",
              }}
              htmlFor="files"
            >
              Select Photo
            </label>
            <input
              hidden
              type="file"
              id="files"
              onChange={(e) => setPhoto(e.target.files[0])}
              disabled={props.edit ? "disable" : ""}
            />
          </div>
        </div>
        {loading ? (
          <button
            type="submit"
            style={{
              height: "40px",
              border: "none",
              borderRadius: "25px",
              fontSize: "20px",
              backgroundColor: "#42D86C",
              color: "#FFFFFF",
              margin: "50px 5px 75px 150px",
              width: "120px",
            }}
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          </button>
        ) : (
          <button
            type="submit"
            style={{
              height: "40px",
              border: "none",
              borderRadius: "25px",
              fontSize: "20px",
              backgroundColor: "#42D86C",
              color: "#FFFFFF",
              margin: "50px 5px 75px 150px",
              width: "120px",
            }}
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
}
