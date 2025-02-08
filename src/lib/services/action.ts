export async function fetchUserData(customerId: number, token: string) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/customer/${customerId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response) {
      throw new Error("No se encontraron datos del usuario.");
    }

    return response.json();
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw error;
  }
}
