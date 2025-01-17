import { useForm } from "react-hook-form";
import { ProfileForm, User } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadProfileImage } from "../api/DevTreeAPI";
import { toast } from "sonner";
import { ChangeEvent, useMemo } from "react";

export default function ProfileView() {

    const queryClient = useQueryClient()
    const { handle, description } = queryClient.getQueryData<User>(["user"])!

    const initialValues = {
        handle,
        description
    }

    const { handleSubmit, register, formState: { errors }, watch } = useForm<ProfileForm>({ defaultValues: initialValues });
    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success(data?.message)
        }
    })

    const uploadProfileImageMutation = useMutation({
        mutationFn: uploadProfileImage,
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], (old: User) => {
                console.log(old)
                return {
                    ...old,
                    image: data?.image
                }
            })
            toast.success("Imagen de perfil actualizada")
        }
    })

    const handleProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            uploadProfileImageMutation.mutate(e.target.files[0])
        }
    }

    const handleProfile = (formData: ProfileForm) => {
        const user: User = queryClient.getQueryData(["user"])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
        queryClient.invalidateQueries({ queryKey: ["user"] })
    }

    const handleForm = watch("handle")
    const descriptionForm = watch("description")
    const buttonDisabled = useMemo(() => handleForm === handle && descriptionForm === description, [handleForm, descriptionForm, handle, description])

    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleProfile)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register("handle", { required: "El handle es obligatorio" })}
                />
                {errors.handle && <ErrorMessage>{errors.handle?.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register("description")}
                />
                {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleProfileImage}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:text-slate-400 transition-colors"
                value='Guardar Cambios'
                disabled={buttonDisabled}
            />
        </form>
    )
}