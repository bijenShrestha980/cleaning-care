import RequestCallbackDetails from "@/features/request-callback/components/request-callback-details";

const RequestCallback = () => {
  return (
    <section>
      <div className="w-full flex justify-between mb-3">
        <p className="font-medium mb-4">Request Callback</p>
      </div>
      <RequestCallbackDetails />
    </section>
  );
};

export default RequestCallback;
