import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, updateDoc, getDoc  } from 'firebase/firestore';
import { db } from '../../config/firebase';

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        getDoc(docRef).then(docSnap => {
          if(docSnap.exists()) {
            updateDoc(doc(db, 'users', user.uid), {
              last_logged_in: new Date(),
            })
          } else {
            setDoc(doc(db, 'users', user.uid), {
              fullName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL:  user.photoURL,
              id: user.uid,
              createdDate: new Date(),
              last_logged_in: new Date(),
            })
          }
        });

        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return { user };
}