import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'; 
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();
export const authOptions:NextAuthOptions={

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email", },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req):Promise<any> {
                
                try{
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and Password are required");
                    }

                    const user = await prisma.user.findUnique({
                        where  :{
                            email : credentials.email,
                        }
                    })
                    
                    if(!user){
                        throw new Error("No User Found")
                    }
                    
                    const isPasswordValid =  bcrypt.compareSync(credentials.password, user.password); 
                    if(isPasswordValid){
                        return user
                    }
                    else{
                        throw new Error("Invalid Password")
                    }
                    return null
                }
                catch(error : any){
                    console.log(error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){

            if(user){
                token.id = user.id.toString();
                token.email = user.email;
                token.name = user.name;
            }
            return token
        },
        async session({ session, token } : any) {
            session.user = {
              id    : token.id,
              email : token.email,
              name  : token.name,
            };
            return session;
        }
    },
    session:{
        strategy: 'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/sign-in'
    },
};