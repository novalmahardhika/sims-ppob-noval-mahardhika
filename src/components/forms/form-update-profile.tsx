import { useForm } from "react-hook-form";
import { AvatarUploadField, InputField } from "../ui/form-field";
import { updateProfileDefaultValues, updateProfileSchema, type UpdateProfileSchemaType } from "@/lib/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { IoIosAt } from "react-icons/io";
import { MdPersonOutline } from "react-icons/md";
import { Spinner } from "../ui/spinner";
import { Form } from "../ui/form";
import { useAuth } from "@/lib/hooks/use-auth";
import { useEffect, useState } from "react";
import { updateProfile } from "@/lib/features/user/user-slice";
import { useAppDispatch } from "@/lib/hooks/use-app-dispatch";
import { useAppSelector } from "@/lib/hooks/use-app-selector";
import { toast } from "sonner";
import type { ErrorPayload } from "@/lib/types/api-type";
import { fetchCurrentUser, logout } from "@/lib/features/auth/auth-slice";

export function FormUpdateProfile() {
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.user)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const form = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: updateProfileDefaultValues,
  })

  useEffect(() => {
    form.setValue('email', user?.email || '')
    form.setValue('first_name', user?.first_name || '')
    form.setValue('last_name', user?.last_name || '')
  }, [form, user])

  const submitHandler = async (values: UpdateProfileSchemaType) => {
    const result = await dispatch(updateProfile(values))
    if (updateProfile.fulfilled.match(result)) {
      toast.success("Top Up berhasil")
      form.reset()
      dispatch(fetchCurrentUser())
      setIsEdit(false)
    } else {
      const error = result.payload as ErrorPayload
      if (error.status === 401) {
        toast.error('Unauthorized')
        return
      }
      toast.error(error.message)
    }
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="max-w-xl w-full grid gap-6">
        <div className="grid items-center text-center gap-3">
          <AvatarUploadField
            control={form.control}
            name="profile_image"
            initialImage={user?.profile_image}
          />
          <h1 className="text-3xl font-medium">{`${user?.first_name} ${user?.last_name}`}</h1>
        </div>
        <InputField
          control={form.control}
          name="email"
          placeholder="masukan email anda"
          icon={<IoIosAt />}
          label="Email" />
        <InputField
          control={form.control}
          name="first_name"
          placeholder="nama depan"
          icon={<MdPersonOutline />}
          label="Nama Depan" />

        <InputField
          control={form.control}
          name="last_name"
          placeholder="nama belakang"
          icon={<MdPersonOutline />}
          label="Nama Belakang" />
        {
          isEdit ? (
            <Button disabled={isLoading} >
              {isLoading ? <Spinner /> : 'Simpan'}
            </Button>
          ) : (
            <>
              <Button type="button" disabled={isLoading} onClick={() => setIsEdit(!isEdit)} >
                {isLoading ? <Spinner /> : 'Edit Profile'}
              </Button>
              <Button type="button" variant={'outline'} className="text-primary border-primary hover:text-red-800 " disabled={isLoading} onClick={logoutHandler}>
                Logout
              </Button>
            </>
          )
        }

      </form>
    </Form>
  )
}
