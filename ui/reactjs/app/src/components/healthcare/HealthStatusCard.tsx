import {
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Chip
} from "@mui/material";

interface Props {
    data: {
        status: string;
        service: string;
        timestamp: string;
    };
}

export default function HealthStatusCard({ data }: Props) {

    if (!data) return null;

    const cards = [
        {
            title: "Status",
            value: data.status,
            chip: true,
            color: data.status === "UP" ? "success" : "error"
        },
        {
            title: "Service",
            value: data.service
        },
        {
            title: "Last Checked",
            value: new Date(data.timestamp).toLocaleString()
        }
    ];

    return (

        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                mt: 2
            }}
        >

            <CardContent>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    🏥 System Health Status
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>

                    {cards.map((item) => (

                        <Grid
                            key={item.title}
                            size={{ xs: 12, md: 4 }}
                        >

                            <Card
                                variant="outlined"
                                sx={{
                                    height: "100%",
                                    borderRadius: 3,
                                    transition: ".3s",
                                    "&:hover": {
                                        boxShadow: 5,
                                        transform: "translateY(-3px)"
                                    }
                                }}
                            >

                                <CardContent>

                                    <Typography
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {item.title}
                                    </Typography>

                                    {

                                        item.chip ?

                                        <Chip
                                            color={item.color as any}
                                            label={item.value}
                                        />

                                        :

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                        >
                                            {item.value}
                                        </Typography>

                                    }

                                </CardContent>

                            </Card>

                        </Grid>

                    ))}

                </Grid>

            </CardContent>

        </Card>

    );

}