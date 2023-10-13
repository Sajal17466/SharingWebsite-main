import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "./Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { APIBASE_URL } from "../url";
export default function UploadBox() {
  const [uploadfile, setuploadFile] = useState(null);
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
  const navigate = useNavigate();
  const handleClick = () => {
    let formData = new FormData();
    formData.append("file", uploadfile);
    formData.append("password", passwordInput);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    Axios.post(APIBASE_URL + "/upload", formData, config)
      .then((response) => {
        console.log("This is the post request resoponse data", response.data);
        navigate(`/download/${response.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (file) => {
    console.log(file.target.files[0]);
    setuploadFile(file.target.files[0]);
  };

  return (
    <div className="p-[20px] text-center">
      <div className="bg-white p-[40px] rounded-lg">
        <h1 className="font-bold lg:text-[30px] text-[20px] text-left p-[10px] border-l-4 border-black">
          SHARE FILES WITH SAFETY
        </h1>
        <div className="mt-[30px]">
          <input
            className="border-[2px] border-black w-full p-[10px] rounded-[6px]"
            type="file"
            onChange={handleChange}
          />
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
        <div>
          <Button functionName={handleClick} Name="Get Link" />
        </div>
      </div>
    </div>
  );
}
