import { CopyIcon, PlayIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common'
import { GenerateLinkForm, Info } from '@/components/feature'
import { ROUTES } from '@/constants'
import type { IGenerateLinkForm, Maybe } from '@/types'
import { successToast } from '@/utils'

const CreatePage = () => {
  // states
  const [link, setLink]: [Maybe<string>, Dispatch<SetStateAction<Maybe<string>>>] = useState<Maybe<string>>(undefined)

  const handleAfterSubmit: (data: IGenerateLinkForm) => void = useCallback(
    ({ someone, something }: IGenerateLinkForm) => {
      const queryParams: URLSearchParams = new URLSearchParams({
        someone,
        something,
      })
      const generatedLink: string = `${window.location.origin}${ROUTES.PLAY.path}?${queryParams.toString()}`
      setLink(generatedLink)
    },
    [setLink],
  )

  const handleCopy: () => void = useCallback(() => {
    if (!link) {
      return
    }
    navigator.clipboard.writeText(link)
    successToast('Copied to clipboard')
  }, [link])

  return (
    <div className="mx-auto flex h-full w-[60%] flex-col gap-y-4 p-4">
      <Info title="How to Create">
        <ul className="text-secondary-700 flex list-inside list-decimal flex-col gap-y-4 font-medium">
          <li>fill up whom name to be sending to.</li>
          <li>fill up what you want to eat with them</li>
          <li>click generate link.</li>
        </ul>
      </Info>
      <Info title="Let's Create">
        <GenerateLinkForm onSubmit={handleAfterSubmit} />
      </Info>
      {link && (
        <Info title="Generated Link">
          <div className="flex items-center justify-center gap-x-4">
            <h6
              className="border-secondary-700 text-secondary-700 no-scrollbar focus:bg-primary-500/60 hover:bg-primary-500/60 w-full overflow-x-auto whitespace-nowrap rounded-lg border p-2 hover:cursor-pointer"
              onClick={handleCopy}
            >
              {link}
            </h6>
            <div className="flex flex-row items-center justify-center gap-x-4">
              <Button variant="vanilla" onClick={handleCopy}>
                <CopyIcon className="text-secondary-600 hover:text-secondary-800 size-6" />
              </Button>
              <Button asChild variant="vanilla">
                <Link to={link} target="_blank">
                  <PlayIcon className="text-secondary-600 hover:text-secondary-800 size-6" />
                </Link>
              </Button>
            </div>
          </div>
        </Info>
      )}
    </div>
  )
}

export default CreatePage
