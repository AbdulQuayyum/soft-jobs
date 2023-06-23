import React, { useState, useEffect } from "react";

import DataUrl from "../Data/Dummy.json"

const FetchDummy = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const FetchData = async () => {
        setIsLoading(true);

        try {
            const response = DataUrl;
            setData(response.data);
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

export default FetchDummy;
