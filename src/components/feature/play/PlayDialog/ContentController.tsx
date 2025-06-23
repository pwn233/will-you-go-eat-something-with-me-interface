import { useDebounce, useHover } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'

import { Button, Loading } from '@/components/common'
import { MAP_PLEASE_EMOJI } from '@/constants'
import { PLEASE_EMOJI_TIER } from '@/enums'
import type { IPlayDialogDetail, Maybe } from '@/types'
import { cn } from '@/utils'

type IContentController = {
  data: Maybe<IPlayDialogDetail>
  onYes: () => void
  onNo: () => void
}

export const ContentController = ({ data, onYes, onNo }: IContentController) => {
  // states
  const [pleaseEmoji, setPleaseEmoji]: [PLEASE_EMOJI_TIER, Dispatch<SetStateAction<PLEASE_EMOJI_TIER>>] =
    useState<PLEASE_EMOJI_TIER>(PLEASE_EMOJI_TIER.TIER1)
  const [isDenying, setIsDenying]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)

  // hooks
  const [refYes, isYesHovering]: ReturnType<typeof useHover> = useHover()
  const debouncedIsYesHovering: boolean = useDebounce(isYesHovering, 250)
  const [refNo, isNoHovering]: ReturnType<typeof useHover> = useHover()
  const debouncedIsNoHovering: boolean = useDebounce(isNoHovering, 250)
  const debouncedIsDenying: boolean = useDebounce(isDenying, 500)

  const handleNoClick: () => void = useCallback(() => {
    setIsDenying(true)
    if (pleaseEmoji === PLEASE_EMOJI_TIER.TIER1) {
      setPleaseEmoji(PLEASE_EMOJI_TIER.TIER2)
    }
    onNo()
    setTimeout(() => {
      setIsDenying(false)
    }, 3000)
  }, [onNo, pleaseEmoji, setPleaseEmoji])

  if (!data) {
    return (
      <div className="flex size-full items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="flex size-full flex-col gap-y-4">
      <h2 className="capitalize">{data.title}</h2>
      <div className="flex size-full flex-row items-center justify-start gap-x-4 transition-all duration-1000 ease-in-out [&>button]:w-[calc(50%-8px)]">
        <Button
          ref={refYes}
          onClick={onYes}
          variant="success"
          className={cn('duration-500', [debouncedIsYesHovering && 'animate-bounce'])}
        >
          {data.yes}
        </Button>
        <Button
          ref={refNo}
          onClick={handleNoClick}
          variant="danger"
          className={cn('duration-500', [debouncedIsNoHovering && 'animate-wiggle'])}
        >
          {data.no}
        </Button>
      </div>
      <h2 className={cn('w-full text-center', [debouncedIsDenying && 'animate-bounce'])}>
        {MAP_PLEASE_EMOJI[pleaseEmoji]}
      </h2>
    </div>
  )
}
