import {
    Alert,
    Box,
    CircularProgress,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import MetadataCard from "./MetadataCard";
import ExecutiveSummaryCard from "./ExecutiveSummaryCard";
import AgentAnalysisCard from "./AgentAnalysisCard";
import HumanReviewCard from "./HumanReviewCard";

export interface PlatformAnalysisResponse {

    status?: string;

    message?: string;

    metadata?: any;

    executive_summary?: any;

    clinical_analysis?: any;

    financial_analysis?: any;

    research_summary?: any;

    compliance_review?: any;

    human_review?: any;

}

interface Props {

    loading?: boolean;

    error?: string | null;

    response?: PlatformAnalysisResponse | null;

}

export default function PlatformAnalysisDashboard({

    loading = false,

    error = null,

    response

}: Props) {

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 8
                }}
            >

                <Stack
                    spacing={2}
                    alignItems="center"
                >

                    <CircularProgress />

                    <Typography>

                        Running Enterprise Healthcare Analysis...

                    </Typography>

                </Stack>

            </Box>

        );

    }

    if (error) {

        return (

            <Alert
                severity="error"
                sx={{ mt: 3 }}
            >

                {error}

            </Alert>

        );

    }

    if (!response) {

        return (

            <Alert
                severity="info"
                sx={{ mt: 3 }}
            >

                Submit a patient case to begin the Enterprise Healthcare Analysis.

            </Alert>

        );

    }

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                align="left"
            >

                🏥 Enterprise Healthcare Platform Analysis

            </Typography>

            <Typography
                color="text.secondary"
                align="left"
                sx={{ mb: 3 }}
            >

                Comprehensive multi-agent healthcare analysis dashboard

            </Typography>

            <Divider sx={{ mb: 3 }} />

            {

                response.metadata &&

                <MetadataCard
                    data={response.metadata}
                />

            }

            {

                response.executive_summary &&

                <ExecutiveSummaryCard
                    data={response.executive_summary}
                />

            }

            {

                response.clinical_analysis &&

                <AgentAnalysisCard
                    title="🩺 Clinical Analysis"
                    data={response.clinical_analysis}
                />

            }

            {

                response.financial_analysis &&

                <AgentAnalysisCard
                    title="💰 Financial Analysis"
                    data={response.financial_analysis}
                />

            }

            {

                response.research_summary &&

                <AgentAnalysisCard
                    title="🔬 Research Summary"
                    data={response.research_summary}
                />

            }

            {

                response.compliance_review &&

                <AgentAnalysisCard
                    title="⚖️ Compliance Review"
                    data={response.compliance_review}
                />

            }

            {

                response.human_review &&

                <HumanReviewCard
                    data={response.human_review}
                />

            }

        </Box>

    );

}