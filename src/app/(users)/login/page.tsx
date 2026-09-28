import Link from 'next/link'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <section>
      <div className="">
        <h2 className="text-2xl mt-2 text-center font-bold leading-tight tracking-tight text-secondary-foreground lg:text-3xl">
          Log into your account
        </h2>
        <p className="text-sm p-4 font-light text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary-foreground hover:underline"
          >
            Sign up here
          </Link>
        </p>
        <p className="text-center text-sm text-destructive-foreground">{ }</p>
      </div>
      <div className="">
        <form ></form>
      </div>
    </section>
  )
}

export default LoginPage