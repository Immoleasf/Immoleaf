const BASE_URL = "https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net/api";

export async function getUsers(token) {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Fehler beim Abrufen der Benutzer");
  return res.json();
}
