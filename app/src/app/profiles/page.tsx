"use client"

import { Profile } from "@/types/profile.interface";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfiles } from "../../../services/api";

export default function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  // const {profiles, error} = useProfiles()
  // const [profiles, setProfiles] = useState<ProfilesProps[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const profilesData = await getProfiles(token);
        setProfiles(profilesData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
        router.push('/login');
      }
    };

    fetchProfiles();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 rounded shadow-md">
      <h2 className="text-2xl mb-6 text-center">Profiles</h2>
      {profiles.length > 0 ? (
        <ul>
          {profiles.map((profile) => (
            <li key={profile._id} className="mb-4 border-b pb-2">
              <div className="text-lg">{profile.name}</div>
              <div className="text-sm text-gray-600">{profile.name}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No profiles found.</p>
      )}
    </div>
  )
}