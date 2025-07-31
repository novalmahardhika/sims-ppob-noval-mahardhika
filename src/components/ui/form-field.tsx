import { useRef, useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Input } from './input';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Pencil } from 'lucide-react';
import avatar from '../../assets/images/avatar.png'

type InputFieldTProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  description?: string;
  control: Control<T>;
  icon?: ReactNode;
} & ComponentProps<typeof Input>;

export function InputField<T extends FieldValues>({
  name,
  label,
  control,
  description,
  icon,
  type,
  className,
  ...props
}: InputFieldTProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl >
            <div className="relative">
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {icon}
                </div>
              )}
              <Input
                type={inputType}
                className={cn("py-5",
                  icon && 'pl-10',
                  isPassword && 'pr-10',
                  className
                )}
                {...props}
                {...field}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}


type RadioButtonFieldProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  description?: string
  control: Control<T>
  options: { label: string; value: number | string }[]
  className?: string
  isMessage?: boolean
} & Omit<ComponentProps<'button'>, 'name'>

export function RadioButtonField<T extends FieldValues>({
  name,
  label,
  control,
  options,
  description,
  className,
  isMessage,
  ...props
}: RadioButtonFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className={cn('grid grid-cols-3 gap-3', className)}>
              {options.map((option) => {
                const isActive = field.value === option.value
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => field.onChange(option.value)}
                    className={cn(
                      'rounded border text-sm font-medium text-center transition-all py-2.5',
                      isActive
                        ? 'bg-primary text-white ring-2 ring-primary border-primary'
                        : 'bg-white text-black border-gray-300 hover:ring-1 hover:ring-primary'
                    )}
                    {...props}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {isMessage && (<FormMessage />)}
        </FormItem>
      )}
    />
  )
}

type AvatarUploadFieldProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  description?: string
  control: Control<T>
  initialImage?: string
  className?: string
} & Omit<ComponentProps<typeof Input>, 'name' | 'type'>

export function AvatarUploadField<T extends FieldValues>({
  name,
  control,
  label,
  description,
  initialImage,
  className,
  ...props
}: AvatarUploadFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)


  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className={cn('relative w-32 h-32', className)}>
                <Avatar className="w-full h-full">
                  <AvatarImage src={previewUrl || initialImage} alt="Profile preview" />
                  <AvatarFallback>
                    <img src={avatar} alt="avatar" className='w-full' />
                  </AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="absolute bottom-0 right-1 border bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
                >
                  <Pencil className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null
                  field.onChange(file)
                  if (file) {
                    const imageUrl = URL.createObjectURL(file)
                    setPreviewUrl(imageUrl)
                  } else {
                    setPreviewUrl(null)
                  }
                }}
                {...props}
              />
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}