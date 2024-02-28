import { Context } from "hono"
import { prisma } from "../data"

export const test1 = async(c:Context) =>{
    const {text} = await c.req.json()
    try{
        const result = await prisma.test.create({
            data:{
                text
            }
        })
        if(result) return c.json({msg:"success"})
    }catch(error){
        return c.json({msg:error})
    }
}

export const getAllData = async(c:Context)=>{
    const {page='1' , take='10' , filter=''} = await c.req.query()
    try{
        const takeValue = +take;
        const skip = (+page - 1) * takeValue;

        let filterObject: any = {
            OR: [{
                text: {
                    contains: filter
                }
            }]
        };

        // Check if filter is not empty and construct anagram filter
        if (filter) {
            const anagramRegex = `.*${filter.split('').sort().join('.*')}.*`;
            filterObject.OR.push({
                text: {
                    contains:anagramRegex
                }
            });
        }

        const data = await prisma.test.findMany({
            take: takeValue,
            skip,
            where: {
                AND: [filterObject]
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        const totalData = await prisma.test.count();
        const totalPages = Math.ceil(totalData / takeValue);

        return c.json({
            data,
            pagination: {
                page: +page,
                totalPages
            }
        });
    }catch(error){
        return c.json({msg:error})
    }
}

//get params id
export const test2 = async(c:Context) =>{ 
    const id = c.req.param('id')
    try{
        const data = await prisma.test.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(data) return c.json(data)
    }catch(error){
        return c.json({msg:error})
    }
    return c.json({msg:id})
}


export const test3 = async(c:Context) =>{
    const id = c.req.param('id')
    const { text } = await c.req.json()
    try{
         const result = await prisma.test.update({
            where:{
                id:Number(id)
            },
            data:{
                text
            }
         })
         if(result) return c.json({msg:"success"})
    }catch(error){
        return c.json({msg:error})
    }
}

export const test4 = async (c:Context)=>{
     const id = c.req.param('id')
     try{
        const result = await prisma.test.delete({
            where:{
                id:Number(id)
            }
        })
        if(result) return c.json({msg:"success"})
     }catch(error){
        return c.json({msg:error})
     }
}

export const createUser = async (c:Context) =>{
    const {name , email ,password} = await c.req.json()
    try{
        const result = await prisma.user.create({
            data:{
                name,
                email,
                password
            }
        })
        if(result) return c.json({msg:"success"})
    }catch(error){
        return c.json({msg:error})
    }
}