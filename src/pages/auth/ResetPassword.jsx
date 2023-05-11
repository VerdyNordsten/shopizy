/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/auth/auth.css";
import Input from "../../components/auth/Input";
import Navigation from "../../components/auth/Navigation";
import Submit from "../../components/auth/SubmitButton";
import Title from "../../components/auth/Title";
import swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/action/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();

  useEffect(() => {
    document.title = "SHOPIZY - Confirm Password";
  }, []);

	const onSubmit = () => {
	      if (form.password == "") {
          swal
            .fire({
              title: "Error!",
              text: "Password field can't be empty",
              icon: "error",
            })
            .then(() => {
              setLoading(false);
            });
          return;
        }
    if (form.password != form.confirmPassword) {
      swal
        .fire({
          title: "Ooops!",
          text: "Password and Confirm password are different",
          icon: "warning",
        })
        .then(() => {
          setLoading(false);
        });
      return;
    }
    resetPassword(token, form).then(() => {
      swal
        .fire({
          title: "success",
          text: "Now you can login",
          icon: "success",
        })
        .then(() => {
          navigate("/login");
        });
    });
  };

  return (
    <section className="auth">
      <div className="content">
        <Title caption="Reset password" />
        <p style={{ color: "#32C33B", fontWeight: "500" }}>
          You need to change your password to activate your account
        </p>
        <form className="form-input">
          <Input
            type="password"
            placeholder="Password"
            setData={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirmation New Password"
            setData={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </form>
        <Link to="/forgot" className="forgot">
          Forgot password?
        </Link>
        <Submit onSubmit={onSubmit} caption="Reset" />
        <Navigation
          caption="Don't have a Tokopedia account?"
          to="/register"
          toCaption="Register"
        />
      </div>
    </section>
  );
}
