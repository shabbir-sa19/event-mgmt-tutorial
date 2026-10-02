import Link from 'next/link'
import ThemeButton from './ThemeButton'
import { cn } from 'cn'
import { buttonVariants } from './ui/button'

const Header = () => {
  return (
    <header className="flex justify-between items-center content-center p-4 container mx-auto">
      <div className="">
        <Link href="/" className="">
          <h1 className="text-2xl font-bold">{process.env.APP_NAME}</h1>
        </Link>
      </div>
      <div className="">
        <nav className="flex space-x-4 items-center">
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