import {
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Chip,
    Box
} from "@mui/material";

import MarkdownCard from "../common/MarkCard";

interface Props {
    data: any;
}

const agentRoles: Record<string, string> = {
    "Clinical Agent": "Clinical Decision Support",
    "Financial Agent": "Healthcare Finance",
    "Research Agent": "Medical Research",
    "Compliance Agent": "Healthcare Compliance",
    "Executive Agent": "Executive Decision Support"
};

const skillDescriptions: Record<string, string> = {
    "Agent Orchestration": "Coordinates Multiple AI Agents",
    "Human-in-the-Loop": "Expert Review Workflow"
};

export default function AgentsInfoCard({ data }: Props) {

    if (!data) {
        return null;
    }

    const markdown = `
# 🤖 Enterprise Healthcare Platform

---

## Application

**${data.application}**

## Version

**${data.version}**

## Framework

**${data.framework}**

## Multi-Agent Framework

**${data.multi_agent_framework}**

## Architecture

**${data.architecture}**
`;

    return (

        <Box>

            <MarkdownCard
                title="Platform Information"
                markdown={markdown}
            />

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
                        👥 Available Agents
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>

                        {data.agents.map((agent: string) => (

                            <Grid
                                key={agent}
                                size={{ xs: 12, sm: 6, md: 4 }}
                            >

                                <Card
                                    variant="outlined"
                                    sx={{
                                        height: "100%",
                                        borderRadius: 3,
                                        transition: "0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                            transform: "translateY(-3px)"
                                        }
                                    }}
                                >

                                    <CardContent>

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {agent}
                                        </Typography>

                                        <Chip
                                            color="primary"
                                            label={
                                                agentRoles[agent] ??
                                                "AI Healthcare Agent"
                                            }
                                        />

                                    </CardContent>

                                </Card>

                            </Grid>

                        ))}

                    </Grid>

                </CardContent>

            </Card>

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
                        🚀 Platform Skills
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>

                        {data.skills.map((skill: string) => (

                            <Grid
                                key={skill}
                                size={{ xs: 12, sm: 6, md: 4 }}
                            >

                                <Card
                                    variant="outlined"
                                    sx={{
                                        height: "100%",
                                        borderRadius: 3,
                                        transition: "0.3s",
                                        "&:hover": {
                                            boxShadow: 6,
                                            transform: "translateY(-3px)"
                                        }
                                    }}
                                >

                                    <CardContent>

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            gutterBottom
                                        >
                                            {skill}
                                        </Typography>

                                        <Chip
                                            color="success"
                                            label={
                                                skillDescriptions[skill] ??
                                                "Platform Capability"
                                            }
                                        />

                                    </CardContent>

                                </Card>

                            </Grid>

                        ))}

                    </Grid>

                </CardContent>

            </Card>

        </Box>

    );

}