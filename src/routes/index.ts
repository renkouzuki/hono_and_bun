import { Hono } from "hono";
import { createUser, getAllData, test1, test2, test3, test4 } from "../controller";
import { existingUser } from "../middleware";

export const testing = new Hono()

testing.post("/test1",test1)
testing.get('/data',getAllData)
testing.get("/test2/:id",test2)
testing.put("/test3/:id",test3)
testing.delete('/test4/:id',test4)
testing.post('/register',existingUser,createUser)