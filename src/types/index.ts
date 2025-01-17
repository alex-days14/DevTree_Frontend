

export type Message = {
    message: string
}

export type User = {
    _id: string
    name: string
    email: string
    handle: string
    description: string
    image: string
    links: string
}
export type UserHandle = Pick<User, "handle" | "name" | "description" | "image" | "links">

export type ProfileImageURL = {
    image: string
}

export type RegisterForm = Pick<User, "name" | "email" | "handle"> & {
    password: string
    passwordConfirmation: string
}

export type LoginForm = Pick<User, "email"> & {
    password: string
}

export type ProfileForm = Pick<User, "handle" | "description"> & {
    image: File
}

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}
export type DevTreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">

