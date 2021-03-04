import { error } from "console";

function require(dataHolder: any, property: string): string {
    const value = dataHolder[property];
    if (!value) {
        throw new Error(`'${property}' does not exist in configuration.`);
    }
    return value;
}

export interface WebsiteConfig {
    contactUsLink: string,
    contactEmail: string,
    websiteName: string,
    websiteUrl: string
}

export default function extract(dataHolder: any): { websiteConfig: WebsiteConfig } {
    return {
        websiteConfig: {
            contactUsLink: require(dataHolder, 'CONTACT_US_LINK'),
            contactEmail: require(dataHolder, 'CONTACT_EMAIL'),
            websiteName: require(dataHolder, 'WEBSITE_NAME'),
            websiteUrl: require(dataHolder, 'WEBSITE_URL')
        }
    }
}