import { type Dispatch, type RefObject, type SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { Dialog } from '@/components/common'
import {
  DENY_TOAST_MESSAGE,
  PLAY_DIALOG_NO_CHOICE,
  PLAY_DIALOG_TITLE,
  PLAY_DIALOG_YES_CHOICE,
  ROUTES,
  SUCCESS_TOAST_MESSAGE,
} from '@/constants'
import type { IPlayDialogDetail, IPlayDialogProps, Maybe } from '@/types'
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

export const PlayDialog = ({ someone, something }: IPlayDialogProps) => {
  // refs
  const dialogRef: RefObject<boolean> = useRef<boolean>(false)

  // hooks
  const navigate: NavigateFunction = useNavigate()

  // states
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  const [dialogDetail, setDialogDetail]: [
    Maybe<IPlayDialogDetail>,
    Dispatch<SetStateAction<Maybe<IPlayDialogDetail>>>,
  ] = useState<Maybe<IPlayDialogDetail>>(undefined)

  const handleYes: () => void = useCallback(() => {
    // shoot confetti
    shootSuccessConfetti()
    // display toast
    const randomIndex: number = Math.floor(Math.random() * SUCCESS_TOAST_MESSAGE.length)
    successToast(SUCCESS_TOAST_MESSAGE[randomIndex])
    // navigate back to home
    navigate(ROUTES.HOME.path)
  }, [navigate])

  const handleNo: () => void = useCallback(() => {
    const randomIndex: number = Math.floor(Math.random() * DENY_TOAST_MESSAGE.length)
    failToast(DENY_TOAST_MESSAGE[randomIndex])
    const detail: IPlayDialogDetail = randomizeDialogDetail(someone, something)
    setDialogDetail(detail)
  }, [setDialogDetail, someone, something])

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
    const detail: IPlayDialogDetail = randomizeDialogDetail(someone, something)
    setDialogDetail(detail)
    setIsOpen(true)
  }, [setDialogDetail, setIsOpen, someone, something])

  return (
    <Dialog open={isOpen} handleOpenChange={handleOpenChange}>
      <ContentController data={dialogDetail} onYes={handleYes} onNo={handleNo} />
    </Dialog>
  )
}
