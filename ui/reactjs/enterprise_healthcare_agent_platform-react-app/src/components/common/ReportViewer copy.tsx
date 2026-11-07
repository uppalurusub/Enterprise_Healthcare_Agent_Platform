import {
    Box,
    Paper,
    Typography
} from "@mui/material";

interface ReportViewerProps {

    title?: string;

    content: string;

}



export default function ReportViewer({

    title,

    content

}: ReportViewerProps) {

    

    return (

        <Paper
            elevation={0}
            variant="outlined"
            sx={{
                borderRadius: 3,
                p: 3,
                bgcolor: "#fafafa"
            }}
        >

            {

                title && (

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        gutterBottom
                        align="left"
                    >

                        {title}

                    </Typography>

                )

            }

            <Box
                component="pre"
                sx={{

                    m: 0,

                    p: 0,

                    whiteSpace: "pre-wrap",

                    wordBreak: "break-word",

                    overflowWrap: "break-word",

                    fontFamily:
                        "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

                    fontSize: "16px",

                    lineHeight: 1.8,

                    color: "text.primary",

                    textAlign: "left",

                    background: "transparent",

                    border: "none",

                    overflowX: "auto"

                }}
            >

                {content}

            </Box>

        </Paper>

    );

}