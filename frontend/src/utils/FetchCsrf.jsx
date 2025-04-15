const fetchCSRF = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/csrf/`, {
      credentials: "include",
    });
  } catch (err) {
    console.error("CSRF fetch failed", err);
  }
};

export default fetchCSRF;
