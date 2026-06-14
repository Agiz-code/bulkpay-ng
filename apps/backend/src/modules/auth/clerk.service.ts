import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ClerkService {
  private readonly apiKey = process.env.CLERK_API_KEY;
  private readonly apiUrl =
    process.env.CLERK_API_URL ?? 'https://api.clerk.com';
  private readonly enabled = Boolean(this.apiKey);
  private readonly logger = new Logger(ClerkService.name);

  isEnabled(): boolean {
    return this.enabled;
  }

  async createUser(options: {
    email: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ id: string }> {
    if (!this.enabled) {
      throw new Error('Clerk API key is not configured');
    }

    const payload = {
      first_name: options.firstName,
      last_name: options.lastName,
      email_addresses: [{ email_address: options.email }],
    };

    try {
      const response = await axios.post(`${this.apiUrl}/v1/users`, payload, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.data?.id) {
        throw new Error('Clerk user creation returned no id');
      }

      return { id: response.data.id };
    } catch (error) {
      this.logger.error('Failed to create Clerk user', error as Error);
      throw error;
    }
  }
}
