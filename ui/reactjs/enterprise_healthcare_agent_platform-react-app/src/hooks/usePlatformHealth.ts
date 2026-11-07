import { useState } from "react";
import { getHealthStatus } from "../api/healthcareApi";


export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}


export const usePlatformHealth = () => {

  const [health, setHealth] = useState<HealthResponse | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);


  const loadHealth = async () => {

    try {

      setLoading(true);
      setError(null);


      const response: HealthResponse =
        await getHealthStatus();


      setHealth(response);


    } catch (err:any) {

      setError(
        err?.response?.data?.detail ||
        "Unable to fetch platform health status"
      );


    } finally {

      setLoading(false);

    }

  };


  return {
    health,
    loading,
    error,
    loadHealth
  };

};