import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { ColorUtils } from "../../lib/utils";

export function Select({
  options,
  value,
  onChange,
  pallet,
}: {
  options: Record<string, unknown>;
  value?: string;
  onChange?: (value: [string, unknown]) => void;
  pallet: ColorUtils.ColorPallet;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: [string, unknown]) => {
    onChange && onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-40">
      <button
        onClick={toggleDropdown}
        className="w-full py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-between gap-2"
        style={{
          backgroundColor: pallet.primary1 + "16",
          borderColor: pallet.text1,
          color: pallet.text1,
        }}
      >
        <span className="block truncate">{value || "Select an option"}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          style={{
            color: pallet.text1,
          }}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
          {Object.entries(options).map(([label, val], i) => (
            <li
              key={i}
              onClick={() => handleOptionClick([label, val])}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 transition-colors duration-200"
              style={{
                color: pallet.text1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = pallet.primary1;
                e.currentTarget.style.color = pallet.background;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.color = pallet.text1;
              }}
            >
              <span className="block truncate">{label}</span>
              {value && options[value] === val && (
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-4"
                  style={{
                    color: pallet.primary1,
                  }}
                >
                  <Check />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
