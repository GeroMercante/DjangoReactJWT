import React, { useEffect } from "react";
import { Footer, Navbar } from "../components/";
import { useDispatch } from "react-redux";
import { checkAuthenticated } from "../redux/actions/auth";
import { load_user } from "../redux/actions/auth";

const Layout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthenticated());
    dispatch(load_user());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
        {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
