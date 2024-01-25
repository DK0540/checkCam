const handleLogin = async () => {
  try {
    const response = await fetch("/api/pwa/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        user_password: password,
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      console.log(userData); // Log the user data to the console
      setUserData(userData);
      setLoggedIn(true);

      // Store the token in cookies
      Cookies.set("userToken", userData.token);
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    setErrorMessage("An error occurred during login");
  }
};
