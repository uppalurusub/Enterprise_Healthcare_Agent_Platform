import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";

interface Props {
    content: string;
}

export default function ReportViewer({

    content

}: Props) {

    const renderBoldText = (text: string) => {

        const parts = text.split(/(\*\*.*?\*\*)/g);

        return parts.map((part, index) => {

            if (
                part.startsWith("**") &&
                part.endsWith("**")
            ) {

                return (

                    <strong key={index}>

                        {part.replace(/\*\*/g, "")}

                    </strong>

                );

            }

            return part;

        });

    };

    const formatReport = (content: string): string[] => {

        const lines = content.split("\n");

        const formatted: string[] = [];

        let insideNumberSection = false;

        for (const raw of lines) {

            const line = raw.trim();

            if (!line) {

                formatted.push("");

                continue;

            }

            // Markdown headings
            if (
                line.startsWith("### ") ||
                line.startsWith("#### ") ||
                line.startsWith("##### ")
            ) {

                insideNumberSection = false;

                formatted.push(line);

                continue;

            }

            // Section heading
            // 10. Immediate Actions
            // 11. Mid-Term Actions
            // 13. Success Metrics

            if (/^\d+\.\s/.test(line)) {

                insideNumberSection = true;

                formatted.push(line);

                continue;

            }

            // Already a bullet

            if (
                line.startsWith("- ") ||
                line.startsWith("* ")
            ) {

                formatted.push(line);

                continue;

            }

            // Paragraph after numbered heading
            // convert to bullet

            if (insideNumberSection) {

                formatted.push("- " + line);

            }
            else {

                formatted.push(line);

            }

        }

        return formatted;

    };

    const renderLine = (

        line: string,

        index: number

    ) => {

        const text = line.trim();

        if (!text) {

            return (
                <Box
                    key={index}
                    sx={{ height: 12 }}
                />
            );

        }

        /*-------------------------------------
          H1
          ### Executive Decision Report
        --------------------------------------*/

        if (text.startsWith("### ")) {

            return (

                <Typography
                    key={index}
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                        mt: 3,
                        mb: 2,
                        color: "primary.main",
                        textAlign: "left"
                    }}
                >

                    {text.replace(/^###\s*/, "")}

                </Typography>

            );

        }

        /*-------------------------------------
          H2
          #### 1. Executive Summary
        --------------------------------------*/

        if (text.startsWith("#### ")) {

            return (

                <Typography
                    key={index}
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        mt: 3,
                        mb: 2,
                        textAlign: "left"
                    }}
                >

                    {text.replace(/^####\s*/, "")}

                </Typography>

            );

        }

        /*-------------------------------------
          H3
          ##### Heading
        --------------------------------------*/

        if (text.startsWith("##### ")) {

            return (

                <Typography
                    key={index}
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        mt: 2,
                        mb: 1,
                        textAlign: "left"
                    }}
                >

                    {text.replace(/^#####\s*/, "")}

                </Typography>

            );

        }

        /*-------------------------------------
          Horizontal Rule
        --------------------------------------*/

        if (

            text === "---" ||

            text === "***"

        ) {

            return (

                <Divider
                    key={index}
                    sx={{ my: 3 }}
                />

            );

        }

        /*-------------------------------------
          Bullet List
        --------------------------------------*/

        if (

            text.startsWith("- ") ||

            text.startsWith("* ")

        ) {

            return (

                <List
                    key={index}
                    dense
                    sx={{
                        py: 0,
                        pl: 3
                    }}
                >

                    <ListItem
                        sx={{
                            py: 0
                        }}
                    >

                        <ListItemText

                            primary={

                                renderBoldText(

                                    text.substring(2)

                                )

                            }

                        />

                    </ListItem>

                </List>

            );

        }

        /*-------------------------------------
          Numbered List
        --------------------------------------*/

        if (

            /^\d+\./.test(text)

        ) {

            return (

                <Typography
                    key={index}
                    sx={{
                        mt: 1,
                        mb: 1,
                        ml: 2,
                        fontWeight: 500,
                        textAlign: "left"
                    }}
                >

                    {renderBoldText(text)}

                </Typography>

            );

        }

        /*-------------------------------------
          Normal Paragraph
        --------------------------------------*/

        return (

            <Typography
                key={index}
                variant="body1"
                sx={{
                    lineHeight: 1.9,
                    mb: 2,
                    textAlign: "left"
                }}
            >

                {renderBoldText(text)}

            </Typography>

        );

    };

    return (

        <Box
            sx={{
                width: "100%",
                textAlign: "left"
            }}
        >

            {

                formatReport(content)

                    .map(renderLine)

            }

        </Box>

    );

}