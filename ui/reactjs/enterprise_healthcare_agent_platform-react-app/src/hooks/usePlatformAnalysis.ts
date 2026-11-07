import { useState } from "react";
import { analyzePlatform } from "../api/healthcareApi";

export const usePlatformAnalysis = () => {

    const [result, setResult] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const execute = async (payload: any) => {

        try {

            setLoading(true);
            setError(null);

            const response = await analyzePlatform(payload);

            setResult(response);

        } catch (err: any) {

            setError(
                err?.response?.data?.detail ??
                err.message
            );

        } finally {

            setLoading(false);

        }

    };

    return {
        result,
        loading,
        error,
        execute
    };
};