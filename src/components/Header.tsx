import Link from 'next/link'
import ThemeButton from './ThemeButton'
import { cn } from 'cn'
import { buttonVariants } from './ui/button'

const Header = () => {
  return (
    <header className="z-50 mx-auto flex h-[3.5rem] w-full shrink-0 items-center justify-between gap-4 border-b px-4 py-2 sm:px-8">
      <div className="min-w-0">
        <Link href="/" className="block min-w-0">
          <h1 className="truncate text-xl font-bold sm:text-2xl">{process.env.APP_NAME}</h1>
        </Link>
      </div>
      <div className="">
        <nav className="flex shrink-0 items-center space-x-2 sm:space-x-4">
          <ThemeButton />
          <Link href="/login" className={cn(`${buttonVariants({ variant: 'outline' })} px-4`)}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header