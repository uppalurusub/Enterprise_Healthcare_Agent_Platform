import {
    useState
} from "react";


import {
    getAgentsInfo
}
from "../api/healthcareApi";



export interface AgentsInfoResponse {

    application:string;

    version:string;

    framework:string;

    multi_agent_framework:string;

    architecture:string;

    agents:string[];

    skills:string[];

}



export const useAgentsInfo =()=>{


const [
    info,
    setInfo
]=useState<AgentsInfoResponse|null>(null);



const [
    loading,
    setLoading
]=useState(false);



const [
    error,
    setError
]=useState<string|null>(null);




const loadAgentsInfo = async()=>{


try{


setLoading(true);

setError(null);



const response =
await getAgentsInfo();



setInfo(response);



}

catch(err:any){


setError(
    err?.message ||
    "Unable to load agents information"
);


}

finally{


setLoading(false);


}


};



return {

    info,

    loading,

    error,

    loadAgentsInfo

};


};