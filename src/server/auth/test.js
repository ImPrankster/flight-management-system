const hashedPassword = await new (
  await import("oslo/password")
).Argon2id().hash("password");

console.log(hashedPassword);
