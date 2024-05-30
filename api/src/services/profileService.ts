import { Profile } from "../models/profileModel"

export async function createProfileService (userId: string, name: string) {
  const profiles = await Profile.find({userId})

  if(profiles.length >= 4){
    throw new Error('Máximo de perfis permitidos são 4.')
  }

  const profile = new Profile({userId, name})
  await profile.save()
  return profile
}

export async function listProfilesService(userId: string){
  const profiles = await Profile.find({userId})
  return profiles
}