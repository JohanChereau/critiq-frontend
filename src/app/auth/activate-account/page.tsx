import BackgroundMesh from "@/components/ui/background-mesh";
import { ActivateAccountForm } from "@/features/activate-account/components/activate-account-form";

const ActivateAccount = () => {
  return (
    <section className="grid h-full w-full grid-flow-row place-items-center gap-16 py-40">
      <div className="relative text-center">
        <BackgroundMesh />
        <h1 className="text-3xl font-bold md:text-6xl">Activate Account</h1>
        <p className="text-muted-foreground mt-4 md:text-xl">
          Enter the 6-digit code you received by e-mail.
        </p>
      </div>
      <ActivateAccountForm />
    </section>
  );
};

export default ActivateAccount;
