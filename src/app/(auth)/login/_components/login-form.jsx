"use client";

/**
 * Login Form Component (Client Component)
 * Uses useActionState hook for Server Action integration
 */

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth/login-action";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(loginAction, null);

    // Redirect on successful login
    useEffect(() => {
        if (state?.success) {
            router.push("/dashboard");
        }
    }, [state, router]);

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={formAction} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                disabled={isPending}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                disabled={isPending}
                            />
                        </div>

                        {/* Error Message */}
                        {state?.error && (
                            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md text-sm">
                                {state.error}
                            </div>
                        )}

                        {/* Success Message */}
                        {state?.success && (
                            <div className="bg-green-500/10 border border-green-500 text-green-600 px-4 py-3 rounded-md text-sm">
                                {state.message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-primary hover:underline font-medium"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
