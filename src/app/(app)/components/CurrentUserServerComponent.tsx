'use server'
import { getPayload } from 'payload'
import config from '../../../payload.config'
import { headers as getHeaders } from 'next/headers.js'
export default async function CurrentUserServerComponent() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })

  const checkAuth = async () => {
    const { permissions, user } = await payload.auth({ headers })
    console.log('user ==> ', user)
    return user
  }

  const user = await checkAuth()

  return (
    <div>
      <p>
        {user ? 'logged in' : 'not logged in'} {user?.email}
      </p>
    </div>
  )
}
