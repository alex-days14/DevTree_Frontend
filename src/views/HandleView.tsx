import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getUserByHandle } from "../api/DevTreeAPI";
import HandleData from "../components/HandleData";


export default function HandleView() {

    const params = useParams()
    const handle = params.handle!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["handle", handle],
        queryFn: () => getUserByHandle(handle),
        retry: 1,
        refetchOnWindowFocus: false
    })

    console.log(data)

    // Comprobaciones de nuestro query
    if(isLoading) return "Cargando..."
    if(isError) return <Navigate to="/404" />

    if(data) return <HandleData user={data} />;
}