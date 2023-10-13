import React, { useState } from "react";
import Button from "../Components/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { APIBASE_URL } from "../url";
export default function DownloadBox(downloadProps) {
  const [loading, setLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleDownloadClick = () => {
    setLoading(true);
    Axios.post(APIBASE_URL + `/file/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.password) {
          navigate(`/password/${id}`);
        } else {
          const link = document.createElement("a");
          const url = `${APIBASE_URL}/file/${id}`;
          link.href = url;
          link.click();
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLinkCopied(false);
  };
  return (
    <div className="bg-white p-[41px] rounded-lg max-w-[550px] space-y-4">
      <h1 className="font-bold text-[15px] lg:text-[30px] text-left">
        YOUR FILE HAS BEEN UPLOADED
      </h1>
      <div className="flex flex-col items-center justify-center">
        <img
          className="border-[2px] border-black w-[200px] lg:w-[240px]"
          src={`http://api.qrserver.com/v1/create-qr-code/?data=${downloadProps.fileLink}&color=040238`}
          alt="qrimage"
        />
        <span>Scan QR to get Link</span>
      </div>
      <Snackbar open={linkCopied} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Link Copied Successfully.
        </Alert>
      </Snackbar>
      <div className="flex flex-grow items-center justify-between border-[1px] rounded-lg border-black p-[10px]">
        <a
          className="cursor-pointer text-[#093f92] overflow-hidden text-black"
          onClick={handleDownloadClick}
        >
          {downloadProps.fileLink}
        </a>
        <div className="cursor-pointer">
          <ContentCopyIcon
            onClick={() => {
              navigator.clipboard.writeText(downloadProps.fileLink);
              setLinkCopied(true);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button functionName={handleDownloadClick} Name="DOWNLOAD" />
      </div>
    </div>
  );
}
