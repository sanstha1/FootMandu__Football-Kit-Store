import { User } from "../../model/index.js";

describe("User Model", () => {
  it("should have the correct model properties", () => {
    expect(User.rawAttributes).toHaveProperty("userId");
    expect(User.rawAttributes).toHaveProperty("name");
    expect(User.rawAttributes).toHaveProperty("email");
    expect(User.rawAttributes).toHaveProperty("password");
  });

  it("should validate email format", async () => {
    try {
      await User.create({
        name: "Santosh Shrestha",
        email: "invalidEmail",
        password: "securepassword123",
      });
    } catch (error) {
      expect(error.errors[0].message).toBe("Validation isEmail on email failed");
    }
  });

  it("should set auto-incremented userId", async () => {
    const user = await User.build({
      name: "Santosh Shrestha",
      email: "sanstha70@example.com",
      password: "securepassword123",
    });

    expect(user.userId).toBeUndefined(); 
  });
});
