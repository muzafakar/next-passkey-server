import {AuthenticatorTransportFuture, Base64URLString, CredentialDeviceType} from "@simplewebauthn/server";

export type UserModel = {
    username: string;
}

export type Passkey = {
    id: Base64URLString,
    publicKey: Uint8Array,
    user: UserModel,
    webauthnUserId: Base64URLString
    counter: number,
    deviceType: CredentialDeviceType,
    backedUp: boolean,
    transports?: AuthenticatorTransportFuture[]
}