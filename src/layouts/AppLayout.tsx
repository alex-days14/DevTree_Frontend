import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    })

    if(error) console.log(error)

    // Comprobaciones de nuestro query
    if(isLoading) return "Cargando..."
    if(isError && !localStorage.getItem("AUTH_TOKEN") || (error?.message == "Token no válido")) return <Navigate to="/auth" />

    if(data) return <DevTree data={data} />
}