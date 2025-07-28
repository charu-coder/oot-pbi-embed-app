

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import backgroundImage from "../../../assets/illustration_dashboard.png"; // your actual image path
import FullPageLoader from "../FullPageLoader";

const LoginSignupPage = ({ updateAuthenticateStatus }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  
const apiUrl = process.env.REACT_APP_API_URL;

console.log("apiiii", apiUrl)
  const handleAuth = async () => {
    setLoading(true);
    const endpoint = isLogin ? `${apiUrl}/api/auth/login` : `${apiUrl}/api/auth/register`

    const payload = isLogin
      ? { email, password }
      : { username, email, passwordHash: password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Request failed" });
      } else {
        setMessage({
          type: "success",
          text: isLogin
            ? "Login successful"
            : "Signup successful, please log in",
        });
        if (isLogin) {
          sessionStorage.setItem("auth_token", data.token);
          updateAuthenticateStatus?.(true);
        } else {
          setIsLogin(true);
        }
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong" });
    }finally {
    setLoading(false);
  }
  };

  return (
    <Box display="flex" height="100vh" width="100vw"
    >
      {/* Left Image Side */}
      <Box
        width="50%"
        sx={{
          position: "relative",
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}

      />

      {/* Right Content Box */}
      <Box
        width="70%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        // ml={"25em"} // shift left by 2 spacing units (~16px)
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "80%",
            height: "70%",
            display: "flex",
            flexDirection: "row",
            padding: 0.5,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.7)",

          }
          }
        >
          {/* Welcome Message Section */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: isLogin
                ? "rgba(113, 246, 165)"  // translucent green
                : "rgba(1, 184, 217)",   // translucent blue
              padding: 3,
              borderRadius: 2,
              textAlign: "center",
              color: isLogin ? "#000000" : "#ffffff"
            }}
          >
            <Typography variant="h6" fontWeight={800}>
              {isLogin ? "Welcome back to " : "Come join our "} <br />
              Enhanced Analytics Hub!
            </Typography>
            <Typography variant="body" mt={1} >
              {isLogin
                ? "We are so happy to have you here. It's great to see you again."
                : "If you haven't already, create an account to get access to exclusive features."}
            </Typography>
          </Box>

          {/* Form Section */}
          <Box flex={1} pr={4} display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center" padding={"2em"}
          // backgroundColor="#f4f6f8"
          >
            <Typography variant="h5" fontWeight={600} mb={2}>
              {isLogin ? "Signin" : "Signup"}
            </Typography>

            {!isLogin && (
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: isLogin ? "#71f6a5" : "#0085af", color: isLogin ? "#000000" : "#ffffff" }}
              onClick={handleAuth}
            >
              {isLogin ? "Signin" : "Signup"}
            </Button>

            <Box mt={2}>
              <Typography variant="body2">
                {isLogin ? "No account yet?" : "Already have an account?"}{" "}
                <Button variant="text" onClick={() => {setIsLogin(!isLogin)
                  setMessage("")}
                }>
                  {isLogin ? "Signup" : "Signin"}
                </Button>
              </Typography>
            </Box>

            {message && (
              <Alert severity={message.type} sx={{ mt: 2 }}>
                {message.text}
              </Alert>
            )}
          </Box>


        </Paper>
      </Box>
       <FullPageLoader open={loading} message={isLogin ? "Authenticating..." : "Creating your account..."} />

    </Box>
  );
};

export default LoginSignupPage;
