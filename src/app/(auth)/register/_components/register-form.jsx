"use client";

/**
 * Register Form Component (Client Component)
 * Uses useActionState hook for Server Action integration
 */

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/auth/register-action";
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

export default function RegisterForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(registerAction, null);

    // Redirect to login on successful registration
    useEffect(() => {
        if (state?.success) {
            // Optionally show success message before redirect
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }
    }, [state, router]);

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                        Enter your information to create a new account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={formAction} className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                required
                                disabled={isPending}
                            />
                        </div>

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
                                minLength={6}
                            />
                            <p className="text-xs text-muted-foreground">
                                Must be at least 6 characters
                            </p>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                required
                                disabled={isPending}
                                minLength={6}
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
                                {state.message} Redirecting to login...
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
