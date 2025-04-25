import { useState } from 'react';
import { Search, MapPin, Tag, Filter } from 'lucide-react';
import Button from '../ui/Button';
import PropTypes from 'prop-types';


const SearchBar  = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [jobType, setJobType] = useState(undefined);
  const [isRemote, setIsRemote] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      query,
      location,
      tags,
      jobType: jobType,
      isRemote
    });
  };
  
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const toggleAdvancedSearch = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
          <div className="lg:col-span-2 flex items-center relative">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Job title, keyword, or company"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="lg:col-span-2 flex items-center relative">
            <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              type="submit" 
              fullWidth
            >
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={toggleAdvancedSearch}
              className="flex-shrink-0"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {isAdvancedOpen && (
          <div className="px-4 pb-4 pt-0 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="job-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  id="job-type"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={jobType || ''}
                  onChange={(e) => setJobType(e.target.value || undefined)}
                >
                  <option value="">Any Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="remote" className="block text-sm font-medium text-gray-700 mb-1">
                  Remote Work
                </label>
                <select
                  id="remote"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={isRemote === undefined ? '' : isRemote ? 'yes' : 'no'}
                  onChange={(e) => {
                    if (e.target.value === '') setIsRemote(undefined);
                    else setIsRemote(e.target.value === 'yes');
                  }}
                >
                  <option value="">Any</option>
                  <option value="yes">Remote Only</option>
                  <option value="no">On-site Only</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Skills / Tags
                </label>
                <div className="relative flex items-center">
                  <Tag className="absolute left-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="tags"
                    placeholder="Add a skill and press Enter"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </div>
              </div>
            </div>
            
            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-800 hover:bg-blue-200"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SearchBar;