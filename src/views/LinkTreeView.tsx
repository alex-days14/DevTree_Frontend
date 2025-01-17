import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { DevTreeLink, SocialNetwork, User } from "../types";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";

export default function LinkTreeView() {

    const [links, setLinks] = useState(social)

    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(["user"])!

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Actualizado Correctamente")
        }
    })

    useEffect(() => {
        const updatedData = links.map(item => {
            const userLink: SocialNetwork = JSON.parse(user.links).find((link: SocialNetwork) => link.name == item.name)
            if(userLink){
                return { ...item, url: userLink.url, enabled: userLink.enabled }
            }
            return item
        })

        setLinks(updatedData)
    }, [])

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newLinks = links.map(item => {
            if(item.name == e.target.name){
                if(e.target.value.includes("")){
                    return { ...item, url: e.target.value, enabled: false }
                }else{
                    return { ...item, url: e.target.value }
                }
            }
            return item
        })
        setLinks(newLinks)
        /* queryClient.setQueryData(["user"], (old: User) => {
            return {
                ...old,
                links: JSON.stringify(newLinks)
            }
        }) */
    }

    const userLinks: SocialNetwork[] = JSON.parse(user.links)

    const handleStateClick = (name: DevTreeLink["name"]) => {
        const newLinks = links.map(item => {
            if(item.name == name){
                if(isValidUrl(item.url)){
                    return { ...item, enabled: !item.enabled }
                }else{
                    toast.error("URL no válida")
                }
            }
            return item
        })
        setLinks(newLinks)

        let updatedItems: SocialNetwork[] = []
        const selectedSocialNetwork = newLinks.find(link => link.name == name)
        if(selectedSocialNetwork?.enabled){
            const id = userLinks.filter(link => link.id > 0).length + 1
            if(userLinks.some(link => link.name == name)){
                updatedItems = userLinks.map(userLink => {
                    if(userLink.name == name){
                        return { ...userLink, enabled: true, id }
                    }
                    return userLink
                })
            }else{
                const newItem = {
                    ...selectedSocialNetwork,
                    id
                }
                updatedItems = [...userLinks, newItem]
            }
        } else {
            const indexToUpdate = userLinks.findIndex(link => link.name == name)
            updatedItems = userLinks.map(link => {
                if(link.name == name){
                    return { ...link, id: 0, enabled: false }
                }else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)){
                    return { ...link, id: link.id - 1 }
                }else{
                    return link
                }
            })
        }

        queryClient.setQueryData(["user"], (old: User) => {
            return {
                ...old,
                links: JSON.stringify(updatedItems)
            }
        })
    }

    const handleSaveChanges = () => {
        if(links.some(link => link.url != "" && !isValidUrl(link.url))){
            toast.error("URL no válida")
            return
        }
        mutate(queryClient.getQueryData(["user"])!)
    }

    const disableButton = useMemo(() => links == JSON.parse(user.links), [links, user])

    return (
        <>
            <div className="space-y-5">
                {links.map( item => (
                    <DevTreeInput key={item.name} link={item} handleUrlChange={handleUrlChange} handleStateClick={handleStateClick} />
                ))}

                <button disabled={disableButton} onClick={() => handleSaveChanges()} className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold disabled:opacity-15">Guardar Cambios</button>
            </div>
        </>
    );
}