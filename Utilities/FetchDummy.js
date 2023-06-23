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

    const GetDataByJobId = (jobId) => {
        return data.find((item) => item.job_id === jobId);
    };

    return { data, isLoading, error, ReFetch, GetDataByJobId };
};

export default FetchDummy;
