import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { CheckIn } from "@prisma/client"
import dayjs from "dayjs"
import { LateCheckInValidateError } from "./errors/late-check-in-validate-error"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface ValidateCheckInUseCaseRequest{
   checkInId: string
}
interface ValidateCheckInUseCaseResponse {
   checkIn: CheckIn
}

export class ValidateCheckInUseCase {
   constructor(private checkInRepository: CheckInsRepository) {}

   async execute(
      {
         checkInId
      }: ValidateCheckInUseCaseRequest
   ): Promise<ValidateCheckInUseCaseResponse> {
      const checkIn = await this.checkInRepository.findById(checkInId)

      if (!checkIn) {
         throw new ResourceNotFoundError()
      }

      const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
         checkIn.created_at,
         "minutes"
      )

      if (distanceInMinutesFromCheckInCreation > 20) {
         throw new LateCheckInValidateError()
      }

      checkIn.validated_at = new Date()

      await this.checkInRepository.save(checkIn)

      return {
         checkIn,
      }
   }
}