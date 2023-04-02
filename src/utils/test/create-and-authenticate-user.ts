import { FastifyInstance } from "fastify"
import request from "supertest"

export async function CreateAndAuthenticaUser(app: FastifyInstance) {
   await request(app.server)
      .post("/users")
      .send({
         name: "Jokn Doe",
         email: "johndoe@example.com",
         password: "123456",
      })

   const authResponse = await request(app.server)
      .post("/sessions")
      .send({
         email: "johndoe@example.com",
         password: "123456",
      })

   const { token } = authResponse.body

   return {
      token,
   }
}