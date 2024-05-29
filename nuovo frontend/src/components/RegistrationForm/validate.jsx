import React from "react";
const validate = (values) => {
    const errors = {};
    if (!values.Name) {
        errors.Name = 'Name is required';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!isValidEmail(values.email)) {
        errors.email = 'Email is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
};

const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export default validate;
