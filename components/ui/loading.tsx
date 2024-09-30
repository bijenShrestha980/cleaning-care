import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-[200px] flex justify-center items-center">
      <LoaderCircle className="w-12 h-12 animate-spin" />
    </div>
  );
};

export default Loading;
