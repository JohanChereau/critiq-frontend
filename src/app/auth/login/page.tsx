import BackgroundMesh from "@/components/ui/background-mesh";
import LoginForm from "@/features/login/components/login-form";

const Login = () => {
  return (
    <section className="grid h-full w-full grid-flow-row place-items-center gap-16 py-40">
      <div className="relative text-center">
        <BackgroundMesh />
        <h1 className="text-3xl font-bold md:text-6xl">Sign In</h1>
        <p className="text-muted-foreground mt-4 md:text-xl">
          Enter your email below to login to your account.
        </p>
      </div>
      <LoginForm />
    </section>
  );
};

export default Login;
