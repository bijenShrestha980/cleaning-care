import Nav from "@/components/admin/component/nav";
import Sidebar from "@/components/admin/component/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh font-karla">
      <Sidebar />
      <div className="p-5 xl:ml-80">
        <Nav />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
