import {Passkey} from "./types";

export class Credentials {
    private static credentials: Passkey[] = []

    private constructor() {
    }

    static findByUserName(username: string) {
        return this.credentials.filter(cred => cred.user.username === username);
    }
}

