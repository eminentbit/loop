import { useState, useEffect } from 'react';
import PageContainer from '../components/ui/PageContainer';
import ProfileCard from '../components/users/ProfileCard';
import { useAuth } from '../context/AuthContext';
import { getFollowingUsers } from '../data/mockData';

const FollowingPage = () => {
  const { user } = useAuth();
  const [followingUsers, setFollowingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (user) {
        const users = getFollowingUsers(user.id);
        setFollowingUsers(users);
      }
      setIsLoading(false);
    }, 500);
  }, [user]);
  
  if (!user) {
    return (
      <PageContainer title="Following">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-700">Please log in to see who you&apos;re following</h2>
        </div>
      </PageContainer>
    );
  }
  
  if (isLoading) {
    return (
      <PageContainer title="Following">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer title="Following">
      <div className="max-w-4xl mx-auto">
        {followingUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {followingUsers.map((followedUser) => (
              <ProfileCard key={followedUser.id} user={followedUser} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">You&apos;re not following anyone yet</h2>
            <p className="mt-2 text-gray-600">
              When you follow people, they&apos;ll appear here.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default FollowingPage;