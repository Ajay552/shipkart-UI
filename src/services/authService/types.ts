export interface ILoginData {
    email: string;
    password: string;
}

export interface ISignupData extends ILoginData {
    fullName: string;
}

export interface IUser {
    id: string;
    full_name: string;
    email: string;
    dob: string;
    auth_method: string;
    profile_image: string;
    token: string;
}