"use server";

/**
 * Login Server Action
 * Validates credentials and creates session
 */

import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import dbConnect from "@/lib/db/connect";
import User from "@/models/User";

/**
 * Login user with credentials
 * @param {Object} prevState - Previous state (for useActionState)
 * @param {FormData} formData - Form data containing email and password
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export async function loginAction(prevState, formData) {
    try {
        // Extract form data
        const email = formData.get("email");
        const password = formData.get("password");

        // Validation
        if (!email || !password) {
            return {
                success: false,
                error: "Email and password are required",
            };
        }

        // Connect to database
        await dbConnect();

        // Find user (explicitly request password field)
        const user = await User.findOne({ email: email.toLowerCase() }).select(
            "+password",
        );

        if (!user) {
            return {
                success: false,
                error: "Invalid email or password",
            };
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                success: false,
                error: "Invalid email or password",
            };
        }

        // Return success (session creation will be handled by NextAuth)
        return {
            success: true,
            message: "Login successful!",
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            error: "An error occurred during login. Please try again.",
        };
    }
}

/**
 * Alternative: Use NextAuth signIn directly
 * This is for credential-based authentication with NextAuth
 */
export async function loginWithNextAuth(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        // This will use your NextAuth configuration
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            return {
                success: false,
                error: result.error,
            };
        }

        return {
            success: true,
            message: "Login successful!",
        };
    } catch (error) {
        console.error("NextAuth login error:", error);
        return {
            success: false,
            error: "Login failed. Please try again.",
        };
    }
}
