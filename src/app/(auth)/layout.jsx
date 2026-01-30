/**
 * Auth Layout (Server Component)
 * Shared layout for authentication pages (login, register)
 */

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
            {children}
        </div>
    );
}
