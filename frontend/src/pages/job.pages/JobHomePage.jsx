import { useState } from 'react';
import { Filter } from 'lucide-react';
import PageContainer from '../../components/job.page.component/ui/PageContainer';
import JobCard from '../../components/job.page.component/jobs/JobCard';
import SearchBar from '../../components/job.page.component/jobs/SearchBar';
import { mockJobs, searchJobs } from "../../data/jobmockData";
import Navbar from 'src/components/job.page.component/ui/Navbar';

const JobHomePage = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: '',
    location: '',
    tags: [],
  });
  
  const handleSearch = (newFilters) => {
    setIsLoading(true);
    setFilters(newFilters);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = searchJobs(newFilters);
      setJobs(results);
      setIsLoading(false);
    }, 500);
  };
  
  // Count active filters
  const activeFilterCount = 
    (filters.query ? 1 : 0) + 
    (filters.location ? 1 : 0) + 
    (filters.tags?.length || 0) + 
    (filters.jobType ? 1 : 0) + 
    (filters.isRemote !== undefined ? 1 : 0);
  
  // Clear filters
  const clearFilters = () => {
    setFilters({
      query: '',
      location: '',
      tags: [],
    });
    setJobs(mockJobs);
  };
  
  return (
    <>
    <Navbar/>
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600">Discover opportunities that match your skills and interests</p>
      </div>
      
      <SearchBar 
        onSearch={handleSearch} 
        className="mb-8"
      />
      
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-gray-600">
            <Filter className="h-5 w-5 mr-2" />
            <span>
              <strong>{jobs.length}</strong> results with 
              <strong> {activeFilterCount}</strong> active filter{activeFilterCount !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-600 text-lg">No jobs found matching your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
      )}
    </PageContainer>
    </>
  );
};

export default JobHomePage;