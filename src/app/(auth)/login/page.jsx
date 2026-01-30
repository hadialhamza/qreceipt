/**
 * Login Page (Server Component)
 * Following the Leaf Pattern - this page is a Server Component
 * that renders the Client Component LoginForm
 */

import LoginForm from "./_components/login-form";

export const metadata = {
    title: "Login | QReceipt",
    description: "Sign in to your QReceipt account",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <LoginForm />
        </div>
    );
}
