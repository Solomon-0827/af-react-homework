declare type LoginResponseCode = 0 | 1 | 2;

declare type LoginResponse = {
    code: LoginResponseCode,
    msg?: string,
    jwt?: string,
}

declare type InputType = 'text' | 'password';