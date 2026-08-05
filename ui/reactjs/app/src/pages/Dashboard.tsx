import { useEffect } from "react";

import { usePlatformHealth } from "../hooks/usePlatformHealth";
import HealthStatusCard from "../components/healthcare/HealthStatusCard";

import AgentsCard from "../components/healthcare/AgentsCard";
import { useAgents } from "../hooks/useAgents";

import AgentsInfoCard from "../components/healthcare/AgentsInfoCard";
import { useAgentsInfo } from "../hooks/useAgentsInfo";

import PlatformAnalysisForm from "../components/healthcare/PlatformAnalysisForm";
import PlatformAnalysisDashboard from "../components/healthcare/PlatformAnalysisDashboard";

import { usePlatformAnalysis } from "../hooks/usePlatformAnalysis";


interface DashboardProps {
    selectedMenu:string;
}


export default function Dashboard({
    selectedMenu
}:DashboardProps){

/* -------------------------------
       Health
    -------------------------------- */
const {
    health,
    loading: healthLoading,
    error: healthError,
    loadHealth
    

}=usePlatformHealth();

/* -------------------------------
       Agents
    -------------------------------- */

const {

    agents,
    loading: agentsLoading,
    error: agentsError,
    loadAgents
}=useAgents();

 /* -------------------------------
       Agents Info
    -------------------------------- */
const {
    info,
    loading: infoLoading,
    error: infoError,
    loadAgentsInfo
}=useAgentsInfo();


 /* -------------------------------
       Platform Analysis
    -------------------------------- */

const {
    result,
    loading: analysisLoading,
    error: analysisError,
    execute
} = usePlatformAnalysis();


 /* -------------------------------
       Sidebar Routing
    -------------------------------- */

useEffect(() => {

        switch (selectedMenu) {

            case "health":

                loadHealth();

                break;

            case "agents":

                loadAgents();

                break;

            case "agents-info":

                loadAgentsInfo();

                break;

            default:

                break;

        }

    }, [selectedMenu]);



/* -------------------------------
       Render
    -------------------------------- */
return (

        <div
            style={{
                flex: 1,
                padding: 24
            }}
        >

            {

                selectedMenu === "dashboard"

                &&

                <>

                    <PlatformAnalysisForm

                        loading={analysisLoading}

                        onSubmit={execute}

                    />

                    <PlatformAnalysisDashboard

                        loading={analysisLoading}

                        error={analysisError}

                        response={result}

                    />

                </>

            }

            {

                selectedMenu === "health"

                &&

                <HealthStatusCard

                    data={health}

                />

            }

            {

                selectedMenu === "agents"

                &&

                <AgentsCard

                    data={agents}

                />

            }

            {

                selectedMenu === "agents-info"

                &&

                <AgentsInfoCard

                    data={info}

                />

            }

            {

                healthError &&

                <p style={{ color: "red" }}>
                    {healthError}
                </p>

            }

            {

                agentsError &&

                <p style={{ color: "red" }}>
                    {agentsError}
                </p>

            }

            {

                infoError &&

                <p style={{ color: "red" }}>
                    {infoError}
                </p>

            }

        </div>

    );

}



