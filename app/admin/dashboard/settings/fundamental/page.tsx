import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteAdminForm from "@/components/admin/module/site-admin-form";
import SocialLinksForm from "@/components/admin/module/social-links-form";
import ChangePasswordForm from "@/components/admin/module/change-password-form";

const Fundamental = () => {
  return (
    <div>
      <Tabs defaultValue="site&admin">
        <TabsList className="inline gap-1 space-y-2 md:space-y-0">
          <TabsTrigger value="site&admin">Site & Admin</TabsTrigger>
          <TabsTrigger value="socialLinks">Social links</TabsTrigger>
          <TabsTrigger value="changePassword">Change password</TabsTrigger>
        </TabsList>
        <TabsContent
          value="site&admin"
          className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014]"
        >
          <SiteAdminForm />
        </TabsContent>
        <TabsContent
          value="socialLinks"
          className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014] outline-0"
        >
          <SocialLinksForm />
        </TabsContent>
        <TabsContent
          value="changePassword"
          className="z-20 w-full mt-1 bg-white px-4 py-6 rounded-b-[8px] shadow-[0px_10px_10px_0px_#00000014] outline-0"
        >
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fundamental;
