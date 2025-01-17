import slugify from "react-slugify";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/DevTreeAPI";
import { Link } from "react-router";
import { useEffect } from "react";

export default function SearchForm() {

    const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm({ defaultValues: { handle: "" } });

    const handle = watch("handle")
    useEffect(() => {
        if(handle == "" && errors.handle){
            clearErrors("handle")
        }
    }, [handle])

    const mutation = useMutation({
        mutationFn: searchByHandle
    })

    const handleSearch = () => {
        const slug = slugify(handle)
        const newHandle = slug.split("-").join("")
        mutation.mutate(newHandle)
    }

    return (
        <form
            onSubmit={handleSubmit(handleSearch)}
            className="space-y-5">
            <div className="relative flex items-center  bg-white  px-2">
                <label
                htmlFor="handle"
                >devtree.com/</label>
                <input
                type="text"
                id="handle"
                className="border-none bg-transparent p-2 focus:ring-0 flex-1"
                placeholder="elonmusk, zuck, jeffbezos"
                {...register("handle", {
                    required: "Un Nombre de Usuario es obligatorio",
                })}
                />

            </div>
            {errors.handle && (
                <ErrorMessage>{errors.handle.message}</ErrorMessage>
            )}

            <div className="mt-20">
                {mutation.isPending && <p className="text-center">Buscando...</p>}
                {mutation.error && <p className="text-center text-red-600 font-bold rounded-md p-1 bg-red-100 text-sm">{mutation.error.message}</p>}
                {mutation.data && <p className="text-center text-cyan-500 font-bold rounded-md">{mutation.data.message} ir a <Link className="text-emerald-400 underline underline-offset-2" to={"/auth/register-account"} state={{ handle: slugify(handle).split("-").join("") }}>Registro</Link></p>}
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Obtener mi DevTree'
                disabled={mutation.isPending || handle == ""}
            />
        </form>
    );
}