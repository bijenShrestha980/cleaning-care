"use client";
import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function CustomEditor(props: React.ComponentProps<typeof ReactQuill>) {
  return <ReactQuill {...props} />;
}

export default CustomEditor;
