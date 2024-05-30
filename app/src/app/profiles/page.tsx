"use client"

import { Profile } from "@/types/profile.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createProfile, getProfiles } from "../../../services/api";

export default function Profiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfileName, setNewProfileName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  async function handleCreateProfile () {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const newProfile = await createProfile(token, newProfileName);
      setProfiles([...profiles, newProfile]);
      setNewProfileName("");
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEnterProfile = (userId: string) => {
    router.push(`/profilePage`);
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded shadow-md">
      <h2 className="text-2xl mb-6 text-center">Profiles</h2>
      {profiles.length > 0 ? (
        <ul>
          {profiles.map((profile) => (
            <li key={profile._id} className="mb-4 border-b pb-2">
              <div className="text-lg">
                {profile.name}
                <button onClick={() => handleEnterProfile(profile._id)}>Enter</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No profiles found.</p>
      )}
      <div className="mt-6">
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="New profile name"
          className="w-full border border-gray-300 p-2 rounded mb-2 text-black"
        />
        <button onClick={handleCreateProfile} className="w-full bg-blue-600 text-white p-2 rounded">
          Create Profile
        </button>
      </div>
    </div>
  );
}
