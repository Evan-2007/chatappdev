import NextAuth from "next-auth"

import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import OsuProvider from "next-auth/providers/osu";
import SpotifyProvider from "next-auth/providers/spotify";
import DiscordProvider from "next-auth/providers/discord";
import AtlassianProvider from "next-auth/providers/atlassian";
import InstagramProvider from "next-auth/providers/instagram";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../../lib/mongodb"



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      }),
    EmailProvider({
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
    // ...add more providers here
  ],
  
  adapter: MongoDBAdapter(clientPromise),

  
  
}


export default NextAuth(authOptions)