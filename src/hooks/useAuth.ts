import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { subscribeToAuthState } from "../services/authService";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return subscribeToAuthState((nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, user };
}
