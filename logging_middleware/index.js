
let authToken = null;


export function setAuthToken(token) {
  authToken = token;
}

/**
 * Log(stack, level, package, message)
 *
 * @param {string} stack    
 * @param {string} level    
 * @param {string} pkg      
 * @param {string} message  
 */
export async function Log(stack, level, pkg, message) {
  if (!authToken) {
    console.warn("[Logger] No auth token set. Call setAuthToken(token) first.");
    return;
  }

  const body = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[Logger] Failed to send log:", data);
    }
    
  } catch (err) {
    console.error("[Logger] Network error while sending log:", err.message);
  }
}
