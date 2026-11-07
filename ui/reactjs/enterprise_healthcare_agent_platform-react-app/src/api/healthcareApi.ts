import api from "./axios";
import type {HealthcareRequest} from "../models/healthcareRequest";

export const executeHealthcare = async(payload: HealthcareRequest)=>{
  const response = await api.post("/agents/enterprise-healthcare-platform", payload);
  return response.data;
};

export const getHealthStatus = async()=>{

    const response = await api.get(
        "/agents/health"
    );

    return response.data;
};

export const getAgents = async()=>{

    const response =
        await api.get(
            "/agents/agents"
        );

    return response.data;

};

export const getAgentsInfo = async()=>{

    const response =
        await api.get(
            "/agents/info"
        );

    return response.data;

};

export const analyzePlatform = async (request: HealthcareRequest) => {
    const response = await api.post(
        "/agents/enterprise-healthcare-platform",
        request
    );

    return response.data;
};