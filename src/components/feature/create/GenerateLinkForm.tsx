import { useCallback, useMemo } from 'react'
import { Controller, type FieldValues, useForm, type UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/common'
import type { IGenerateLinkForm } from '@/types'
import { successToast } from '@/utils'

const DEFAULT_GENERATE_LINK_FORM_VALUES: IGenerateLinkForm = {
  someone: '',
  something: '',
}

export const GenerateLinkForm = ({ onSubmit }: { onSubmit: (data: IGenerateLinkForm) => void }) => {
  // forms
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  }: UseFormReturn<IGenerateLinkForm> = useForm<IGenerateLinkForm>({
    defaultValues: DEFAULT_GENERATE_LINK_FORM_VALUES,
  })

  const buttonDisabled: boolean = useMemo<boolean>((): boolean => {
    return !isValid || !isDirty
  }, [isDirty, isValid])

  const handleFormSubmit: (data: IGenerateLinkForm) => void = useCallback(
    (data: IGenerateLinkForm) => {
      // toast
      successToast('Link generated successfully')
      // reset
      reset(data, { keepDirty: false })
      // submit
      onSubmit(data)
    },
    [onSubmit, reset],
  )

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-y-4">
      <Controller
        name="someone"
        control={control}
        rules={{
          required: 'Please fill someone you wish to invite',
        }}
        render={({ field: { onChange, value } }: Pick<FieldValues, 'field'>) => (
          <input
            type="text"
            onChange={onChange}
            value={value}
            placeholder="Someone"
            required
            className="border-secondary-700 text-heading-6 text-secondary-700 focus:bg-primary-500/60 hover:bg-primary-500/60 rounded-lg border p-2"
          />
        )}
      />
      <Controller
        name="something"
        control={control}
        rules={{
          required: 'Please fill something you want to go',
        }}
        render={({ field: { onChange, value } }: Pick<FieldValues, 'field'>) => (
          <input
            type="text"
            onChange={onChange}
            value={value}
            placeholder="Something"
            required
            className="border-secondary-700 text-heading-6 text-secondary-700 focus:bg-primary-500/60 hover:bg-primary-500/60 rounded-lg border p-2"
          />
        )}
      />
      <Button type="submit" variant="secondary" block disabled={buttonDisabled}>
        Generate Link
      </Button>
    </form>
  )
}
