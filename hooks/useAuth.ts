import { onAuthStateChanged, signInAnonymously, User } from '@firebase/auth';
import { addDoc, doc, setDoc } from '@firebase/firestore';

import { useEffect, useState } from 'react';
import { auth, usersRef } from '../firebase';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                localStorage.setItem('pricing_userId', user.uid);
            } else {
                const exists = localStorage.getItem('pricing_userId');

                if (exists === null) {
                    const u = await signInAnonymously(auth);

                    await setDoc(doc(usersRef, u.user.uid), {
                        userId: u.user.uid,
                        createdAt: new Date().toISOString(),
                    });
                    localStorage.setItem('pricing_userId', u.user.uid);
                    setUser(u.user);
                }
            }
        });

        setLoading(false);
    }, []);

    return { loading, user };
};
