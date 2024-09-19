import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-full font-montserratSans">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
