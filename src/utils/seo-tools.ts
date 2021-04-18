export function toSeoText(text: string | undefined | null) {
    if (text === undefined || text === null){
        return text;
    }
    return text.toString()
        .normalize('NFD')
        .replace(/[^0-9a-z \u0600-\u06FF]/gi, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/-+/g, '-')
        .replace(/^-*/, '')
        .replace(/-*$/, '')
}

export function unSeoText(text: string) {
    if (!text) {
        return '';
    }
    return text.replaceAll('-', ' ');
}