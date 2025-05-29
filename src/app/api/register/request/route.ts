import {generateRegistrationOptions} from "@simplewebauthn/server";
import {Credentials} from "@/credentials";

function encodeUserId(id: string): Uint8Array {
    return new TextEncoder().encode(id)
}

export async function POST(request: Request) {
    const body = await request.json()
    const {username} = body
    try {
        const userPasskeys = Credentials.findByUserName(username);

        const option = await generateRegistrationOptions({
            rpName: "learn-passkey-zulfakar",
            rpID: "passkeys-codelab.glitch.me",
            userID: encodeUserId(username),
            userName: username,
            userDisplayName: username || '',
            excludeCredentials: userPasskeys.map(passkey => ({
                id: passkey.id,
                type: 'public-key',
                transports: passkey.transports
            })),
            authenticatorSelection: {
                authenticatorAttachment: 'platform',
                requireResidentKey: true,
                residentKey: 'required'
            },
        })

        return new Response(JSON.stringify(option), {status: 200})
    } catch (e: any) {
        console.error(e);
        return new Response(JSON.stringify(e), {status: 400})
    }

}