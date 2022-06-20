import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";

export const loadComments = async (id) => {

    // const { active: post } = useSelector( state => state.learning );

    // console.log(post);

    // return;

    const collectionRef = collection( firebaseDB, `FL2022/learning/posts/${ id }/comments` );
    const docs = await getDocs(collectionRef);

    const comments = [];
    docs.forEach( doc => {
        comments.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    console.log(comments);

    return comments;
}