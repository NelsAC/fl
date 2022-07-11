import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";

export const loadRegisteredUsers = async () => {
    const collectionRef = collection(
        firebaseDB,
        `FL2022/fastlearning/Users`
    );
    const docs = await getDocs(collectionRef);
    
    const registeredUsers = [];
    docs.forEach((doc) => {
        registeredUsers.push({
        ...doc.data(),
        });
    });
    
    return registeredUsers;
    }
