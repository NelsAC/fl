import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../firebase/config';

export const loadComments = async (id) => {
  const collectionRef = collection(
    firebaseDB,
    `FL2022/fastlearning/posts/${id}/comments`
  );
  const docs = await getDocs(collectionRef);

  const comments = [];
  docs.forEach((doc) => {
    comments.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return comments;
};

export const loadAllComments = async (id) => {
  const collectionRef = collection(
    firebaseDB,
    `FL2022/fastlearning/posts/${id}/comments`
  );
  const docs = await getDocs(collectionRef);

  const allComments = [];
  docs.forEach((doc) => {
    allComments.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return allComments;
};
