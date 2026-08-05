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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

//import ReactMarkdown from "react-markdown";

import ReportViewer from "../common/ReportViewer";
import { formatReport } from "../../utils/reportFormatter";

interface ExecutiveSummary {

    agent_name: string;

    summary: string;

    execution_time_seconds: number;

    confidence_score?: number;

    recommendations?: string[];

}

interface Props {

    data: ExecutiveSummary;

}

export default function ExecutiveSummaryCard({

    data

}: Props) {

    if (!data) {

        return null;

    }

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
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    align="left"
                >
                    🎯 Executive Summary
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{ xs: 12, md: 4 }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                height: "100%",
                                borderRadius: 2
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                gutterBottom
                                align="left"
                            >
                                Executive Agent
                            </Typography>

                            <Chip
                                icon={<PsychologyIcon />}
                                color="primary"
                                label={data.agent_name}
                            />

                        </Paper>

                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 4 }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                height: "100%",
                                borderRadius: 2
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                gutterBottom
                                align="left"
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

                    <Grid
                        size={{ xs: 12, md: 4 }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                height: "100%",
                                borderRadius: 2
                            }}
                        >

                            <Typography
                                color="text.secondary"
                                gutterBottom
                                align="left"
                            >
                                Confidence
                            </Typography>

                            <Chip
                                icon={<CheckCircleIcon />}
                                color="info"
                                label={
                                    data.confidence_score
                                        ? `${Math.round(data.confidence_score * 100)}%`
                                        : "N/A"
                                }
                            />

                        </Paper>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                    align="left"
                >
                    Executive Assessment
                </Typography>

                <Paper
                    variant="outlined"
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: "#fafafa"
                    }}
                >
                    {/* 
                    <ReactMarkdown>

                        {data.summary}

                    </ReactMarkdown>
                    */}
                    <ReportViewer

                        //title="Executive Decision Report"

                        content={formatReport(data.summary)}
                        //{formatReport(content)}

                    />

                </Paper>

                {

                    data.recommendations &&
                    data.recommendations.length > 0 && (

                        <>

                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                                align="left"
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

            </CardContent>

        </Card>

    );

}