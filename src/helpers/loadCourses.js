import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../firebase/config';

export const loadCourses = async () => {
  const collectionRef = collection(firebaseDB, `FL2022/fastlearning/courses`);
  const docs = await getDocs(collectionRef);

  const courses = [];
  docs.forEach((doc) => {
    courses.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return courses;
};
