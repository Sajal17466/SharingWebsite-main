import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordImage from "../assets/images/password-img.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Snackbar, Alert } from "@mui/material";
import Axios from "axios";
import Button from "./Button";
import { APIBASE_URL } from "../url";
export default function PasswordBox() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [passwordInCorrect, setpasswordInCorrect] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setpasswordInCorrect(false);
  };
  const handlePasswordDownloadClick = () => {
    Axios.post(APIBASE_URL + `/file/${id}`, {
      password: `${passwordInput}`,
    }).then((res) => {
      if (res.data.password === "not-correct" && !res.data.passwordCorrect) {
        setpasswordInCorrect(true);
        setPasswordInput("");
      } else {
        const link = document.createElement("a");
        const url = `${APIBASE_URL}/file/${id}?password=${passwordInput}`;
        link.href = url;
        link.click();
        navigate(`/download/${id}`);
      }
    });
  };
  return (
    <div>
      <div className="bg-white p-[30px] rounded-lg space-y-1">
        <Snackbar
          open={passwordInCorrect}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            OOPs!! Incorrect Password. Please Try Again.
          </Alert>
        </Snackbar>
        <div className="font-bold text-[20px] lg:text-[30px] text-left">
          ENTER THE PASSWORD
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[200px] lg:w-[300px]">
            <img className="w-auto" src={PasswordImage} alt="passwordimage" />
          </div>
        </div>
        <div className="flex my-[10px]">
          <input
            className="rounded-l-[6px] px-[20px] text-black border-[2px] border-black py-[10px] w-full"
            placeholder="Enter your Password"
            type={passwordType}
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <div
            className="rounded-r-[6px] bg-white flex items-center border-l-0 border-[2px] border-black p-2 cursor-pointer"
            onClick={togglePassword}
          >
            {passwordType === "password" ? (
              <VisibilityOffIcon sx={{ color: "black" }} />
            ) : (
              <VisibilityIcon sx={{ color: "black" }} />
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button functionName={handlePasswordDownloadClick} Name="DOWNLOAD" />
        </div>
      </div>
    </div>
  );
}
