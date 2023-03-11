import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import { client } from '../client';
import { gapi } from 'gapi-script';

const Login = () => {
  //function for google response
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  /*error: 'idpiframe_initialization_failed', details: 'You have created a new client application that use
  …i/web/guides/gis-migration) for more information.'} details: "You have created a new client application 
  that uses libraries for user authentication or authorization that will soon be deprecated. New clients must
  use the new libraries instead; existing clients must also migrate before these libraries are deprecated.
  See the Migration Guide for more information." error: "idpiframe_initialization_failed"
  
  Reference soluiton: https://stackoverflow.com/questions/72192576/i-got-this-issue-when-i-am-trying-to-run-this-code-gapi-auth2-getauthinstance
  */

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: import.meta.env.VITE_APP_GOOGLE_API_TOKEN,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    //Html code.
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video.mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
          <div className="p-5">
            <img
              src={logo}
              alt="logo.png"
              className="drop-shadow-md"
              width="130px"
            />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={import.meta.env.VITE_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-line"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
