
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, describe, it, beforeEach} from "vitest"
import { SearchGymsUseCase } from "./search-gyms"


let gymsRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe("Search Gyms Use Case", () => {
   beforeEach(async () => {
      gymsRepository = new InMemoryGymRepository()
      sut = new SearchGymsUseCase(gymsRepository)
   })
   it("should be able to search for gyms", async () => {
      await gymsRepository.create({
         title: "Gym1",
         description: null,
         phone: null,
         latitude: -8.8437692,
         longitude: -40.3747166,
      })

      await gymsRepository.create({
         title: "Gym2",
         description: null,
         phone: null,
         latitude: -8.8437692,
         longitude: -40.3747166,
      })

      const { gyms } = await sut.execute({
         query: "Gym1",
         page: 1
      })
      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([
         expect.objectContaining({title: "Gym1"}),
      ])
   })

   it("should be able to fetch paginated gym search", async () => {
      for (let i = 1; i <= 22; i++) {
         await gymsRepository.create({
            title: `gym-${i}`,
            description: null,
            phone: null,
            latitude: -8.8437692,
            longitude: -40.3747166,
         })
      }

      const { gyms } = await sut.execute({
         query: "gym",
         page: 2
      })
      expect(gyms).toHaveLength(2)
      expect(gyms).toEqual([
         expect.objectContaining({title: "gym-21"}),
         expect.objectContaining({title: "gym-22"})
      ])
   })
})