import NextAuth, { getServerSession } from "next-auth";
import { authConfig } from "./config";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

export const auth = () => getServerSession(authConfig);