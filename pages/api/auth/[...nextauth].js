import clientPromise from "@/lib/mongodb";
import { Admin } from "@/models/admin";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const isAdminEmails = async (email) => {
  return !!(await Admin.findOne({ email }));
};
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (await isAdminEmails(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export const isAdminRequest = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!(await isAdminEmails(session?.user?.email))) {
    res.status(401);
    res.end();
    throw "Not an admin";
  }
};
