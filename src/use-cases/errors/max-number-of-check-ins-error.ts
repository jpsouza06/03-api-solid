export class MaxNumberOfCheckInsError extends Error {
   constructor() {
      super("Max numbeof check-ins reached.")
   }
}