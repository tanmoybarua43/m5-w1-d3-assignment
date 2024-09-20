import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onLogin }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [isFbAuthenticated, setIsFbAuthenticated] = useState(false); // Track if FB auth is done
  const [isFbSdkLoaded, setIsFbSdkLoaded] = useState(false); // Track Facebook SDK loading
  const navigate = useNavigate();

  // Initialize Facebook SDK when the component is mounted
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '3486751121469402', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v13.0'
      });
      setIsFbSdkLoaded(true); // Set SDK loaded to true once initialized
    };

    // Inject Facebook SDK script into the page
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  // Handle Normal Login
  const handleNormalLogin = () => {
    if (user.name && user.email) {
      alert(`Logged in with Name: ${user.name}, Email: ${user.email}`);
      onLogin(user); // Call the login function from props
      navigate('/checkout'); // Redirect to checkout after login
    } else {
      alert('Please fill in both fields.');
    }
  };

  // Handle Facebook OAuth Login
  const handleFBLogin = () => {
    if (!isFbSdkLoaded) {
      alert('Facebook SDK not loaded yet. Please try again later.');
      return;
    }

    window.FB.login(function (response) {
      if (response.authResponse) {
        // Facebook OAuth is successful, but now we need to get user credentials
        alert('Facebook authentication successful. Please enter your credentials to complete the login.');
        setIsFbAuthenticated(true); // Set that FB auth is done, but user must input credentials manually
      } else {
        alert('Facebook login failed.');
      }
    }, { scope: 'public_profile,email' });
  };

  // Handle input changes for the manual login form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <p>Please login using one of the following:</p>

        {/* Show form for manual input after Facebook authentication */}
        {isFbAuthenticated ? (
          <div className="login-form">
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Your Email"
              />
            </div>
            <button className="login-btn" onClick={handleNormalLogin}>
              Complete Login
            </button>
          </div>
        ) : (
          // Show normal login and Facebook login options before Facebook authentication
          <>
            <div className="login-form">
              <div className="input-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                />
              </div>
              <button className="login-btn" onClick={handleNormalLogin}>
                Login
              </button>
            </div>

            {/* Facebook Login Button */}
            <button className="fb-login-btn" onClick={handleFBLogin} disabled={!isFbSdkLoaded}>
              <i className="fab fa-facebook"></i> Login with Facebook
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
