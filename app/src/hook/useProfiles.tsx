import { Profile } from "@/types/profile.interface";
import axios from "axios";
import { useEffect, useState } from "react";

export function useProfiles(){
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Profile[]>('http://localhost:3333/profiles')
    .then(res => setProfiles(res.data))
    .catch(err => {
      console.error("Erro ao buscar os perfis:", err);
      setError("Erro ao buscar os perfis. Tente novamente mais tarde.");
    });
  }, [])

  return { profiles, error }
}