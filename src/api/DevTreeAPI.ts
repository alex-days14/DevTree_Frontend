import { isAxiosError } from "axios"
import api from "../config/axios"
import { Message, ProfileImageURL, User, UserHandle } from "../types"

export async function getUser() {
    try {
        const url = '/user'
        const { data } = await api.get<User>(url)
        if(!data){
            throw new Error('Error en el servidor')
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function updateProfile(formData: User){
    try {
        const url = '/user'
        const { data } = await api.patch<Message>(url, formData)
        if(!data){
            throw new Error('Error en el servidor')
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function uploadProfileImage(file: File){
    let formData = new FormData()
    formData.append("profileImage", file)
    try {
        const url = '/user/image'
        const { data } = await api.post<ProfileImageURL>(url, formData)
        if(!data){
            throw new Error('Error en el servidor')
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function getUserByHandle(handle: User["handle"]){
    try {
        const url = `/user/${handle}`
        const { data } = await api.get<UserHandle>(url)
        if(!data){
            throw new Error('Error en el servidor')
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function searchByHandle(handle: User["handle"]){
    try {
        const url = '/search'
        const { data } = await api.post<Message>(url, { handle })
        console.log(data)
        if(!data){
            throw new Error('Error en el servidor')
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}