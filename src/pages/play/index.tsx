import { useMemo } from 'react'
import { type Location, useLocation } from 'react-router-dom'

import { PlayDialog } from '@/components/feature'

const PlayPage = () => {
  // hooks
  const { search }: Location = useLocation()

  const [someone, something]: [string, string] = useMemo((): [string, string] => {
    const searchParams: URLSearchParams = new URLSearchParams(search)
    return [searchParams.get('someone') || 'you', searchParams.get('something') || 'something']
  }, [search])

  return (
    <>
      {/* TODO: display something */}
      <PlayDialog someone={someone} something={something} />
    </>
  )
}

export default PlayPage
