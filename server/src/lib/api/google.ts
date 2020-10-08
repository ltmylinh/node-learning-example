import { google } from 'googleapis';
import { createClient } from '@google/maps';

const auth = new google.auth.OAuth2(
  process.env.G_CLIENT_ID,
  process.env.G_CLIENT_SECRET,
  `${process.env.PUBLIC_URL}/login`
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const maps = createClient({ key: `${process.env.G_GEOCODE_KEY}`, Promise });

export const Google = {
  authUrl: auth.generateAuthUrl({
    access_type: 'online',
    scope: scopes,
  }),
  logIn: async (code: string) => {
    //using code to make a request to Google to get user's access token
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);

    const { data } = await google.people({ version: 'v1', auth }).people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    });

    return { user: data };
  },
};
