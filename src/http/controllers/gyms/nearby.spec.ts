import request from "supertest"
import {app} from "@/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { CreateAndAuthenticaUser } from "@/utils/test/create-and-authenticate-user"

describe("Nearby Gyms (e2e)", () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => {
      await app.close()   
   })
   
   it("should be able to list nearby gyms", async () => {
      const { token } = await CreateAndAuthenticaUser(app)

      await request(app.server)
         .post("/gyms")
         .set("Authorization", `Bearer ${token}`)
         .send({
            title: "JavaScript Gym",
            description: "Some Description",
            phone: "9999999",
            latitude: -18.5779679,
            longitude: -45.4514553,
         })

      await request(app.server)
         .post("/gyms")
         .set("Authorization", `Bearer ${token}`)
         .send({
            title: "TypeScript Gym",
            description: "Some Description",
            phone: "9999999",
            latitude: -8.8437692,
            longitude: -40.3747166,
         })

      const response = await request(app.server)
         .get("/gyms/nearby")
         .query({
            latitude: -18.5779679,
            longitude: -45.4514553,
         })
         .set("Authorization", `Bearer ${token}`)
         .send()
      
      expect(response.statusCode).toEqual(200)
      expect(response.body.gyms).toHaveLength(1)
      expect(response.body.gyms).toEqual([
         expect.objectContaining({
            title: "JavaScript Gym"
         })
      ])
   })
})