export async function AuthLogin(formData: any) {
  try {
    const response = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      if (data.message) {
        throw new Error("Authentication Error.");
      }
      throw new Error(data.message || "Error al loguearse");
    }

    return data;
  } catch (error) {
    console.log("Failed connection to auth login", error);
    throw error;
  }
}

export async function AuthRegister(formData: any) {
  try {
    const response = await fetch("http://localhost:8081/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      if (data.message) {
        throw new Error("Register Error.");
      }
      throw new Error(data.message || "Error al registrarse");
    }

    return data;
  } catch (error) {
    console.log("Failed connection to auth register", error);
    throw error;
  }
}
