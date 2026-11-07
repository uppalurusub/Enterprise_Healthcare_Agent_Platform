export function formatReport(text: string): string {

    return text

        .replace(/^###\s+(.*)$/gm, "$1")
        .replace(/^##\s+(.*)$/gm, "$1")
        .replace(/^#\s+(.*)$/gm, "$1");

}