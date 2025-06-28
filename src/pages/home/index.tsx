import { GithubIcon, PenIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common'
import { PageWrapper } from '@/components/feature'
import { ROUTES } from '@/constants'

const HomePage = () => {
  return (
    <PageWrapper className="h-[calc(100dvh-var(--header-height))] items-center justify-center">
      <div className="flex flex-col items-center gap-y-14">
        <div className="flex flex-col items-center gap-y-8">
          <span className="text-heading-3 md:text-heading-2 text-center text-black">
            Welcome to the ask your <span className="text-heading-2 md:text-heading-1 text-secondary-600">crush</span>{' '}
            out for something.
          </span>
          <span className="text-secondary-700 text-heading-5 md:text-heading-4 whitespace-pre-line text-center">
            {`This is a simple page to help you ask your crush out for something,\nand hopefully a good happy answer from them.`}
          </span>
        </div>
        <div className="flex w-1/3 flex-row items-stretch justify-center gap-x-4">
          <Button variant="secondary" asChild>
            <Link to={ROUTES.CREATE.path} className="flex-1">
              <span className="flex w-full flex-row items-center justify-center gap-x-2">
                <PenIcon className="size-4 shrink-0" />
                Try Create
              </span>
            </Link>
          </Button>
          <Button variant="primary" asChild>
            <Link
              to="https://github.com/pwn233/will-you-go-eat-something-with-me-interface"
              target="_blank"
              className="flex-1"
            >
              <span className="flex w-full flex-row items-center justify-center gap-x-2">
                <GithubIcon className="size-4 shrink-0" />
                Github
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </PageWrapper>
  )
}

export default HomePage
