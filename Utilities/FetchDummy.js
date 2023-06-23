import React, { useState, useEffect } from "react";

import DataUrl from "../Data/Dummy.json"
import MainData from "../Data/Data.json"

const FetchDummy = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const NewMainData = MainData.data

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
        return NewMainData.find((item) => item.job_id === jobId);
    };

    const SearchByValue = (value, NewMainData) => {
        const filteredData = NewMainData.filter((item) => {
            const itemValues = Object.values(item).map((val) =>
                val ? val.toString() : ''
            );
            return itemValues.some((itemValue) => {
                if (typeof itemValue === 'string') {
                    return itemValue.includes(value);
                }
                return false;
            });
        });
        return filteredData;
    };

    return { data, isLoading, error, ReFetch, GetDataByJobId, SearchByValue };
};

export default FetchDummy;
