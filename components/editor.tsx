// "use client";
// import ReactQuill from "react-quill";

// function CustomEditor(props: React.ComponentProps<typeof ReactQuill>) {
//   const modules = {
//     toolbar: [
//       [
//         {
//           font: ["sans", "serif", "monospace"],
//         },
//         { header: [1, 2, false] },
//       ],
//       ["bold", "italic", "underline", "strike"],
//       [
//         {
//           color: [
//             "#FFFFFF",
//             "#000000",
//             "#e60000",
//             "#ff9900",
//             "#ffff00",
//             "#008a00",
//             "#0066cc",
//             "#9933ff",
//           ],
//         },
//         {
//           background: [
//             "#FFFFFF",
//             "#000000",
//             "#e60000",
//             "#ff9900",
//             "#ffff00",
//             "#008a00",
//             "#0066cc",
//             "#9933ff",
//           ],
//         },
//       ],
//       [{ script: "sub" }, { script: "super" }],
//       [
//         { header: 1 },
//         {
//           header: 2,
//         },
//         "blockquote",
//         "code-block",
//       ],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["direction", "align"],
//       ["link", "image", "video", "formula"],
//       ["clean"],
//     ],
//   };

//   return (
//     <ReactQuill
//       theme="snow"
//       modules={modules}
//       {...props}
//       className="mb-10 min-h-6"
//     />
//   );
// }

// export default CustomEditor;
