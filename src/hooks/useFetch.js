import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        setErr(err);
      }
      setLoading(false);
    })();
  }, []);

  const reFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setErr(err);
    }
    setLoading(false);
  };

  return { data, loading, err, reFetch };
};

export default useFetch;
