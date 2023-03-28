
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, describe, it, beforeEach} from "vitest"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe("Search Gyms Use Case", () => {
   beforeEach(async () => {
      gymsRepository = new InMemoryGymRepository()
      sut = new FetchNearbyGymsUseCase(gymsRepository)
   })
   it("should be able to fetch nearby gyms", async () => {
      await gymsRepository.create({
         title: "Near Gym",
         description: null,
         phone: null,
         latitude: -18.5779679,
         longitude: -45.4514553,
      })

      await gymsRepository.create({
         title: "Far Gym",
         description: null,
         phone: null,
         latitude: -8.8437692,
         longitude: -40.3747166,
      })

      const { gyms } = await sut.execute({
         userLatitude: -18.5779679,
         userLongitude: -45.4514553
      })
      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([
         expect.objectContaining({title: "Near Gym"}),
      ])
   })
})