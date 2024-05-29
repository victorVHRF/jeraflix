import { Profile } from "../../models/profileModel"

export async function listProfilesService(userId: string) {
  const profiles = await Profile.find({ userId })
  return profiles
}
