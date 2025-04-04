import LoopLogo from "@/assets/loop-logo.jpg";
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
