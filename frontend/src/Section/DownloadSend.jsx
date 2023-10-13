import React, { useEffect, useState } from "react";
import DownloadBox from "../Components/DownloadBox";
import MailBox from "../Components/MailBox";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { APIBASE_URL } from "../url";
export default function DownloadSend() {
  const { id } = useParams();
  const [fileLink, setfileLink] = useState("");
  useEffect(() => {
    Axios.get(APIBASE_URL + `/upload/${id}`).then((res) => {
      setfileLink(res.data.fileLink);
    });
  }, []);
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mt-[40px] lg:mt-0">
      <DownloadBox fileLink={fileLink} />
      <MailBox />
    </div>
  );
}
