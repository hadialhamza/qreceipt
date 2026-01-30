/**
 * Register Page (Server Component)
 * Following the Leaf Pattern - this page is a Server Component
 * that renders the Client Component RegisterForm
 */

import RegisterForm from "./_components/register-form";

export const metadata = {
    title: "Register | QReceipt",
    description: "Create a new QReceipt account",
};

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <RegisterForm />
        </div>
    );
}
