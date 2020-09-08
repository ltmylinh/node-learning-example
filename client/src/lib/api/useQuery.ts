import React, { useState, useEffect, useCallback } from 'react';

import { server } from '../api';

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({ data: null });

  const fetch = useCallback(async () => {
    const { data } = await server.fetch<TData>({ query });
    setState({ data });
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {...state, refetch: fetch};
};
