import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"
import { expect, describe, it,afterEach, beforeEach, vi} from "vitest"
import { CheckinUseCase } from "./check-in"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckinUseCase

describe("Check-in Use Case", () => {
   beforeEach(() => {
      checkInsRepository = new InMemoryCheckInsRepository()
      gymsRepository = new InMemoryGymRepository()
      sut = new CheckinUseCase(checkInsRepository, gymsRepository)

      gymsRepository.items.push({
         id: "gym-01",
         title: "JS Gym",
         description: "",
         phone: "",
         latitude: new Decimal(-18.5779679),
         longitude: new Decimal(-45.4514553)
      })

      vi.useFakeTimers()
   })

   afterEach(() => {
      vi.useRealTimers()
   })
   it("should be able to check in", async () => {
      vi.setSystemTime(new Date(2022, 0, 20, 8, 0 ,0))
      const { checkIn } = await sut.execute({
         gymId: "gym-01",
         userId: "user-01",
         userLatitude: -18.5779679,
         userLongitude: -45.4514553
      })
      expect(checkIn.gym_id).toEqual(expect.any(String))
   })
   it("should be able to check in twice in the same day", async () => {
      vi.setSystemTime(new Date(2022, 0, 20, 8, 0 ,0))

      await sut.execute({
         gymId: "gym-01",
         userId: "user-01",
         userLatitude: -18.5779679,
         userLongitude: -45.4514553
      })

      await expect(() => sut.execute({
         gymId: "gym-01",
         userId: "user-01",
         userLatitude: -18.5779679,
         userLongitude: -45.4514553
      })).rejects.toBeInstanceOf(Error)
   })
   it("should be able to check in twice but in different days", async () => {
      vi.setSystemTime(new Date(2022, 0, 20, 8, 0 ,0))

      await sut.execute({
         gymId: "gym-01",
         userId: "user-01",
         userLatitude: -18.5779679,
         userLongitude: -45.4514553
      })

      vi.setSystemTime(new Date(2022, 0, 21, 8, 0 ,0))

      const { checkIn } = await sut.execute({
         gymId: "gym-01",
         userId: "user-01",
         userLatitude: -18.5779679,
         userLongitude: -45.4514553
      })

      expect(checkIn.id).toEqual(expect.any(String))
   })
   it("should not be able to check in on distant gym", async () => {
      gymsRepository.items.push({
         id: "gym-02",
         title: "JS Gym",
         description: "",
         phone: "",
         latitude: new Decimal(-8.8437692),
         longitude: new Decimal(-40.3747166)
      })

      await expect(() => 
         sut.execute({
            gymId: "gym-02",
            userId: "user-01",
            userLatitude: -18.5779679,
            userLongitude: -45.4514553
         })).rejects.toBeInstanceOf(Error)
   })
})