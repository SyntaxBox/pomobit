import { Button, FileInput } from "../ui";
import { useAudio } from "../hooks";
import { Volume2 } from "lucide-react";
import { ColorUtils } from "../lib/utils";
import { useState } from "react";

export function AudioInput({
  buffer,
  pallet,
  onChange,
}: {
  buffer: string;
  pallet: ColorUtils.ColorPallet;
  onChange?: (file: string) => void;
}) {
  const [fileName, setFileName] = useState("");
  const { playAudio } = useAudio();

  // Function to convert file to base64
  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (onChange) {
        onChange(base64String); // Fire the onChange with base64 string
        setFileName(file.name);
      }
    };
    reader.readAsDataURL(file); // Convert file to base64 string
  };

  return (
    <div className="w-full flex gap-2 items-center">
      <FileInput
        fileType="audio/*"
        fileName={fileName}
        pallet={pallet}
        onChange={(file: File) => handleFileChange(file)}
      />

      <Button
        className="flex gap-2 items-center"
        pallet={pallet}
        onClick={() => playAudio(buffer)}
      >
        <Volume2 />
        Test
      </Button>
    </div>
  );
}
