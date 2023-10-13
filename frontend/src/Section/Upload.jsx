import React from "react";
import UploadBox from "../Components/UploadBox";
import TransferAnimation from "../Components/TransferAnimation";
export default function Upload() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-[30px] lg:mt-0">
      <UploadBox />
      <TransferAnimation />
    </div>
  );
}
