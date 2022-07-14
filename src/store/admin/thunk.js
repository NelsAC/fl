import { collection, doc, setDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { firebaseDB } from "../../firebase/config";
import { loadCourses } from "../../helpers";
import { loadPosts } from "../../helpers";
import { loadRegisteredUsers } from "../../helpers";
import { setCourses, setPosts, setUsers } from "./adminSlice";

export const startLoadingUsers = () => {
    return async (dispatch) => {
      const users = await loadRegisteredUsers();
      dispatch(setUsers(users));
    };
  };

  export const startLoadingPosts = () => {
    return async (dispatch) => {
      const posts = await loadPosts();
      dispatch(setPosts(posts));
    };
  };

  export const startLoadingCourses = () => {
    return async (dispatch) => {
      const courses = await loadCourses();
      dispatch(setCourses(courses));
    };
  }	



  export const startNewCourse = ({ name, category, description, icon }) => {
    return async (dispatch, getState) => {
  
      const newCourse = {
        name: name.toString().toLowerCase(),
        category: category.toString().toLowerCase(),
        description: description.toString().toLowerCase(),
        icon, 
        date: new Date().getTime(),
      };
      const newDoc = doc(collection(firebaseDB, `FL2022/fastlearning/courses`));
      newCourse.courseId = newDoc.id;
  
      await setDoc(newDoc, newCourse);
  
      const getCourses = await toast.promise(loadCourses(),
      {
        pending: 'Agregando nuevo curso...',
        success: 'Curso agregado con éxito',
      })

      dispatch ( setCourses( getCourses ) );
    };
  };

  export const startUpdateCourse = ({ name, category, description, icon, courseId }) => {
    return async (dispatch, getState) => {
      const updatedCourse = {
        name: name.toString().toLowerCase(),
        category: category.toString().toLowerCase(),
        description: description.toString().toLowerCase(),
        icon,
      };
      const docRef = doc(firebaseDB, `FL2022/fastlearning/courses/${courseId}`);
      await setDoc(docRef, { ...updatedCourse }, { merge: true });

      const getCourses = await toast.promise(loadCourses(),
      {
        pending: 'Actualizando curso...',
        success: 'Curso actualizado con éxito',
      })

      dispatch ( setCourses( getCourses ) );
    };
  }


  export const startUpdateUser = (id) => {
    return async (dispatch, getState) => {

      const { users } = getState().user;
      const user = users.find(user => user.userId === id);

      const docRef = doc(firebaseDB, `FL2022/fastlearning/Users/${id}`);
      await setDoc(docRef, { status: !user.status }, { merge: true });

      const getUsers = await toast.promise(loadRegisteredUsers(),
      {
        pending: 'Actualizando estado...',
        success: 'Estado actualizado con éxito',
      })

      dispatch ( setUsers( getUsers ) );
    }
  }

  export const startUpdateForum = (id) => {
    return async (dispatch, getState) => {

      const { posts } = getState().post;
      const post = posts.find(post => post.postId === id);

      const docRef = doc(firebaseDB, `FL2022/fastlearning/posts/${id}`);
      await setDoc(docRef, { status: !post.status }, { merge: true });

      const getForums = await toast.promise(loadPosts(),
      {
        pending: 'Actualizando estado...',
        success: 'Estado actualizado con éxito',
      })

      dispatch ( setPosts( getForums ) );
    }
  }