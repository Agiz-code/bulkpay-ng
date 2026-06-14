import { createClient } from '@neondatabase/neon-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NeonAuthService {
  private readonly client: any;
  private readonly enabled: boolean;

  constructor() {
    const url = process.env.NEON_AUTH_URL;
    const dataApiUrl =
      process.env.NEON_DATA_API_URL ?? process.env.NEON_AUTH_URL;

    this.enabled = Boolean(url && dataApiUrl);

    if (this.enabled) {
      this.client = createClient({
        auth: {
          url: url!,
        },
        dataApi: {
          url: dataApiUrl!,
        },
      });
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async signUp(email: string, password: string, name?: string) {
    if (!this.enabled) return null;

    const { data, error } = await this.client.auth.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async signIn(email: string, password: string) {
    if (!this.enabled) return null;

    const { data, error } = await this.client.auth.signIn.email({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  }
}
