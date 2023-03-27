import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, describe, it, beforeEach} from "vitest"
import { CreateGymUseCase } from "./create-gym"

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe("Check-in Use Case", () => {
   beforeEach(() => {
      gymsRepository = new InMemoryGymRepository()
      sut = new CreateGymUseCase(gymsRepository)
   })
   it("should be able to check in", async () => {
      const {gym} = await sut.execute({
         title: "Gym",
         description: null,
         phone: null,
         latitude: -8.8437692,
         longitude: -40.3747166,
      })

      expect(gym.id).toEqual(expect.any(String))
   })
})