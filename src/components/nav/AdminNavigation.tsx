import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";


export default function AdminNavigation() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem("AUTH_TOKEN")
        queryClient.invalidateQueries({ queryKey: ["user"] })
        navigate("/auth")
    }

    return (
        <button
            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    );
}