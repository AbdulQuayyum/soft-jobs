import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY, API_HOST, API_BASE_URL } from "@env"

const ApiKey = API_KEY
const ApiHost = API_HOST
const ApiUrl = API_BASE_URL

const UseFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `${ApiUrl}/${endpoint}`,
        headers: {
            "X-RapidAPI-Key": ApiKey,
            "X-RapidAPI-Host": ApiHost,
        },
        params: { ...query },
    };

    const FetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        FetchData();
    }, []);

    const ReFetch = () => {
        setIsLoading(true);
        FetchData();
    };

    return { data, isLoading, error, ReFetch };
};

export default UseFetch;
