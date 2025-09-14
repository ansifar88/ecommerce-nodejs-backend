export const register = async (req, res) => {

    
  res.json({ success: true, message: "User registered successfully" });
};

export const login = async (req, res) => {
  res.json({ success: true, message: "User logged in successfully" });
};