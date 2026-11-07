import {
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";

export interface Metadata {

    request_id?: string;

    session_id?: string;

    status?: string;

    generated_at?: string;

    total_execution_time_seconds?: number;

}

interface Props {

    data: Metadata;

}

export default function MetadataCard({

    data

}: Props) {

    if (!data) {

        return null;

    }

    const cards = [

        {
            title: "Request ID",
            value: data.request_id ?? "N/A",
            icon: <AssignmentIcon color="primary" />
        },

        {
            title: "Session ID",
            value: data.session_id ?? "N/A",
            icon: <PersonIcon color="secondary" />
        },

        {
            title: "Status",
            value: data.status ?? "Completed",
            chip: true,
            color:
                data.status === "FAILED"
                    ? "error"
                    : "success",
            icon: <CheckCircleIcon color="success" />
        },

        {
            title: "Generated At",
            value: data.generated_at
                ? new Date(data.generated_at).toLocaleString()
                : "N/A",
            icon: <ScheduleIcon color="info" />
        },

        {
            title: "Execution Time",
            value:
                data.total_execution_time_seconds !== undefined
                    ? `${data.total_execution_time_seconds.toFixed(2)} sec`
                    : "N/A",
            icon: <AccessTimeIcon color="warning" />
        }

    ];

    return (

        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                mb: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    📋 Request Metadata
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid
                    container
                    spacing={3}
                >

                    {

                        cards.map((card) => (

                            <Grid
                                key={card.title}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4
                                }}
                            >

                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        borderRadius: 3,
                                        height: "100%",
                                        transition: "0.3s",
                                        "&:hover": {
                                            boxShadow: 5,
                                            transform: "translateY(-3px)"
                                        }
                                    }}
                                >

                                    {card.icon}

                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                    >
                                        {card.title}
                                    </Typography>

                                    {

                                        card.chip ?

                                        <Chip
                                            sx={{ mt: 1 }}
                                            color={card.color as any}
                                            label={card.value}
                                        />

                                        :

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{ mt: 1 }}
                                        >
                                            {card.value}
                                        </Typography>

                                    }

                                </Paper>

                            </Grid>

                        ))

                    }

                </Grid>

            </CardContent>

        </Card>

    );

}