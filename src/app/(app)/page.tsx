import Link from 'next/link'
import { getPayload } from 'payload'
import config from '../../payload.config'
import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import LogoutButton from './components/LogoutButton'
import CurrentUserServerComponent from './components/CurrentUserServerComponent'
export default async function Home() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })

  const checkAuth = async () => {
    const { permissions, user } = await payload.auth({ headers })
    console.log('user ==> ', user)
    if (!user) {
      redirect('/login')
    }
    return user
  }

  const user = await checkAuth()

  return (
    <div>
      <h1>Home</h1>
      <div>
        {'Visit the '}
        <Link href="/login">login page</Link>
        <CurrentUserServerComponent />
        <p>
          <LogoutButton />
        </p>
      </div>
    </div>
  )
}
