import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export interface PlatformAnalysisRequest {

    patient_case: string;

    objective: string;

    additional_context: string;

    require_human_review: boolean;

    session_id: string;

}

interface Props {

    loading?: boolean;

    onSubmit: (request: PlatformAnalysisRequest) => void;

}

const initialRequest: PlatformAnalysisRequest = {

    patient_case: "",

    objective: "Generate comprehensive multidisciplinary healthcare recommendations.",

    additional_context: "",

    require_human_review: true,

    session_id: ""

};

export default function PlatformAnalysisForm({

    loading = false,

    onSubmit

}: Props) {

    const [request, setRequest] =
        useState<PlatformAnalysisRequest>(initialRequest);

    const handleChange = (

        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    ) => {

        const { name, value } = event.target;

        setRequest(previous => ({

            ...previous,

            [name]: value

        }));

    };

    const handleSwitch = (

        event: React.ChangeEvent<HTMLInputElement>

    ) => {

        setRequest(previous => ({

            ...previous,

            require_human_review: event.target.checked

        }));

    };

    const handleReset = () => {

        setRequest(initialRequest);

    };

    const handleSubmit = () => {

        onSubmit(request);

    };

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
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                >
                    🏥 Enterprise Healthcare Platform Analysis
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Submit a healthcare case for multi-agent analysis.
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            required
                            label="Patient Case"
                            name="patient_case"
                            value={request.patient_case}
                            onChange={handleChange}
                            placeholder="Enter patient history, symptoms, laboratory results, diagnosis, medications..."
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Objective"
                            name="objective"
                            value={request.objective}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Additional Context"
                            name="additional_context"
                            value={request.additional_context}
                            onChange={handleChange}
                            placeholder="Optional information..."
                        />

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <TextField
                            fullWidth
                            label="Session Id"
                            name="session_id"
                            value={request.session_id}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid
                        size={{ xs: 6 }}
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={request.require_human_review}
                                    onChange={handleSwitch}
                                />
                            }
                            label="Require Human Review"
                        />

                    </Grid>

                </Grid>

                <Paper
                    variant="outlined"
                    sx={{
                        mt: 3,
                        p: 2,
                        bgcolor: "#fafafa"
                    }}
                >

                    <Typography
                        variant="subtitle2"
                        gutterBottom
                    >
                        Request Summary
                    </Typography>

                    <Typography variant="body2">
                        • Patient Case Length: {request.patient_case.length} characters
                    </Typography>

                    <Typography variant="body2">
                        • Human Review: {request.require_human_review ? "Enabled" : "Disabled"}
                    </Typography>

                    <Typography variant="body2">
                        • Session: {request.session_id || "Auto Generated"}
                    </Typography>

                </Paper>

                <Box
                    sx={{
                        mt: 3
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >

                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<RestartAltIcon />}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<PlayArrowIcon />}
                            disabled={
                                loading ||
                                request.patient_case.trim() === ""
                            }
                            onClick={handleSubmit}
                        >
                            {loading ? "Analyzing..." : "Analyze"}
                        </Button>

                    </Stack>

                </Box>

            </CardContent>

        </Card>

    );

}