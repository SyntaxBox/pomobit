import React from "react";
import { Upload } from "lucide-react";
import { ColorUtils } from "../../lib/utils";

export const FileInput = ({
  fileName = "No file chosen",
  onChange,
  pallet,
  fileType = "*",
}: {
  onChange: (file: File) => void;
  pallet: ColorUtils.ColorPallet;
  fileName?: string;
  fileType?: string; // Accept file type, e.g., 'image/*', '.pdf', '.txt'
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange && file && onChange(file);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        style={{
          backgroundColor: pallet.primary1 + "10",
          borderColor: pallet.text1 + "30",
        }}
        className="flex flex-col items-center md:items-start justify-center w-full p-2 border-2 border-dashed rounded-lg cursor-pointer"
      >
        <div
          className="flex flex-col md:flex-row gap-3 items-center md:justify-start justify-center"
          style={{
            color: pallet.text1 + "80",
          }}
        >
          <Upload className="w-8 h-8" />
          <p className="text-sm">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs">{fileName}</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept={fileType} // Restrict file type based on the prop
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
