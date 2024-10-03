import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePasswordForm from "@/features/change-password/components/change-password-form";
import { KeyRound, Link, ShieldBan } from "lucide-react";
import SocialLinksForm from "@/features/social-links/components/social-links-form";
import SiteAdminForm from "@/features/fundamentals/components/site-admin-form";

const Fundamental = () => {
  return (
    <Tabs defaultValue="site&admin">
      <TabsList className="inline gap-2">
        <TabsTrigger value="site&admin" className="gap-2 w-fit md:w-[220px]">
          <ShieldBan size={15} />
          <p className="hidden md:block">Site & Admin</p>
        </TabsTrigger>
        <TabsTrigger value="socialLinks" className="gap-2 w-fit md:w-[220px]">
          <Link size={15} />
          <p className="hidden md:block">Social links</p>
        </TabsTrigger>
        <TabsTrigger
          value="changePassword"
          className="gap-2 w-fit md:w-[220px]"
        >
          <KeyRound size={15} />
          <p className="hidden md:block">Change password</p>
        </TabsTrigger>
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
  );
};

export default Fundamental;
