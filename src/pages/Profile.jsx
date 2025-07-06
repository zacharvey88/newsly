import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const UserProfile = () => {
  const { user, loginUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.username) {
      setError('User not found');
      return;
    }
    try {
      const response = await axios.patch(`https://newsly-piuq.onrender.com/api/users/${user.username}`, {
        name,
        avatar_url: avatarUrl
      });
      loginUser(response.data.user);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (err) {
      setError('Failed to update profile');
      setSuccess('');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!user?.username) {
      setError('User not found');
      return;
    }
    try {
      const response = await axios.patch(`https://newsly-piuq.onrender.com/api/users/${user.username}`, {
        password: newPassword
      });
      loginUser(response.data.user);
      setSuccess('Password updated successfully');
      setError('');
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setError('Failed to update password. Please check your current password.');
      setSuccess('');
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">
                <div className="mb-4">
                  <img
                    src={avatarUrl || require('../assets/avatar-placeholder.png')}
                    alt="User avatar"
                    className="rounded-circle mb-3"
                    style={{ 
                      width: "80px", 
                      height: "80px", 
                      objectFit: "cover", 
                      border: "3px solid #508bfc", 
                      background: "#fafafa" 
                    }}
                  />
                  <h3 className="mb-4">{user?.username}</h3>
                </div>

                <form onSubmit={handleUpdateProfile}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="profile-name"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                    />
                    <label className="form-label" htmlFor="profile-name">Full Name</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="url"
                      id="profile-avatar"
                      className="form-control form-control-lg"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="Avatar URL"
                    />
                    <label className="form-label" htmlFor="profile-avatar">Avatar URL</label>
                  </div>

                  {error && (
                    <div className="alert alert-danger mb-4">
                      <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                    </div>
                  )}
                  
                  {success && (
                    <div className="alert alert-success mb-4">
                      <i className="fa-solid fa-check me-2"></i> {success}
                    </div>
                  )}

                  <button 
                    className="btn btn-primary btn-lg btn-block w-100 mb-3" 
                    type="submit"
                    style={{ backgroundColor: "#345284", borderColor: "#345284" }}
                  >
                    Update Profile
                  </button>
                </form>

                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="btn btn-outline-secondary btn-lg btn-block w-100"
                  style={{ borderColor: "#345284", color: "#345284" }}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {isPasswordModalOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="modal-header border-0">
                <h5 className="modal-title">Reset Password</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsPasswordModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handlePasswordReset}>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="current-password"
                      className="form-control form-control-lg"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current Password"
                    />
                    <label className="form-label" htmlFor="current-password">Current Password</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="new-password"
                      className="form-control form-control-lg"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                    />
                    <label className="form-label" htmlFor="new-password">New Password</label>
                  </div>

                  {error && (
                    <div className="alert alert-danger mb-4">
                      <i className="fa-solid fa-triangle-exclamation me-2"></i> {error}
                    </div>
                  )}

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPasswordModalOpen(false)}
                      className="btn btn-outline-secondary flex-fill"
                      style={{ borderRadius: "20px" }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex-fill"
                      style={{ 
                        backgroundColor: "#345284", 
                        borderColor: "#345284",
                        borderRadius: "20px"
                      }}
                    >
                      Save New Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;