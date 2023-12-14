import { db } from '../../firebase/config'
import { getDoc, doc } from 'firebase/firestore'

export async function getAdminService() {
  const query = doc(db, 'cosecha', import.meta.env.COSECHA_ID)
  const request = await getDoc(query)
  return request.data()
}