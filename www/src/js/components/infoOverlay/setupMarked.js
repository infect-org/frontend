import marked from 'marked';

/**
 * Tour button needs to open guided tour. Other links should open in a new window. H1 should
 * be listed in menu. These are not native functions of Markdown, we therefore have to 
 * extend/hijack them.
 * @param {function} sectionCallback      Callback that takes two params (title and className) of
 *                                        a section (and adds it to the menu)
 */
export default (sectionCallback, appStoreURLs) => {
    
    marked.setOptions({
        gfm: true,
        smartypants: true,
        breaks: true,
    });

    const renderer = new marked.Renderer();

    // If we come across an H1, add class to it and call sectionCallback
    let sectionNumber = 0;
    renderer.heading = (text, level) => {
        const className = `section-${++sectionNumber}`;
        if (level === 1) sectionCallback(text, className);
        return `<h${level} class='${className}'>${text}</h${level}>`;
    };

    renderer.link = (href, title, text) => {
        const titleString = title ? `title=${title}` : '';
        if (href === '#tourGuideButton') {
            // TourGuideButton: Dispatch startGuidedTour event, is listened to in GuidedTour
            // model. Use # link to remove #information from URL.
            return `<a href="#" data-guided-tour-button onClick="window.dispatchEvent(new Event('startGuidedTour'));" ${titleString}>${text}</a>`;
        } else if (href === '#iOSAppStoreLink') {
            return `<a href=${appStoreURLs.iOS} target="_blank"><img src="img/apps/app-store-icon.png" alt="Apple App Store"></a>`;
        } else if (href === '#androidPlayStoreLink') {
            return `<a href=${appStoreURLs.playStore} target="_blank"><img src="img/apps/google-play-icon.png" alt="Google Play Store"></a>`;
        } else {
            // Open all links in a new window (add target="_blank")
            return `<a href="${href}" target="_blank" ${titleString}>${text}</a>`;
        }
    };

    return { marked, renderer };

}

