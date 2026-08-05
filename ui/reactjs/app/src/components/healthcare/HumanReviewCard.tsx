import {
    Alert,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CommentIcon from "@mui/icons-material/Comment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import ReactMarkdown from "react-markdown";

export interface HumanReview {

    required?: boolean;

    status?: string;

    reviewer?: string;

    reviewed_at?: string;

    comments?: string;

    recommendations?: string[];

}

interface Props {

    data: HumanReview;

}

export default function HumanReviewCard({

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
                >
                    👨‍⚕️ Human Review
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
                                p: 3,
                                borderRadius: 3,
                                height: "100%"
                            }}
                        >

                            <Typography
                                color="text.secondary"
                            >
                                Human Review Required
                            </Typography>

                            <Chip
                                sx={{ mt: 2 }}
                                color={
                                    data.required
                                        ? "warning"
                                        : "success"
                                }
                                label={
                                    data.required
                                        ? "Required"
                                        : "Not Required"
                                }
                            />

                        </Paper>

                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 4 }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                height: "100%"
                            }}
                        >

                            <Typography
                                color="text.secondary"
                            >
                                Review Status
                            </Typography>

                            <Chip
                                sx={{ mt: 2 }}
                                icon={<AssignmentTurnedInIcon />}
                                color={
                                    data.status === "Approved"
                                        ? "success"
                                        : data.status === "Rejected"
                                        ? "error"
                                        : "warning"
                                }
                                label={data.status ?? "Pending"}
                            />

                        </Paper>

                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 4 }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                height: "100%"
                            }}
                        >

                            <Typography
                                color="text.secondary"
                            >
                                Reviewer
                            </Typography>

                            <Chip
                                sx={{ mt: 2 }}
                                icon={<PersonIcon />}
                                label={
                                    data.reviewer ??
                                    "Awaiting Assignment"
                                }
                            />

                        </Paper>

                    </Grid>

                </Grid>

                {

                    data.reviewed_at && (

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                mt: 3,
                                borderRadius: 3
                            }}
                        >

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                <ScheduleIcon
                                    sx={{
                                        mr: 1,
                                        verticalAlign: "middle"
                                    }}
                                />

                                Review Date

                            </Typography>

                            <Typography>

                                {

                                    new Date(
                                        data.reviewed_at
                                    ).toLocaleString()

                                }

                            </Typography>

                        </Paper>

                    )

                }

                {

                    data.comments && (

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 3,
                                mt: 3,
                                borderRadius: 3
                            }}
                        >

                            <Typography
                                variant="h6"
                                gutterBottom
                            >
                                <CommentIcon
                                    sx={{
                                        mr: 1,
                                        verticalAlign: "middle"
                                    }}
                                />

                                Reviewer Comments

                            </Typography>

                            <ReactMarkdown>

                                {data.comments}

                            </ReactMarkdown>

                        </Paper>

                    )

                }

                {

                    data.recommendations &&
                    data.recommendations.length > 0 && (

                        <>

                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Recommendations
                            </Typography>

                            {

                                data.recommendations.map(

                                    (
                                        recommendation,
                                        index
                                    ) => (

                                        <Alert
                                            key={index}
                                            severity="info"
                                            sx={{ mb: 2 }}
                                            icon={
                                                <VerifiedUserIcon />
                                            }
                                        >

                                            {recommendation}

                                        </Alert>

                                    )

                                )

                            }

                        </>

                    )

                }

            </CardContent>

        </Card>

    );

}