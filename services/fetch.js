import { baseURL } from 'fetch.config';
import useSWR from 'swr';



export const usefetchCountries = () => {
    const { data, error } = useSWR(
        `${baseURL}/api/v1/country`,
        async (url) => { 
            let res = await fetch(url).then(res => res.json())
            return res 
        },
        {
            revalidateOnFocus: false,
            // revalidateOnReconnect: false,
            // revalidateIfStale: false,
            // revalidateOnMount: false
        }
    );

    return {
        data, 
        error
    }
}
