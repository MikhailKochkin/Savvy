import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      //   clientId: process.env.GOOGLE_ID,
      //   clientSecret: process.env.GOOGLE_SECRET,
      clientId:
        "932923887873-kfm5r8hjj29ofrprsikf5u0qmkn1amln.apps.googleusercontent.com",
      clientSecret: "9rUS63PoDbJG06JruMSeEaiF",
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    Providers.Yandex({
      clientId: "4a7754e1f9e348d7971cfe6ffdabb7b3",
      clientSecret: "c4898d9ac29649db9d7d2e0fd29264a4",
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
});
