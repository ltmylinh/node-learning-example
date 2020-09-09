import React, { useState, useEffect, useCallback } from 'react';

import { server } from '../api';

interface State<TData> {
  data: TData | null;
  loading: boolean
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({ data: null, loading: false });

  const fetch = useCallback(async () => {
    setState({data: null, loading: true});
    const { data } = await server.fetch<TData>({ query });
    setState({ data, loading: false });
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {...state, refetch: fetch};
};
