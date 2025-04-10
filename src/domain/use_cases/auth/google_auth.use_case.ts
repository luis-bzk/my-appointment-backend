import { OAuth2Client } from 'google-auth-library';

interface GoogleAuthUseCase {
  execute(): Promise<{ url: string }>;
}

export class GoogleAuth implements GoogleAuthUseCase {
  private readonly oAuth2Client: OAuth2Client;

  constructor(oAuth2Client: OAuth2Client) {
    this.oAuth2Client = oAuth2Client;
  }

  async execute(): Promise<{ url: string }> {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ];

    const url = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: scopes,
    });

    return { url };
  }
}
