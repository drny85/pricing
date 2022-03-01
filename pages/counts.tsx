import moment from "moment"
import { useEffect, useState } from "react"
import MainContainer from "../components/MainContainer"
import { db } from "../firebase"

interface User {
    id: string,
    lastLogin: string
    logins: number,
    userId: string,
    createdOn: string
    browser?:string,
    deviceType?: string

}
const Counts = () => {

    const [users, setUsers] = useState<User[]>([])
  
   
    useEffect(() => {
        const sub = db.collection('pricingUsers').orderBy('lastLogin', 'desc').onSnapshot(u => setUsers(u.docs.map(doc => ({id: doc.id, ...doc.data()} as User)).sort((a, b) => a.logins > b.logins ? 0: 1)))
        return sub;
    }, [])

    if (users.length === 0) return null
  return (
      <MainContainer>
    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <h3 style={{textAlign:'center', margin:'12px'}}>Users ({users.length})</h3>
        <div style={{display:'inline-grid', gridTemplateColumns: '1fr 1fr', gap:'1rem'}}>
        {users.map(user => (
            <div key={user.id} style={{padding:'12px', boxShadow:'12px 8px 6px rgba(0,0,0,0.124)', maxWidth:'720px', width:'100%', borderRadius:'12px',}}>
                <p>{user.userId}</p>
                <p style={{fontWeight:'bold'}}>Logins: {user.logins}</p>
                <p>Last Login: {moment(user.lastLogin).format('lll')}</p>
                <p>Browser: {user.browser}</p>
                <p>Device Type: {user.deviceType}</p>
            </div>
        ))}
        </div>
      
    </div>
    </MainContainer>
  )
}

export default Counts