import NextAuth from "next-auth";
declare module "next-auth" {
    interface Session {
      user: {
        id: string;  // Add this line to include the 'id' field
        email: string;
        name: string;
      };
    }
  
    interface User {
      id: string; // Ensure 'id' is part of the User object as well
      email: string;
      name: string;
    }
  }
  declare module 'next-auth/jwt' {
    interface JWT {
      id?: string;
      email: string;
      name: string;
    }
}
  