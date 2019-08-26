export const trimMultiline = (art: string): string => {
    return art.split('\n')
        .map(x => x.trim())
        .filter(x => x.length > 0)
        .join('\n');
}
