function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col place-content-center p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Sign In to Your Account
      </h1>
      {children}
    </main>
  );
}

export default SignInLayout;
