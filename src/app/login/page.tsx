"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (result?.error) {
            setError("Wrong email or password")
        } else {
            router.push("/dashboard")
            router.refresh()
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="p-8 border rounded shadow-md w-96 flex flex-col gap-4">
                <h2 className="text-xl font-bold">Logowanie</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required
                />
                <input
                    type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required
                />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    )
}