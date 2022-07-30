import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
          })
          // TwitterProvider({
          //   clientId: process.env.TWITTER_ID!,
          //   clientSecret: process.env.TWITTER_SECRET!,
          // })
    ],
    secret: process.env.SECRET || "123",
}

export default NextAuth(authOptions)
