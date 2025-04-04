import LoopLogo from "@/assets/loop-logo.jpg";
import PropTypes from "prop-types";

function Logo({ className }) {
  return (
    <div>
      <img src={LoopLogo} alt="Logo" className={`${className}`} />
      <h1 className="text-xl font-bold">Job Portal</h1>
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
