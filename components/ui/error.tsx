import { CloudLightning } from "lucide-react";

const Error = () => {
  return (
    <div className="w-full h-[200px] flex flex-col justify-center items-center gap-2">
      <CloudLightning className="w-12 h-12" />
      <p className="font-medium text-center">Someting went wrong..</p>
    </div>
  );
};

export default Error;
