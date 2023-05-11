/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/auth/auth.css";
import Input from "../../components/auth/Input";
import Navigation from "../../components/auth/Navigation";
import Submit from "../../components/auth/SubmitButton";
import Title from "../../components/auth/Title";
import swal from "sweetalert2";
import { toastr } from "../../utils/toastr";
import { forgotPassword } from "../../redux/action/auth";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });
  useEffect(() => {
    document.title = "SHOPIZY - Forgot Password";
  }, []);
  const onSubmit = () => {
    if (form.email == "") {
      swal
        .fire({
          title: "Error!",
          text: "email field can't be empty",
          icon: "error",
        })
        .then(() => {
          setLoading(false);
        });
      return;
    }
    forgotPassword(form).then((res) => {
      swal
        .fire({
          title: "success",
          text: "check your email to reset password",
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
        <form className="form-input">
          <Input
            type="email"
            placeholder="Email"
            setData={(e) => setForm({ ...form, email: e.target.value })}
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
