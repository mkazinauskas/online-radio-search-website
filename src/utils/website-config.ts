function require(dataHolder: any, property: string): string {
    const value = dataHolder[property];
    if (value === undefined) {
        throw new Error(`'${property}' does not exist in configuration.`);
    }
    return value;
}

export interface WebsiteConfig {
    contactUsLink: string,
    facebookLink: string,
    instagramLink: string,
    twitterLink: string,
    githubLink: string,
    dribbleLink: string,
    contactEmail: string,
    websiteName: string,
    websiteUrl: string,
    androidAppDownloadUrl: string,
}

export default function extract(dataHolder: any): { websiteConfig: WebsiteConfig } {
    return {
        websiteConfig: {
            contactUsLink: require(dataHolder, 'CONTACT_US_LINK'),
            facebookLink: require(dataHolder, 'FACEBOOK_LINK'),
            instagramLink: require(dataHolder, 'INSTAGRAM_LINK'),
            twitterLink: require(dataHolder, 'TWITTER_LINK'),
            githubLink: require(dataHolder, 'GITHUB_LINK'),
            dribbleLink: require(dataHolder, 'DRIBBLE_LINK'),
            contactEmail: require(dataHolder, 'CONTACT_EMAIL'),
            websiteName: require(dataHolder, 'WEBSITE_NAME'),
            websiteUrl: require(dataHolder, 'WEBSITE_URL'),
            androidAppDownloadUrl: require(dataHolder, 'ANDROID_APP_DOWNLOAD_URL'),
        }
    }
}