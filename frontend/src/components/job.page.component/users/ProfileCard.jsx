import { Link } from 'react-router-dom';
import { MapPin, Link as LinkIcon, Briefcase, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';


const ProfileCard = ({ user, isFullProfile = false }) => {
  const { user: currentUser, isFollowing, followUser, unfollowUser } = useAuth();
  
  const handleFollow = () => {
    followUser(user.id);
  };
  
  const handleUnfollow = () => {
    unfollowUser(user.id);
  };
  
  const isCurrentUser = currentUser?.id === user.id;
  const following = isFollowing(user.id);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="h-16 w-16 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="ml-4 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  <Link to={`/profile/${user.id}`} className="hover:text-blue-600 transition-colors">
                    {user.name}
                  </Link>
                  {user.isEmployer && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                      Employer
                    </span>
                  )}
                </h3>
                {user.company && (
                  <div className="flex items-center mt-1 text-gray-600">
                    <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{user.company}</span>
                  </div>
                )}
              </div>
              
              {!isCurrentUser && currentUser && (
                <div>
                  {following ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleUnfollow}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={handleFollow}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              )}
              
              {isCurrentUser && (
                <Link to="/edit-profile">
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>
            
            {user.location && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                <span>{user.location}</span>
              </div>
            )}
            
            {user.website && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <LinkIcon className="h-4 w-4 mr-1 text-gray-400" />
                <a 
                  href={user.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {user.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {isFullProfile && (
          <>
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 mb-2">About</h4>
              <p className="text-gray-600">{user.bio}</p>
            </div>
            
            <div className="mt-6 flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <div>
                <span className="text-gray-900 font-medium">{user.following.length}</span>
                <span className="text-gray-500 ml-1">Following</span>
              </div>
              <div>
                <span className="text-gray-900 font-medium">{user.followers.length}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      {!isFullProfile && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <Link 
            to={`/profile/${user.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Profile
          </Link>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">{user.followers.length} followers</span>
            <span>{user.following.length} following</span>
          </div>
        </div>
      )}
    </div>
  );
};
ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isEmployer: PropTypes.bool,
    company: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    bio: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
  }).isRequired,
  isFullProfile: PropTypes.bool,
};

export default ProfileCard;