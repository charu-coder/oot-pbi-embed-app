import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MicrosoftIcon from "@mui/icons-material/AcUnit";
import backgroundImage from "../../../assets/illustration_dashboard.png";
import "./loginScreen.scss";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Placeholder login handler - backend can be added later
  const [showSignup, setShowSignup] = useState(false); // show signup modal

  const handleCustomLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://oot-pbi-embed-backend.azurewebsites.net/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "User does not exist") {
          alert("User not found. Would you like to sign up?");
          setShowSignup(true); // show signup modal
        } else {
          alert(data.error || "Login failed");
        }
        return;
      }

      sessionStorage.setItem("auth_token", data.token);
      props.updateAuthenticateStatus(true);
      alert("Login successful");

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };



  // Simulate Power BI Service Principal Auth
  useEffect(() => {
    const fetchPowerBIAccessToken = async () => {
      try {
        // Simulated fetch call
        const token = "SERVICE_PRINCIPAL_ACCESS_TOKEN"; // Replace with real token from backend later
        // sessionStorage.setItem("access_token", token);
        // props.updateAuthenticateStatus(true);
      } catch (error) {
        console.error("Power BI Token Error:", error);
      }
    };

    if (!sessionStorage.getItem("access_token")) {
      // fetchPowerBIAccessToken();
    }
  }, [props]);

  return (
    <div className="page-container">
      <div className="img_bg" style={{ backgroundImage: `url(${backgroundImage})` }} />

      <div className="bg_content">
        <h1>Welcome to our Enhanced Analytics Hub</h1>

        {/* Manual Login Form */}
        <form className="login-form" onSubmit={handleCustomLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </form>

        {showSignup && (
          <div className="signup-modal">
            <div className="signup-box">
              <h2>Create a New Account</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  // Call your existing POST /api/usersInput here
                  fetch("https://oot-pbi-embed-backend.azurewebsites.net/api/auth/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: email.split("@")[0],
                      email,
                      passwordHash: password,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      alert("Signup successful, please log in.");
                      setShowSignup(false);
                    })
                    .catch((err) => alert("Signup failed"));
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}

        {/* Optional Microsoft Sign-in Button (if needed later) */}
        {/* <Button
          className="button"
          variant="outlined"
          startIcon={<MicrosoftIcon />}
          onClick={props.handleLogin}
        >
          Sign In with Microsoft
        </Button> */}
      </div>
    </div>
  );
};

export default LoginScreen;
