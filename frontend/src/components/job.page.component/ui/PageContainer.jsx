import PropTypes from 'prop-types';


const PageContainer= ({ 
  children, 
  title, 
  className = '' 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        {title && (
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
        )}
        {children}
      </div>
    </div>
  );
};
PageContainer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default PageContainer;