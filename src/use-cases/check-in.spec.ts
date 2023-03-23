import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { expect, describe, it, beforeEach} from "vitest"
import { CheckinUseCase } from "./check-in"

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe("Check-in Use Case", () => {
   beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository()
      sut = new CheckinUseCase(checkInsRepository)
   })
   it("should be able to check in", async () => {
      const { checkIn } = await sut.execute({
         gymId: "gym-01",
         userId: "user-01"
      })

      expect(checkIn.gym_id).toEqual(expect.any(String))
   })
})