"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to login");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const register = async (
  email: string,
  password: string,
  accessCode?: string
) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, accessCode }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to register");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
