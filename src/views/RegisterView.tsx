import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { isAxiosError } from "axios";
import api from "../config/axios";
import ErrorMessage from "../components/ErrorMessage";
import { RegisterForm } from "../types";
import { toast } from "sonner";


export default function RegisterView() {

    const navigate = useNavigate()
    const location = useLocation()
    const initialValues = {
        name: "",
        email: "",
        handle: location?.state?.handle || "",
        password: "",
        passwordConfirmation: ""
    }

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<RegisterForm>({ defaultValues: initialValues });

    const password = watch("password")

    const handleRegister = async (formData: RegisterForm) => {
        try {
            const url = '/auth/register'
            const { data } = await api.post(url, formData)
            toast.success(data?.message)
            reset()
            navigate("/auth")
        } catch (error) {
            if(isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (
        <>
            <h1 className="text-4xl  text-white font-bold">Crear Cuenta</h1>

            <form 
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
            >
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("name", { required: "El nombre es obligatorio" })}
                    />
                    {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", { required: "El email es obligatorio", 
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            }, })}
                    />
                    {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="ej: devtree"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("handle", { required: "El handle es obligatorio" })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle?.message}</ErrorMessage>}
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 6, message: "La contraseña debe tener mínimo 6 caracteres" } })}
                    />
                    {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="passwordConfirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("passwordConfirmation", { required: "Es obligatorio confirmar la contraseña", validate: (value) => value === password || "Las contraseñas no coinciden" })}
                    />
                    {errors.passwordConfirmation && <ErrorMessage>{errors.passwordConfirmation?.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                    value='Crear Cuenta'
                />  
            </form>

            <nav className="mt-10">
                <Link to={"/auth"} className="text-white text-center text-lg block ">¿Ya tienes una cuenta? Inicia Sesión</Link>
            </nav>
        </>
    )
}