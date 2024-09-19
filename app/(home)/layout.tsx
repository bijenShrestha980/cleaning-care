import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-full font-[family-name:var(--font-montserrat-sans)]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
