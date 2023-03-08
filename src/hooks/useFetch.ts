import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  error: Error | null;
}

const useFetch = <T>(url: string): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      }
    };
    fetchData();
  }, [url]);

  return { data, error };
};

export default useFetch;
