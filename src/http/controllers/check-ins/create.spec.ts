import request from "supertest"
import {app} from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { CreateAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe("Create Check-in (e2e)", () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => {
      await app.close()   
   })
   
   it("should be able to create a check-in", async () => {
      const { token } = await CreateAndAuthenticaUser(app)

      const gym = await prisma.gym.create({
         data: {
            title: "JavaScript Gym",
            latitude: -8.8437692,
            longitude: -40.3747166,
         }
      })

      const response = await request(app.server)
         .post(`/gyms/${gym.id}/check-ins`)
         .set("Authorization", `Bearer ${token}`)
         .send({
            latitude: -8.8437692,
            longitude: -40.3747166,
         })
      
      expect(response.statusCode).toEqual(201)
   })
})