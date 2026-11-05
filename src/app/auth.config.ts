import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const auth: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: environment.googleClientId,
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false
};