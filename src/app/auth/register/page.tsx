import BackgroundMesh from "@/components/ui/background-mesh";
import RegisterForm from "@/features/register/components/register-form";

const Register = () => {
  return (
    <section className="grid h-full w-full grid-flow-row place-items-center gap-16 py-40">
      <div className="relative text-center">
        <BackgroundMesh />
        <h1 className="text-3xl font-bold md:text-6xl">Sign Up</h1>
        <p className="text-muted-foreground mt-4 md:text-xl">
          Enter your information to create an account.
        </p>
      </div>
      <RegisterForm />
    </section>
  );
};

export default Register;
