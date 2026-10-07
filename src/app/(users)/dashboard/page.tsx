import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

type Props = {}

async function Dashboard({ }: Props) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl">Welcome to Dashboard</h2>
        <p className="">
          You are sign in as {session?.user.name}
        </p>
      </div>
    </section>
  )
}

export default Dashboard