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



export const useFetchStatesByCountry = (countryCode) => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", 'enc4cEFZckFhc0NLcFNIbmRITFF0bEpsZWRDOGlPYUlHejUxeXdPSA==');
    
    var requestOptions = {
     method: 'GET',
     headers: headers,
     redirect: 'follow'
    };
    


    const { data, error } = useSWR(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        async (url) => { 
            let res = await fetch(url, requestOptions).then(res => res.json())
            return res 
        },
        {
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        error
    }
}


export const useFetchCityByStatesAndCountry = (countryCode) => {
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", 'enc4cEFZckFhc0NLcFNIbmRITFF0bEpsZWRDOGlPYUlHejUxeXdPSA==');
    
    var requestOptions = {
     method: 'GET',
     headers: headers,
     redirect: 'follow'
    };
    


    const { data, error } = useSWR(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
        async (url) => { 
            let res = await fetch(url, requestOptions).then(res => res.json())
            return res 
        },
        {
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        error
    }
}
