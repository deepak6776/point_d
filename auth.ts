import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SessionUserProfile, SignInCredentials } from "@/types";

declare module "next-auth" {
  interface Session {
    user: SessionUserProfile;
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, request) {
        try {
          const { email, password } = credentials as SignInCredentials;
          const { user } = await fetch(process.env.API_SIGN_IN_ENDPOINT!, {
            method: "POST",
            body: JSON.stringify({ email, password }),
          }).then(async (res) => await res.json());

          if(user) {
            return { id: user.id, ...user };
          }
          // console.log("1111111111111")
          // return null
        } catch (error) {
          console.log("222222222")
          return null
        }
        // const { email, password } = credentials as SignInCredentials;
        // const { user, error } = await fetch(process.env.API_SIGN_IN_ENDPOINT!, {
        //   method: "POST",
        //   body: JSON.stringify({ email, password }),
        // }).then(async (res) => await res.json());

        // if (error) {
        //   console.log("providers error____________________")
        //   console.log(error);
        //   return error;
        // }
        // return { id: user.id, ...user };

      }
    }),
  ],
  callbacks: {
    async jwt(params) {
      console.log("callbacks jwt____________________")
      if (params.user) {
        params.token = { ...params.token, ...params.user };
      }
      return params.token;
    },
    async session(params) {
      console.log("callbacks session_______________")
      const user = params.token as typeof params.token & SessionUserProfile;

      if (user) {
        params.session.user = {
          ...params.session.user,
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          verified: user.verified,
          role: user.role,
        };
      }
      return params.session;
    },
  },


}


export const { auth, handlers: { GET, POST } } = NextAuth(authConfig);