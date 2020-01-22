/**
 * Fetches MD content files from server, merges and returns them.
 * @param {string[]} paths     Paths to all content files. Will be joined in the order they are
 *                             provided.
 * @return {Promise.<string>}
 */
export default async (paths) => {
    const texts = await Promise.all(paths.map(async path => {
        const rawContent = await fetch(path);
        return rawContent.text();  
    }));
    return texts.join('\n');
}