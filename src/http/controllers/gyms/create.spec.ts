import request from "supertest"
import {app} from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { CreateAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user"

describe("Gym (e2e)", () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => {
      await app.close()   
   })
   
   it("should be able to create a gym", async () => {
      const { token } = await CreateAndAuthenticaUser(app, true)

      const response = await request(app.server)
         .post("/gyms")
         .set("Authorization", `Bearer ${token}`)
         .send({
            title: "JavaScript Gym",
            description: "Some Description",
            phone: "9999999",
            latitude: -8.8437692,
            longitude: -40.3747166,
         })
      
      expect(response.statusCode).toEqual(201)
   })
})