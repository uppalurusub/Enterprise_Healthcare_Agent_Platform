import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from "@mui/material";

import ReactMarkdown from "react-markdown";

interface MarkdownCardProps {

    title: string;

    markdown: string;

}

export default function MarkdownCard({

    title,

    markdown

}: MarkdownCardProps) {

    return (

        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                m: 2
            }}
        >

            <CardContent
                sx={{
                    textAlign: "left"
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                    align="left"
                >
                    {title}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                    sx={{
                        width: "100%",
                        textAlign: "left",

                        "& *": {
                            textAlign: "left"
                        },

                        "& p": {
                            textAlign: "left",
                            marginBottom: 2,
                            lineHeight: 1.8
                        },

                        "& h1": {
                            fontSize: "2rem",
                            fontWeight: 700,
                            marginTop: 2,
                            marginBottom: 2
                        },

                        "& h2": {
                            fontSize: "1.6rem",
                            fontWeight: 700,
                            marginTop: 2,
                            marginBottom: 2
                        },

                        "& h3": {
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            marginTop: 2,
                            marginBottom: 1
                        },

                        "& ul": {
                            textAlign: "left",
                            paddingLeft: "24px",
                            marginTop: 1,
                            marginBottom: 2
                        },

                        "& ol": {
                            textAlign: "left",
                            paddingLeft: "24px",
                            marginTop: 1,
                            marginBottom: 2
                        },

                        "& li": {
                            textAlign: "left",
                            display: "list-item",
                            lineHeight: 1.8,
                            marginBottom: "8px"
                        },

                        "& table": {
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: 16,
                            marginBottom: 16
                        },

                        "& th": {
                            textAlign: "left",
                            border: "1px solid #ddd",
                            padding: 10,
                            backgroundColor: "#1976d2",
                            color: "#fff"
                        },

                        "& td": {
                            textAlign: "left",
                            border: "1px solid #ddd",
                            padding: 10
                        },

                        "& blockquote": {
                            borderLeft: "4px solid #1976d2",
                            paddingLeft: 16,
                            color: "#555",
                            margin: "16px 0"
                        }
                    }}
                >

                <ReactMarkdown
                    components={{

                        h1: ({ children }) => (
                            <Typography
                                variant="h4"
                                align="left"
                                sx={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                    
                                }}
                            >
                                {children}
                            </Typography>
                        ),

                        h2: ({ children }) => (
                            <Typography
                                variant="h5"
                                align="left"
                                sx={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}
                            >
                                {children}
                            </Typography>
                        ),

                        h3: ({ children }) => (
                            <Typography
                                variant="h6"
                                align="left"
                                sx={{
                                    textAlign: "left",
                                    fontWeight: "bold"
                                }}
                            >
                                {children}
                            </Typography>
                        ),

                        p: ({ children }) => (

                        <Typography
                        component="div"
                        variant="body1"
                        sx={{
                            display: "block",
                            textAlign: "left",
                            lineHeight: 1.8,
                            mb: 2
                        }}
                        >

                        {children}

                        </Typography>

                        ),

                        ul: ({ children }) => (

                        <Box
                        component="ul"
                        sx={{
                            display: "block",
                            listStyleType: "disc",
                            pl: 4,
                            mb: 2,
                            textAlign: "left"
                        }}
                        >

                        {children}

                        </Box>

                        ),

                        ol: ({ children }) => (

                        <Box
                        component="ol"
                        sx={{
                            display: "block",
                            listStyleType: "decimal",
                            pl: 4,
                            mb: 2,
                            textAlign: "left"
                        }}
                        >

                        {children}

                        </Box>

                        ),

                        li: ({ children }) => (

                        <li
                        style={{
                            textAlign: "left",
                            marginBottom: "10px",
                            lineHeight: "1.8"
                        }}
                        >

                        <Typography
                        component="span"
                        sx={{
                            textAlign: "left",
                            display: "inline"
                        }}
                        >

                        {children}

                        </Typography>

                        </li>

                        ),

                        strong: ({ children }) => (
                            <strong
                                style={{
                                    color: "#1565C0"
                                }}
                            >
                                {children}
                            </strong>
                        )

                    }}
                >

                {markdown}

                </ReactMarkdown>

                </Box>

            </CardContent>

        </Card>

    );

}