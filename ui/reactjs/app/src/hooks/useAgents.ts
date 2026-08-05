import { useState } from "react";
import { getAgents } from "../api/healthcareApi";


export interface Agent {

    name:string;

    role:string;

}


export interface AgentsResponse {

    total_agents:number;

    agents:Agent[];

}



export const useAgents =()=>{


const [agents,setAgents]=
useState<AgentsResponse | null>(null);


const [loading,setLoading]=
useState(false);


const [error,setError]=
useState<string|null>(null);



const loadAgents=async()=>{


try{


setLoading(true);

setError(null);



const response =
await getAgents();



setAgents(response);



}
catch(error:any){


setError(
error?.message ||
"Unable to load agents"
);


}
finally{


setLoading(false);


}


};



return {

    agents,

    loading,

    error,

    loadAgents

};


};