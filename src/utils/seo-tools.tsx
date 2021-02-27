
export function toSeoText(text: string) {

    return text
    .replaceAll(' ', '-')

    .toLocaleLowerCase();
}