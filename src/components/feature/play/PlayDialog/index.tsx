import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Dialog } from '@/components/common'
import {
  DENY_TOAST_MESSAGE,
  MAP_SOMETHING_ASSETS,
  PLAY_DIALOG_NO_CHOICE,
  PLAY_DIALOG_TITLE,
  PLAY_DIALOG_YES_CHOICE,
  SUCCESS_TOAST_MESSAGE,
} from '@/constants'
import type { SOMETHING } from '@/enums'
import type { IPlayDialogDetail, IPlayDialogProps, ISomethingAssets, Maybe } from '@/types'
import { failToast, shootSuccessConfetti, successToast } from '@/utils'

import { ContentController } from './ContentController'

const randomizeDialogDetail: (someone: string, something: string) => IPlayDialogDetail = (
  someone: string,
  something: string,
): IPlayDialogDetail => {
  const randomTitleIndex: number = Math.floor(Math.random() * PLAY_DIALOG_TITLE.length)
  const randomYesIndex: number = Math.floor(Math.random() * PLAY_DIALOG_YES_CHOICE.length)
  const randomNoIndex: number = Math.floor(Math.random() * PLAY_DIALOG_NO_CHOICE.length)

  return {
    title: PLAY_DIALOG_TITLE[randomTitleIndex].replace('{{someone}}', someone).replace('{{something}}', something),
    yes: PLAY_DIALOG_YES_CHOICE[randomYesIndex],
    no: PLAY_DIALOG_NO_CHOICE[randomNoIndex],
  }
}

export const PlayDialog = ({ someone, something, onSuccess }: IPlayDialogProps) => {
  // refs
  const dialogRef: RefObject<boolean> = useRef<boolean>(false)

  // states
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  const [dialogDetail, setDialogDetail]: [
    Maybe<IPlayDialogDetail>,
    Dispatch<SetStateAction<Maybe<IPlayDialogDetail>>>,
  ] = useState<Maybe<IPlayDialogDetail>>(undefined)

  const somethingAsset: Maybe<ISomethingAssets> = useMemo((): Maybe<ISomethingAssets> => {
    const somethingKey: SOMETHING = something.toUpperCase() as SOMETHING
    return MAP_SOMETHING_ASSETS[somethingKey]
  }, [something])

  const handleYes: () => void = useCallback(() => {
    // shoot confetti
    shootSuccessConfetti()
    // display toast
    const randomIndex: number = Math.floor(Math.random() * SUCCESS_TOAST_MESSAGE.length)
    successToast(SUCCESS_TOAST_MESSAGE[randomIndex])
    // close dialog
    setIsOpen(false)
    // trigger display on success hook
    onSuccess()
  }, [onSuccess, setIsOpen])

  const handleNo: () => void = useCallback(() => {
    const randomIndex: number = Math.floor(Math.random() * DENY_TOAST_MESSAGE.length)
    failToast(DENY_TOAST_MESSAGE[randomIndex])
    const detail: IPlayDialogDetail = randomizeDialogDetail(someone, somethingAsset?.label ?? something)
    setDialogDetail(detail)
  }, [someone, something, somethingAsset?.label, setDialogDetail])

  const handleOpenChange: (val: boolean) => void = useCallback(
    (val: boolean) => {
      setIsOpen(val)
    },
    [setIsOpen],
  )

  // when close, reset ref
  useEffect(() => {
    if (!isOpen) {
      dialogRef.current = false
    }
  }, [isOpen])

  useEffect(() => {
    if (dialogRef.current) {
      return
    }
    dialogRef.current = true
    // initial
    const detail: IPlayDialogDetail = randomizeDialogDetail(someone, somethingAsset?.label ?? something)
    setDialogDetail(detail)
    setIsOpen(true)
  }, [setDialogDetail, setIsOpen, someone, something, somethingAsset?.label])

  return (
    <Dialog open={isOpen} handleOpenChange={handleOpenChange}>
      <ContentController data={dialogDetail} onYes={handleYes} onNo={handleNo} imgURL={somethingAsset?.imageURL} />
    </Dialog>
  )
}
