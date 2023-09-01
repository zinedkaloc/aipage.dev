interface HTMLPreviewProps {
  html: string;
}

export default function HTMLPreview({ html }: HTMLPreviewProps) {
  return (
    <iframe className="w-full min-h-screen cursor-pointer" srcDoc={html} />
  );
}
