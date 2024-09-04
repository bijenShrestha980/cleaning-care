import SignInForm from "@/components/auth/module/sign-in-form";

const SignIn = () => {
  return (
    <main className="w-full h-dvh relative">
      <div className="area absolute -z-10">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <section className="w-full h-full p-10 md:p-[64px]">
        <div className="flex flex-col justify-center items-center h-[calc(100%-64px)]">
          <div className="bg-white flex flex-col w-full md:w-9/12 lg:w-5/12 rounded-[8px] p-6 sm:p-[60px] custom-transition">
            <div className="my-auto flex flex-col justify-center items-center gap-[16px]">
              <h1 className="SH1-Semibold mb-[8px]">Sign in as admin</h1>
              <SignInForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
