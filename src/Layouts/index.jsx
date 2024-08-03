import { Navbar } from "../components/Navbar";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
