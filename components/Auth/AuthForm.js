import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Styles from "../../styles/Auth/Auth.module.css";
import { login } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { PROXY } from "../../config";
import axios from "axios";

const AuthForm = ({ loginPagename }) => {
  const router = useRouter();
  const [active, setActive] = useState("register");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const [name, setName] = useState("");
  const [confirmOTP, setConfirmOTP] = useState("");

  const handleLogIn = () => {
    if (!mobile || !password) {
      alert("Invalid mobile or password");
      return;
    }
    axios
      .post(`${PROXY}/users/login`, {
        mobile,
        password,
        role: "Admin",
      })
      .then((res) => {
        if (res.data.success) {
          // console.log("stuff", res.data);
          const role =
            res.data.data.role === "Vendor" || loginPagename === "vendor"
              ? "Vendor"
              : "User";

          localStorage.setItem("wedcell", JSON.stringify(res.data));
          localStorage.setItem("role", JSON.stringify({ role: role }));

          if (res.data.data.role === "Vendor" && loginPagename === "vendor") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
          location.reload(true);
        } else {
          alert(res.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const SendOTp = async () => {
    if (mobile.length < 10 || mobile.length > 10) {
      alert("Please enter a valid mobile number");
      return;
    }

    axios
      .post(`${PROXY}/users/sendotp`, {
        mobile,
      })
      .then((res) => {
        setOtpScreen(true);
        setConfirmOTP(res.data.otp);
      })
      .catch((e) => console.log("Someting Went Wrong", e));
  };

  const VerifyOTP = async () => {
    if (!name.length) return;
    if (!password.length) return;
    if (!otp.length) return;

    if (otp === confirmOTP) {
      axios
        .post(`${PROXY}/users/create/account`, {
          mobile,
          name,
          password,
          role: loginPagename === "vendor" ? "Vendor" : "User",
        })
        .then((res) => {
          if (res.data.success) {
            // localStorage.setItem("wedcell", JSON.stringify(res.data))
            // router.push('/dashboard')
            // console.log(res.data.data);
            alert("Registration success");
          } else {
            alert(res.data.message);
          }
        })
        .catch((e) => {
          alert("Phone Already Registered");
          console.log(e);
        });
      console.log("Verified");
    } else {
      alert("OTP is not correct");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("wedcell");
    const role = localStorage.getItem("role");

    if (auth) {
      if (!role) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, []);

  return (
    <div className={Styles.form_container}>
      <div className="tab-container d-flex align-items-center">
        <span
          className={
            active === "register"
              ? "cursor-pointer primary-text  fs-5 w-50 text-center py-3"
              : "cursor-pointer fs-5 w-50 text-center py-3"
          }
          style={{
            backgroundColor:
              active == "register" ? "transparent" : "rgba(0,0,0,0.10)",
          }}
          onClick={() => setActive("register")}
        >
          Register
        </span>
        <span
          className={
            active === "login"
              ? "cursor-pointer primary-text  fs-5 w-50 text-center py-3"
              : "cursor-pointer fs-5 w-50 text-center py-3"
          }
          onClick={() => setActive("login")}
          style={{
            backgroundColor:
              active == "login" ? "transparent" : "rgba(0,0,0,0.10)",
          }}
        >
          Login
        </span>
      </div>
      {active === "register" && (
        <div className="register-form-container mt-4 px-4">
          <div className="form-title">
            <h5>
              {loginPagename === "vendor"
                ? "Business Register"
                : "Customer Register"}
            </h5>
          </div>
          <div className="input-field mb-3">
            <label className="form-label text-gray">
              {loginPagename === "vendor"
                ? "Join wedcell get your business listed or to claim your listing for FREE!"
                : "Join wedcell to get your vendor for your wedding"}
            </label>
            <input
              type="text"
              placeholder="Mobile"
              className="form-control py-3"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {otpScreen && (
              <>
                <input
                  type="text"
                  placeholder="OTP"
                  className="form-control py-3"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control py-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="form-control py-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
          </div>
          <button
            className="primary-btn"
            onClick={!otpScreen ? SendOTp : VerifyOTP}
          >
            {!otpScreen ? "Sign Up" : "Submit"}
          </button>
          {/* <button className="primary-btn" onClick={loginPagename === 'vendor' ? (!otpScreen ? SendOTp : VerifyOTP) : router.push('/user-dashboard')}>Submit</button> */}
          <div className="form-footer mt-4 d-flex align-item-center justify-content-between">
            <span className="text-gray">
              Have you subscribed?
              <span
                className="primary-text ms-2 cursor-pointer"
                onClick={() => setActive("login")}
              >
                Login
              </span>
            </span>
            <span
              className="text-gray cursor-pointer"
              onClick={() => router.push("/forgotPassword")}
            >
              Forgot password?
            </span>
          </div>
        </div>
      )}

      {active === "login" && (
        <div className="register-form-container mt-4 px-4">
          <div className="form-title">
            <h5>
              {loginPagename === "vendor"
                ? "Welcom Back Vendor"
                : "Customer Login"}
            </h5>
          </div>
          <div className="input-field mb-3">
            <label className="form-label text-gray">
              {loginPagename === "vendor"
                ? "Join wedcell get your business listed or to claim your listing for FREE!"
                : "Join wedcell to get your vendor for your wedding"}
            </label>
            <input
              type="text"
              placeholder="Enter Mobile"
              className="form-control py-3"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="input-field mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="primary-btn" onClick={handleLogIn}>
            Submit
          </button>
          <div className="form-footer mt-4 d-flex align-item-center justify-content-between flex-wrap">
            <span className="text-gray">
              Are you new couple?
              <span
                className="primary-text ms-2 cursor-pointer"
                onClick={() => {
                  setActive("register");
                }}
              >
                Create a New Account
              </span>
            </span>
            <span
              className="text-gray cursor-pointer"
              onClick={() => router.push("/forgotPassword")}
            >
              Forgot password?
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
