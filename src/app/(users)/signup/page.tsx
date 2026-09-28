import Link from 'next/link'

type Props = {}

const SignupPage = (props: Props) => {
  return (
    <section className=''>
      <div className="">
        <h2 className="text-2xl mt-2 text-center font-bold leading-loose lg:text-3xl">
          Create an account
        </h2>
        <p className="text-sm p-4 text-center text-muted-foreground">
          Already have an account?
          <Link
            href="/login"
            className="font-medium pl-2 text-primary-foreground hover:underline"
          >
            Login here
          </Link>
        </p>
        <p className="text-center text-sm text-destructive-foreground">{ }</p>
      </div>
      <div className="">
        <form onSubmit={() => { }}>

        </form>
      </div>
    </section>
  )
}

export default SignupPage