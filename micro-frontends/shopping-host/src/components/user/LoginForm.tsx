import { Link, useNavigate } from "react-router-dom"
import { useTitle } from "../../hooks/useTitle"
import { useEffect, useState, type FormEvent } from "react"
import { useLoginMutation } from "../../services/authApi"
import { fetchError } from "../../utils/fetchError"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../../redux/features/user/authSlice"
import type { RootState } from "../../redux/store"
import { useRedirectAfterLogin } from "../../hooks/useRedirectAfterLogin"
import Button from "../ui/Button"

const LoginForm = () => {
    useTitle('Login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const redirect = useRedirectAfterLogin()
    const [login, { isLoading, isError, error }] = useLoginMutation()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    useEffect(() => {
        if (isError) {
            fetchError(error as FetchBaseQueryError);
            return
        }
        if (isAuthenticated) {
            redirect()
        }

    }, [error, isAuthenticated, isError, navigate, redirect]);

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials(res.user))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className="flex justify-center font-serif items-start min-h-screen  bg-gray-100 px-4 pt-10">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
                <form onSubmit={loginHandler} className="space-y-6">
                    <h1 className="text-2xl font-semibold mb-6">Login</h1>

                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-400' : 'border-gray-300 '}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password_field" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password_field"
                            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-400' : 'border-gray-300 '}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link to="/password/forgot" className="text-sm font-semibold text-teal-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <Button id="login_button" text="LOGIN" loading={isLoading} />

                    <div className="flex justify-end">
                        <Link to="/register" className="text-sm font-semibold text-teal-600 hover:underline">
                            New User?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginForm