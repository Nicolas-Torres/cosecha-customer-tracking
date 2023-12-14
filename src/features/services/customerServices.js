import { db } from '../../firebase/config'
import { getDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore'

export async function getCustomerService(id) {
  const query = doc(db, 'customers', id)
  const request = await getDoc(query)
  return request.data()
}

export async function checkinService(data) {
  const { id, checkin } = data
  const query = doc(db, 'customers', id)
  await updateDoc(query, {
    checkins: arrayUnion(checkin)
  })
  return true
}