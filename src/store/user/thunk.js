import { collection, doc, setDoc } from "firebase/firestore/lite";
import { toast } from "react-toastify";
import { firebaseDB } from "../../firebase/config";
import { loadCourses } from "../../helpers/loadCourses";

import { loadRegisteredUsers } from "../../helpers/loadRegisteredUsers";
import { addNewCourse, addNewUser, setCountBestAnswer, setCourses, setUpdateCourse, setUpdateNameAndEmailUser, setUpdatePhotoUser, setUpdateStatusUser, setUsers } from "./userSlice";


export const startNewUser = (user) => {
    return async (dispatch) => {
        const newUser = {
            ...user,
            date: new Date().getTime(),
            rol: 'iniciante',
            status: true,
        }
        delete newUser.ok;

        const newDoc = doc(collection(firebaseDB, `FL2022/fastlearning/Users`));
        newUser.userId = newDoc.id;
        await setDoc(newDoc, newUser);

        dispatch( addNewUser( newUser ) );
    };
}

export const startUpdatePhotoURLUser = (photoURL) => {
    return async (dispatch, getState) => {
        const { users } = getState().user;
        const { uid } = getState().auth;

        const { userId: user } = users.find(user => user.uid === uid);

        const docRef = doc( firebaseDB, `FL2022/fastlearning/Users/${user}` );
        await setDoc( docRef, { photoURL }, { merge: true } );

        dispatch( setUpdatePhotoUser({ uid, photoURL }) );
    }
}

export const startUpdateNameAndEmailUser = ({ name: displayName, email }) => {
    return async (dispatch, getState) => {
        const { users } = getState().user;
        const { uid } = getState().auth;

        const { userId: user } = users.find(user => user.uid === uid);

        const docRef = doc( firebaseDB, `FL2022/fastlearning/Users/${user}` );
        await setDoc( docRef, { displayName, email }, { merge: true } );

        dispatch( setUpdateNameAndEmailUser({ uid, displayName, email }) );
    }
}

export const startLoadingUsers = () => {
    return async (dispatch) => {
        const registeredUsers = await loadRegisteredUsers();
        dispatch(setUsers(registeredUsers));
    }
}

// obtener el numero de mejores respuestas

export const startGetBestAnswers = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { comments } = getState().comment;

        const commentsUser = [];
        comments.map( comment => {
            if ( comment.uid === uid ) {
                commentsUser.push(comment);
            } 
        })

        const bestAnswers =[]
        commentsUser.map( comment => {
            if ( comment.best === true ) {
                bestAnswers.push(comment);
            } 
        })
        
        dispatch( setCountBestAnswer(bestAnswers.length) );
    }
}


export const startLoadingCourses = () => {
    return async (dispatch) => {
      const courses = await loadCourses();
      dispatch(setCourses(courses));
    };
  }	


//admin

export const startUpdateUser = (id) => {
    return async (dispatch, getState) => {

      const { users } = getState().user;
      const user = users.find(user => user.userId === id);

      dispatch( setUpdateStatusUser(id) );
      toast.success('Usuario actualizado con éxito');

      const docRef = doc(firebaseDB, `FL2022/fastlearning/Users/${id}`);
      await setDoc(docRef, { status: !user.status }, { merge: true });
    }
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
      
      dispatch( addNewCourse( newCourse ) );
      toast.success('Curso creado con éxito');
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

        dispatch( setUpdateCourse( { courseId, ...updatedCourse } ) );     
        toast.success('Curso actualizado con éxito');    
    };
  }