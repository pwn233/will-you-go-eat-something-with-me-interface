import { CircleXIcon, HeartIcon } from 'lucide-react'
import { toast } from 'react-toastify'

export const successToast = (message: string) => {
  return toast.success(message, {
    icon: <HeartIcon className="text-toast-success size-6" />,
    progressClassName: '!bg-button-success',
  })
}

export const failToast = (message: string) => {
  return toast.error(message, {
    icon: <CircleXIcon className="text-toast-danger size-6" />,
    progressClassName: '!bg-button-danger',
  })
}
