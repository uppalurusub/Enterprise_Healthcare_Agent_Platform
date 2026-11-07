import {
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

            <CardContent>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <ReactMarkdown
                    components={{

                        h1: ({ children }) => (
                            <Typography variant="h4" gutterBottom>
                                {children}
                            </Typography>
                        ),

                        h2: ({ children }) => (
                            <Typography
                                variant="h5"
                                sx={{ mt: 2 }}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        ),

                        h3: ({ children }) => (
                            <Typography
                                variant="h6"
                                sx={{ mt: 2 }}
                                gutterBottom
                            >
                                {children}
                            </Typography>
                        ),

                        p: ({ children }) => (
                            <Typography
                                variant="body1"
                                sx={{ mb: 1 }}
                            >
                                {children}
                            </Typography>
                        ),

                        li: ({ children }) => (
                            <li>
                                <Typography variant="body1">
                                    {children}
                                </Typography>
                            </li>
                        ),

                        strong: ({ children }) => (
                            <strong
                                style={{
                                    color: "#1976d2"
                                }}
                            >
                                {children}
                            </strong>
                        ),

                        blockquote: ({ children }) => (
                            <Card
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    my: 2,
                                    bgcolor: "#f5f5f5"
                                }}
                            >
                                <Typography variant="body2">
                                    {children}
                                </Typography>
                            </Card>
                        ),

                        table: ({ children }) => (
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    marginTop: "16px",
                                    marginBottom: "16px"
                                }}
                            >
                                {children}
                            </table>
                        ),

                        th: ({ children }) => (
                            <th
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px",
                                    background: "#1976d2",
                                    color: "white",
                                    textAlign: "left"
                                }}
                            >
                                {children}
                            </th>
                        ),

                        td: ({ children }) => (
                            <td
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "10px"
                                }}
                            >
                                {children}
                            </td>
                        )

                    }}
                >
                    {markdown}
                </ReactMarkdown>

            </CardContent>

        </Card>

    );

}