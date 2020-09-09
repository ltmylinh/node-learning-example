import React, { useState, useEffect, useCallback } from 'react';

import { server } from '../api';

interface State<TData> {
  data: TData | null;
  loading: boolean,
  error: boolean
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({ data: null, loading: false, error: false });

  const fetch = useCallback(async () => {
    setState({ data: null, loading: true, error: false });

    try {
      const { data, errors } = await server.fetch<TData>({ query });
      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      setState({ data, loading: false, error: false });
    } catch (error) {

      setState({data: null, loading: false, error: true});
      console.log(error)
    }

  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {...state, refetch: fetch};
};
