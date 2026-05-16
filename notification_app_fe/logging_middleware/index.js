// notification_app_fe/logging_middleware/index.js

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export async function Log(stack, level, pkg, message) {
  if (!authToken) {
    console.warn("[Logger] No auth token. Call setAuthToken() first.");
    return;
  }

  try {
    const res = await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("[Logger] Error:", err);
    }
  } catch (err) {
    console.error("[Logger] Network error:", err.message);
  }
}
