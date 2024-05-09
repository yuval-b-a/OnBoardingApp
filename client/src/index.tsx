import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider 
          domain={'staging-harmonya.us.auth0.com'} 
          clientId={'ycc8vUu8oxwxDcSS6RC5HPw5tyqXcFcX'} 
          authorizationParams={{ redirect_uri: window.location.origin }}>
        <RecoilRoot>
          <Suspense fallback={<div className='loader'>Loading...</div>}> 
            <App />
          </Suspense>
        </RecoilRoot>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);