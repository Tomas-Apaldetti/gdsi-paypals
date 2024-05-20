import { useEffect, useState } from 'react';

export const useAPIData = (fetcher, defaultData = null, backupData = null) => {
  const [data, setData] = useState(defaultData);
  const [stale, setStale] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stale) return; // If we already have the correct information, then do not hit endpoint
    if (fetching) return; // If we are already searching for it, then do not hit endpoint

    setFetching(true);

    async function fetchInformation() {
      try {
        const response = await fetcher();
        if (!response.ok) {
          const body = await response.json();
          throw new Error(body.message);
        }

        const body = await response.json();
        // Great!, we have the information, put it in data so the user can use it
        setData(body);
        setError(null);
      } catch (e) {
        // Let the user decide if the data is still valid
        backupData && setData(backupData)
        setError(e.message);
      } finally {
        // Regardless of outcome, we did our work. Just clean up and deliver to the user
        setStale(false);
        setFetching(false);
      }
    }

    fetchInformation()
  },[stale, fetching, fetcher, backupData])

  return {
    data,
    loading: fetching,
    error,
    setStale,
  };
};
