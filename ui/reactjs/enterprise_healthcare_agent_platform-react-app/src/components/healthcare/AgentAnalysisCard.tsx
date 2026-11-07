import {
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import TimerIcon from "@mui/icons-material/Timer";
import DescriptionIcon from "@mui/icons-material/Description";

//import ReactMarkdown from "react-markdown";

import ReportViewer from "../common/ReportViewer";
import { formatReport } from "../../utils/reportFormatter";

export interface AgentAnalysis {

    agent_name: string;

    summary: string;

    execution_time_seconds: number;

    confidence_score?: number;

    recommendations?: string[];

    references?: string[];

}

interface Props {

    title: string;

    data: AgentAnalysis;

}

export default function AgentAnalysisCard({

    title,

    data

}: Props) {

    if (!data) return null;

    return (

        <Card
            sx={{
                mt: 3,
                borderRadius: 3,
                boxShadow: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{ xs: 12, md: 6 }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                height: "100%"
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                gutterBottom
                            >
                                Agent
                            </Typography>

                            <Chip
                                icon={<PsychologyIcon />}
                                color="primary"
                                label={data.agent_name}
                            />

                        </Paper>

                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 6 }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                height: "100%"
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                gutterBottom
                            >
                                Execution Time
                            </Typography>

                            <Chip
                                icon={<TimerIcon />}
                                color="success"
                                label={`${data.execution_time_seconds} sec`}
                            />

                        </Paper>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Analysis
                </Typography>

                {/* 
                <Paper
                    variant="outlined"
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: "#fafafa"
                    }}
                >

                    <ReactMarkdown>

                        {data.summary}

                    </ReactMarkdown>

                </Paper>
                */}
                <ReportViewer

                    content={formatReport(data.summary)}

                />
                {

                    data.recommendations &&
                    data.recommendations.length > 0 && (

                        <>

                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Recommendations
                            </Typography>

                            <Grid
                                container
                                spacing={2}
                            >

                                {

                                    data.recommendations.map(

                                        (item, index) => (

                                            <Grid
                                                key={index}
                                                size={{ xs: 12 }}
                                            >

                                                <Paper
                                                    variant="outlined"
                                                    sx={{
                                                        p: 2,
                                                        borderRadius: 2
                                                    }}
                                                >

                                                    <Typography>

                                                        • {item}

                                                    </Typography>

                                                </Paper>

                                            </Grid>

                                        )

                                    )

                                }

                            </Grid>

                        </>

                    )

                }

                {

                    data.references &&
                    data.references.length > 0 && (

                        <>

                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                            >
                                References
                            </Typography>

                            <Grid
                                container
                                spacing={2}
                            >

                                {

                                    data.references.map(

                                        (reference, index) => (

                                            <Grid
                                                key={index}
                                                size={{ xs: 12 }}
                                            >

                                                <Paper
                                                    variant="outlined"
                                                    sx={{
                                                        p: 2,
                                                        borderRadius: 2
                                                    }}
                                                >

                                                    <Typography>

                                                        <DescriptionIcon
                                                            fontSize="small"
                                                            sx={{
                                                                mr: 1,
                                                                verticalAlign: "middle"
                                                            }}
                                                        />

                                                        {reference}

                                                    </Typography>

                                                </Paper>

                                            </Grid>

                                        )

                                    )

                                }

                            </Grid>

                        </>

                    )

                }

            </CardContent>

        </Card>

    );

}