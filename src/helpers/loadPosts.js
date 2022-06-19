import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";


export const loadPosts = async ( uid='' ) => {
    if ( !uid ) throw new Error('El UID no existe');

    const collectionRef = collection( firebaseDB, `${ uid }/learning/posts` );
    const docs = await getDocs(collectionRef);
        
    const posts = [];
    docs.forEach( doc => {
        posts.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    console.log(posts);
    return posts;

}
