import { createAuthClient } from "better-auth/react";
import { adminClient, phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [phoneNumberClient(), adminClient()],
});

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  phoneNumber: string | null;
  phoneNumberVerified: boolean | null;
};
