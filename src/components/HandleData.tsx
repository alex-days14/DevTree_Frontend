import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
    user: UserHandle
}
export default function HandleData({ user }: HandleDataProps) {

    const enabledLinks: SocialNetwork[] = JSON.parse(user.links).filter((link: SocialNetwork) => link.enabled)

    return (
        <div className="space-y-6 text-white">
            <p className="text-5xl text-center font-black">{user.handle}</p>
            {user.image && (
                <div className="object-cover overflow-hidden object-center max-w-[250px] max-h-[250px] mx-auto rounded-full">
                    <img src={user.image} alt="Imagen Perfil"/>
                </div>
            )}
            <p className="text-lg text-center font-bold">{user.description}</p>

            <div className="mt-20 flex flex-col gap-5">
                {enabledLinks.length ? enabledLinks.map(link => (
                    <a className="bg-white px-5 py-2 flex items-center gap-6 rounded-lg" href={link.url} target="_blank" rel="noreferrer noopener">
                        <div className="w-12 h-12 bg-cover" style={{ backgroundImage: `url('/social/icon_${link.name}.svg')`}}></div>
            
                        <p className="capitalize text-black text-lg">Visita mi <span className="font-bold">{link.name}</span></p>
                    </a>
                )) : 
                    <p>No hay enlaces en este perfil</p>
                }
            </div>
        </div>
    );
}