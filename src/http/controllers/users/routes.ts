import { FastifyInstance } from "fastify"
import { authenticate } from "./authenticate"
import { profile } from "./profile"
import { register } from "./register"
import { verifyJwt } from "../../middlewares/verify-jwt"

export async function usersRoutes(app: FastifyInstance) {
   app.post("/users", register)
   app.post("/sessions", authenticate)

   /**Authenticad */
   app.get("/me", { onRequest: [verifyJwt]}, profile)
}