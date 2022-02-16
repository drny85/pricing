import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

import { browserName, osName } from 'react-device-detect';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUser] = useState<string | null>(null);
    
   

    useEffect(() => {
        const auhtListener = async () => {
            try {
                auth.onAuthStateChanged(async (user) => {
                    if (user) {
                        setUser(user.uid);

                        const ref = db.collection('pricingUsers').doc(user.uid);
                        const data = (await ref.get()).data();
                        if (data!.logins) {
                            ref.set(
                                {
                                    logins: +data!.logins! + 1,
                                    lastLogin: new Date().toISOString(),
                                },
                                { merge: true }
                            );
                        } else {
                            ref.set(
                                {
                                    logins: 1,
                                    lastLogin: new Date().toISOString(),
                                },
                                { merge: true }
                            );
                        }
                    } else {
                        const u = await auth.signInAnonymously();
                     
                        await db
                            .collection('pricingUsers')
                            .doc(u.user?.uid)
                            .set({
                                userId: u.user?.uid,
                                deviceType: osName,
                                browser: browserName,
                                createdOn: new Date().toISOString(),
                            }, {merge: true});
                    }
                });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        auhtListener();

        return () => {
            auhtListener();
        };
    }, [auth]);

    return { loading, userInfo };
};
