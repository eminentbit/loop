import PropTypes from 'prop-types';


const Tag = ({ 
  label, 
  onClick, 
  active = false,
  className = ''
}) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200";
  
  const interactiveClasses = onClick 
    ? "cursor-pointer hover:bg-blue-100 hover:text-blue-800" 
    : "";
  
  const colorClasses = active 
    ? "bg-blue-100 text-blue-800" 
    : "bg-gray-100 text-gray-800";
  
  return (
    <span 
      className={`${baseClasses} ${colorClasses} ${interactiveClasses} ${className}`}
      onClick={onClick}
    >
      {label}
    </span>
  );
};
Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  className: PropTypes.string,
};

export default Tag;