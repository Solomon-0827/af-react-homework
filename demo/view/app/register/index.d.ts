declare type RegisterResponseCode = 0 | 1;

declare type RegisterResponse = {
    code: RegisterResponseCode,
    msg?: string,
    jwt?: string,
}

declare type InputType = 'text' | 'password';