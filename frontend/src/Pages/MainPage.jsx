import React from "react";
import UploadPage from "../Section/Upload";
import DownloadSend from "../Section/DownloadSend";
import PasswordPage from "../Section/Password";
import Logo from "../assets/images/logo.png";
import {    
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function MainPage() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UploadPage />,
    },
    {
      path: "/download/:id",
      element: <DownloadSend />,
    },
    {
      path: "/password/:id",
      element: <PasswordPage />,
    }
  ]);
  return (
    <div className="fontstyle back p-[30px] min-h-screen">
      <div className="w-[150px]">
        <img src={Logo} alt="logo" />
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default MainPage;
