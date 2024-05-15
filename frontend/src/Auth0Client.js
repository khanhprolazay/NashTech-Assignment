import { createAuth0Client } from '@auth0/auth0-spa-js';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, BACKEND_URL } from './config';

export const auth0Client = await createAuth0Client({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  useRefreshTokens: true,
  authorizationParams: {
    audience: BACKEND_URL,
  }
});

auth0Client.init = async function init() {
  try {
    await auth0Client.handleRedirectCallback();
    const token = await auth0Client.getTokenSilently();
    localStorage.setItem('token', token);
  } catch (error) {
    const authenticated = await auth0Client.isAuthenticated();
    if (!authenticated) {
      await auth0Client.loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      });
    }
  }
  
  // Clear params from URL
  window.history.replaceState({}, document.title, window.location.pathname);
}

