/**
 * User Validation Schema
 * Validation utilities for user-related operations
 */

/**
 * Validate registration data
 * @param {Object} data - User registration data
 * @returns {{success: boolean, errors?: Object}}
 */
export function validateRegistration(data) {
    const errors = {};

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = "Invalid email format";
    }

    // Password validation
    if (!data.password || data.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    // Password confirmation
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return {
        success: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : undefined,
    };
}

/**
 * Validate login data
 * @param {Object} data - User login data
 * @returns {{success: boolean, errors?: Object}}
 */
export function validateLogin(data) {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = "Invalid email format";
    }

    // Password validation
    if (!data.password || data.password.length === 0) {
        errors.password = "Password is required";
    }

    return {
        success: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : undefined,
    };
}
