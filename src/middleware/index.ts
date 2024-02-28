import { Context, Next } from "hono";
import { prisma } from "../data";

export const existingUser = async(c:Context , next:Next) =>{
    const { email } = await c.req.json()
    try{
        const existing = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(existing){
            return c.json({msg:"this email already exist"})
        }
       await next()  
    }catch(error){
        return c.json({msg:error})
    }
}

export const isAdmin = async (c:Context , next:Next) =>{
    
}