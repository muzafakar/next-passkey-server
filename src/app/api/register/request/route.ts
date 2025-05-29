import {generateRegistrationOptions} from "@simplewebauthn/server";
import {Credentials} from "@/credentials";

function encodeUserId(id: string): Uint8Array {
    return new TextEncoder().encode(id)
}

export async function POST(request: Request) {
    const username = await request.json()
    try {
        const userPasskeys = Credentials.findByUserName(username);

        const option = await generateRegistrationOptions({
            rpName: "learn-passkey-zulfakar",
            rpID: "0f5a-114-10-101-165.ngrok-free.app",
            userID: encodeUserId(username),
            userName: username,
            userDisplayName: username || '',
            attestationType: 'none',
            excludeCredentials: userPasskeys.map(passkey => ({
                id: passkey.id,
                type: 'public-key',
                transports: passkey.transports
            })),
            authenticatorSelection: {
                authenticatorAttachment: 'platform',
                requireResidentKey: true
            },
        })

        return new Response(JSON.stringify(option), {status: 200})
    } catch (e: any) {
        console.error(e);
        return new Response(JSON.stringify(e), {status: 400})
    }

}