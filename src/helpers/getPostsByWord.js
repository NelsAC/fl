

export const getPostsByWord = ( posts = [], word = '' ) => {
    word = word.toLowerCase().trim();

    if ( word.length === 0 ) return posts;
    
    return posts.filter( post => {
        return post.title.toLowerCase().includes( word ) || post.description.toLowerCase().includes( word );
    });

}
