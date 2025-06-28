import { useCallback, useMemo } from 'react'
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router-dom'

import { PlayDialog } from '@/components/feature'
import { ROUTES } from '@/constants'
import type { IPlayDialogProps } from '@/types'

const PlayPage = () => {
  // hooks
  const navigate: NavigateFunction = useNavigate()
  const { search }: Location = useLocation()

  const playDialogProps: Omit<IPlayDialogProps, 'onSuccess'> = useMemo((): Omit<IPlayDialogProps, 'onSuccess'> => {
    const searchParams: URLSearchParams = new URLSearchParams(search)
    return {
      someone: searchParams.get('someone') || 'you',
      something: searchParams.get('something') || 'something',
    }
  }, [search])

  const handleAfterSuccess: () => void = useCallback((): void => {
    navigate(ROUTES.HOME.path)
  }, [navigate])

  return <PlayDialog {...playDialogProps} onSuccess={handleAfterSuccess} />
}

export default PlayPage
