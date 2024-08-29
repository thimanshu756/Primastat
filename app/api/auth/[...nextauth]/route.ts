import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ||"",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ||"",
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
    },
    }),
  ],
  
callbacks: {
    async jwt({ token, account ,user}) {
    
        
      if (account) {
        console.log('Account:', account); // Debug log
        token.accessToken = account.access_token;
      }
      console.log('JWT Callback:', token); // Debug log
      return token;
    },
    async session({ session, token }) {

      if (token?.accessToken) {
        console.log('Setting session accessToken:', token.accessToken); // Debug log
        session.accessToken = token.accessToken;
        session.UID=token.sub;
      }
      return session;
    },
  },
debug: true,
});

export { handler as GET, handler as POST };