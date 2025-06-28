import { useCallback, useMemo } from 'react'
import { Controller, type FieldValues, useForm, type UseFormReturn } from 'react-hook-form'

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { MAP_SOMETHING_ASSETS } from '@/constants'
import type { IGenerateLinkForm, ISomethingAssets } from '@/types'
import { cn, successToast } from '@/utils'

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
            id="someone"
            type="text"
            onChange={onChange}
            value={value}
            placeholder="Someone you would like to invite"
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
          <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger
              className={cn(
                'border-secondary-700 text-heading-6 focus:bg-primary-500/60 hover:bg-primary-500/60 [&>svg]:text-secondary-700 text-secondary-700 [&>span]:text-heading-6 w-full rounded-lg hover:cursor-pointer',
                [value === '' && 'text-secondary-700/60'],
              )}
            >
              <SelectValue placeholder="Something you would like to go" />
            </SelectTrigger>
            <SelectContent className="bg-primary-500 border-secondary-700">
              {Object.entries(MAP_SOMETHING_ASSETS).map(([key, { label }]: [string, ISomethingAssets]) => (
                <SelectItem
                  key={key}
                  value={key}
                  disabled={value === key}
                  className={cn(
                    'hover:bg-primary-400 text-heading-6 hover:text-secondary-700 capitalize hover:cursor-pointer',
                    [value === key && '!text-secondary-900 text-heading-6 ![&>svg]:text-secondary-900 !opacity-60'],
                  )}
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Button type="submit" variant="secondary" block disabled={buttonDisabled}>
        Generate Link
      </Button>
    </form>
  )
}
