import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PiLockKeyFill } from "react-icons/pi";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { setCredentials } from "../../context/actions/authSlice";
import axios from "../../api";
import bg from "../../assets/bg.svg";
import wave from "../../assets/wave.png";
import imgDoc from "../../assets/singleImg.png";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const [eye, setEye] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && role) {
      const getDefaultRoute = (userRole) => {
        const roleRoutes = {
          admin: "/admin",
          director: "/director",
          doctor: "/doctor",
          nurse: "/nurse",
        };
        return roleRoutes[userRole] || "/dashboard";
      };

      navigate(getDefaultRoute(role), { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const clearForm = () => {
    setLogin("");
    setPassword("");
    setEye(false);
  };

  const getDefaultRoute = (userRole) => {
    const roleRoutes = {
      director: "/director",
      doctor: "/doctor",
      reception: "/reception",
      nurse: "/nurse",
    };
    return roleRoutes[userRole] || "/dashboard";
  };

  const onFinishHandler = async (e) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      toast.warning("Login va parolni kiriting!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/admin/login", {
        login: login.trim(),
        password: password.trim(),
      });

      const { message: successMessage, innerData } = res.data;

      // Store doctor name for backward compatibility
      const doctorName = `${innerData?.admin.firstName || ""} ${innerData?.admin.lastName || ""
        }`.trim();
      localStorage.setItem("doctor", doctorName);
      localStorage.setItem("specialization", innerData?.admin.specialization);

      // Dispatch credentials to Redux store
      dispatch(
        setCredentials({
          adminFullname: doctorName,
          role: innerData?.admin.role,
          token: innerData?.token,
          workerId: innerData?.admin._id,
        })
      );

      toast.success(successMessage || "Muvaffaqiyatli tizimga kirdingiz!");

      // Clear form
      clearForm();

      // Navigate to appropriate route based on role
      const defaultRoute = getDefaultRoute(innerData?.admin.role);
      navigate(defaultRoute, { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Tizimga kirishda xatolik yuz berdi!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Loginbodylog">
      <ToastContainer />
      <img className="wave" src={wave} alt="kirish" />
      <div className="containerlog">
        <div className="imgLog">
          <img src={bg} alt="kirish" />
        </div>
        <div className="login-content">
          <form className="FormLogin" onSubmit={onFinishHandler}>
            <img src={imgDoc} alt="kirish LOGO" />
            <h2>Tizimga kirish</h2>

            <div className="input-div one">
              <div className="iconCont">
                <FaUser />
              </div>
              <div className="Inputdiv">
                <input
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Login"
                  disabled={loading}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="input-div pass">
              <div className="iconCont">
                <PiLockKeyFill />
              </div>
              <div className="Inputdiv">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={!eye ? "password" : "text"}
                  className="input"
                  placeholder="Parol"
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setEye(!eye)}
                  disabled={loading}
                  className="eye-button"
                >
                  {eye ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btnIN"
              disabled={loading || !login.trim() || !password.trim()}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Yuklanmoqda...
                </span>
              ) : (
                "Kirish"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
