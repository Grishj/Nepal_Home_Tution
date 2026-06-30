import { useCallback, useEffect, useState } from "react";
import { getVacancies } from "../services/googleSheets";
import type { Vacancy } from "../types/vacancy";

interface UseVacanciesResult {
  vacancies: Vacancy[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useVacancies(): UseVacanciesResult {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacancies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getVacancies();
      setVacancies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load vacancies.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return { vacancies, loading, error, refresh: fetchVacancies };
}
