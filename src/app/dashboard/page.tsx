import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

type Props = {}

async function Dashboard({ }: Props) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <section className="w-full ">
      <div className="flex items-center rounded-xl border gap-4 mb-8 px-4 py-2">
        <div className="flex items-center">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-8 my-auto" />
        </div>
        <div className="flex w-full justify-center items-center">
          <h2 className="text-3xl">Welcome to Dashboard</h2>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <p className="">
          You are sign in as {session?.user.name}
        </p>
      </div>
    </section>
  )
}

export default Dashboard