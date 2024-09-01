import { useUI } from "../hooks";

export default function SettingsPage() {
  const { currentPallet } = useUI();
  return (
    <section
      style={{
        background: currentPallet.background + "b2",
      }}
      className="flex items-center justify-center flex-grow border-dashed rounded-lg p-2"
    ></section>
  );
}
