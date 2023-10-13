import React, { useState } from "react";
import MailImage from "../assets/images/mail-img.png";
import Button from "../Components/Button";
import { Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { APIBASE_URL } from "../url";
export default function MailBox() {
  const [loading, setLoading] = useState(false);
  const [receiversMail, setreceiversMail] = useState("");
  const [mailSent, setmailSent] = useState(false);
  const { id } = useParams();

  const handleMailChange = (e) => {
    setreceiversMail(e.target.value);
  };
  const handleMailClick = () => {
    setLoading(true);
    Axios.post(APIBASE_URL + `/send/${id}`, {
      receiversMail: `${receiversMail}`,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          setmailSent(true);
          setreceiversMail("");
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setmailSent(false);
  };
  return (
    <div className="bg-white p-[41px] rounded-lg max-w-[550px] space-y-4">
      <Snackbar open={mailSent} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          The Mail has been sent Successfully.
        </Alert>
      </Snackbar>
      <h1 className="font-bold text-[15px] lg:text-[30px] text-left">
        SEND THE FILE VIA EMAIL
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-[200px] lg:w-[300px]">
          <img className="w-auto" src={MailImage} alt="mailimage" />
        </div>
      </div>
      <div className="rounded-[10px] border-[2px] border-black">
        <input
          type="email"
          value={receiversMail}
          onChange={handleMailChange}
          placeholder="Enter Mail"
          className="w-full p-[10px] bg-transparent rounded-[10px]"
        />
      </div>
      <div className="flex justify-center">
        <Button functionName={handleMailClick} Name="SEND MAIL" />
      </div>
    </div>
  );
}
