import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../components/ui/PageContainer';
import ProfileCard from '../components/users/ProfileCard';
import JobCard from '../components/jobs/JobCard';
import { getUserById, getJobsByEmployerId } from '../../data/jobmockData';

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (userId) {
        const foundUser = getUserById(userId);
        if (foundUser) {
          setUser(foundUser);
          
          // If user is an employer, get their jobs
          if (foundUser.isEmployer) {
            const userJobs = getJobsByEmployerId(userId);
            setJobs(userJobs);
          }
        }
      }
      setIsLoading(false);
    }, 500);
  }, [userId]);
  
  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageContainer>
    );
  }
  
  if (!user) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700">User not found</h2>
          <p className="mt-2 text-gray-600">The user you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <ProfileCard user={user} isFullProfile={true} />
        
        {user.isEmployer && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {jobs.length > 0 ? 'Posted Jobs' : 'No Jobs Posted Yet'}
            </h2>
            
            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">This employer hasn&apos;t posted any jobs yet.</p>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ProfilePage;