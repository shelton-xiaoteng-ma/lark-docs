export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Register failed");
    }
    return { data, error: null };
  } catch (error) {
    console.error("Error during sign-up:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : error,
    };
  }
}
