  import NextAuth from "next-auth"

  import GithubProvider from "next-auth/providers/github"
  import EmailProvider from "next-auth/providers/email";
  import GoogleProvider from "next-auth/providers/google";
  import OsuProvider from "next-auth/providers/osu";
  import SpotifyProvider from "next-auth/providers/spotify";
  import DiscordProvider from "next-auth/providers/discord";
  import AtlassianProvider from "next-auth/providers/atlassian";
  import InstagramProvider from "next-auth/providers/instagram";
  import CredentialProvider from "next-auth/providers/credentials";

  import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
  import clientPromise from "../../../../lib/mongodb"



  export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        name: "GitHub (recommended)",
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),

        DiscordProvider({
          name: "Discord (recommended)",
          clientId: process.env.DISCORD_CLIENT_ID,
          clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
      EmailProvider({
        name: "Email (usernames and profile pictures are complety broken right now but work using github and discord)",
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_FROM
      }),
      CredentialProvider({
        name: "credentials (This dose not work at the moment)",
        credentials: {
          username: {
            label: "Email",
            type: "text",
            placeholder: "johndoe@test.com",
          },
          password: { label: "Password", type: "password" },
        },
        authorize: (credentials) => {
          // database look up
          if (
            credentials.username === "john" &&
            credentials.password === "test"
          ) {
            return {
              id: 2,
              name: "John",
              email: "johndoe@test.com",
            };
          }

          // login failed
          return null;
        },
      }),
      
      // ...add more providers here
    ],
    
    adapter: MongoDBAdapter(clientPromise),

    
    
  }


  export default NextAuth(authOptions)