import LoopLogo from "@/assets/logo-loop.jpg";
import PropTypes from "prop-types";

function Logo({ className }) {
  return (
    <div>
      <img src={LoopLogo} alt="Logo" className={`${className}`} />
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
