import { Link } from "react-router";

export default function HomeNavigation() {
    return (
        <>
            <Link className="text-white p-2 uppercase font-black text-xs cursor-pointer" to={"/auth"}>Iniciar Sesión</Link>
            <Link className="text-slate-800 bg-lime-500 rounded-lg p-2 uppercase font-black text-xs cursor-pointer" to={"/auth/register-account"}>Registrame</Link>
        </>
    );
}