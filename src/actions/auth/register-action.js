"use server";

/**
 * Register Server Action
 * Validates input, hashes password, and creates new user
 */

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/connect";
import User from "@/models/User";

/**
 * Register a new user
 * @param {FormData} formData - Form data containing name, email, password
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export async function registerAction(formData) {
    try {
        // Extract form data
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        // Validation
        if (!name || !email || !password) {
            return {
                success: false,
                error: "All fields are required",
            };
        }

        if (password.length < 6) {
            return {
                success: false,
                error: "Password must be at least 6 characters long",
            };
        }

        if (password !== confirmPassword) {
            return {
                success: false,
                error: "Passwords do not match",
            };
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: false,
                error: "Invalid email format",
            };
        }

        // Connect to database
        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return {
                success: false,
                error: "User with this email already exists",
            };
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "user", // Default role
        });

        return {
            success: true,
            message: "Account created successfully! Please log in.",
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            error: "An error occurred during registration. Please try again.",
        };
    }
}
