import { PrismaClient } from "@prisma/client"
import { Context, Next } from "hono"

const globalForPrisma = globalThis as unknown as {
    prisma : PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export const measureTime = async (c:Context , next:Next) =>{
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(`query took ${end - start} ms`)
}