"use client";
import ReactQuill from "react-quill";

function CustomEditor(props: React.ComponentProps<typeof ReactQuill>) {
  return <ReactQuill {...props} />;
}

export default CustomEditor;
