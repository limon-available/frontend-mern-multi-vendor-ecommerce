import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectUser = () => {
  const { userInfo, userLoaded } = useSelector((state) => state.auth);
  // ⏳ wait until API finishes
  if (!userLoaded) {
    return <div>Loading...</div>;
  }

  // ❌ not logged in
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // ✅ logged in
  return <Outlet />;
};

export default ProtectUser;
