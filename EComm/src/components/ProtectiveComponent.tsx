import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const ProtectiveComponent = React.memo(({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");

    if (!stored) {
      navigate("/");
      return;
    }

    try {
      const userData = JSON.parse(stored);
      dispatch(addUser(userData));
    } catch (err) {
      console.error("Invalid auth data in localStorage", err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
});

export default ProtectiveComponent;