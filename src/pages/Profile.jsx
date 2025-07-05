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
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card" style={{ maxWidth: 420, width: '100%', margin: '2rem 0', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <div className="card-header text-center" style={{ background: 'none', borderBottom: 'none', paddingTop: '2rem' }}>
          <img
            src={avatarUrl || require('../assets/avatar-placeholder.png')}
            alt="User avatar"
            className="rounded-circle nav-user-avatar mb-3"
            style={{ objectFit: 'cover', border: '2px solid #eee', background: '#fafafa' }}
          />
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, Times New Roman, serif', fontWeight: 700, fontSize: '1.7rem' }}>{user?.username}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdateProfile} className="login-form" style={{ gap: 10 }}>
            <div style={{ width: '100%' }}>
              <label className="small" htmlFor="profile-name">Name</label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                style={{ width: '100%', marginBottom: 10, borderRadius: 5, border: '1px solid #ccc', padding: '8px' }}
              />
            </div>
            <div style={{ width: '100%' }}>
              <label className="small" htmlFor="profile-avatar">Avatar URL</label>
              <input
                id="profile-avatar"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="form-control"
                style={{ width: '100%', marginBottom: 10, borderRadius: 5, border: '1px solid #ccc', padding: '8px' }}
              />
            </div>
            {error && <p className="warning" style={{ margin: 0 }}>{error}</p>}
            {success && <p className="text-success" style={{ color: '#198754', margin: 0 }}>{success}</p>}
            <input
              type="submit"
              value="Update Profile"
              className="login-btn"
              style={{ width: '100%', marginTop: 10 }}
            />
          </form>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="btn btn-comment"
            style={{ width: '100%', background: '#345284', color: 'white', marginTop: 20, borderRadius: 20, border: 'none' }}
          >
            Reset Password
          </button>
        </div>
        {isPasswordModalOpen && (
          <div className="fixed-top d-flex justify-content-center align-items-center" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="card" style={{ maxWidth: 350, width: '100%', padding: 24, borderRadius: 10 }}>
              <h3 className="mb-3" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Reset Password</h3>
              <form onSubmit={handlePasswordReset} className="login-form" style={{ gap: 10 }}>
                <div style={{ width: '100%' }}>
                  <label className="small" htmlFor="current-password">Current Password</label>
                  <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="form-control"
                    style={{ width: '100%', marginBottom: 10, borderRadius: 5, border: '1px solid #ccc', padding: '8px' }}
                  />
                </div>
                <div style={{ width: '100%' }}>
                  <label className="small" htmlFor="new-password">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    style={{ width: '100%', marginBottom: 10, borderRadius: 5, border: '1px solid #ccc', padding: '8px' }}
                  />
                </div>
                <div className="d-flex justify-content-end" style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="btn"
                    style={{ background: '#eee', borderRadius: 20, padding: '6px 18px', border: 'none' }}
                  >
                    Cancel
                  </button>
                  <input
                    type="submit"
                    value="Save New Password"
                    className="login-btn"
                    style={{ background: '#345284', color: 'white', borderRadius: 20, border: 'none', padding: '6px 18px' }}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;