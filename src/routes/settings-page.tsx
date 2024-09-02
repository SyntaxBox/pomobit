import { useUI } from "../hooks";
import { Container, Hue, Title } from "../ui";
export default function SettingsPage() {
  const { currentPallet } = useUI();
  return (
    <section
      style={{
        background: currentPallet.background + "b2",
      }}
      className="flex-grow"
    >
      <Container as="div">
        <div
          className="rounded-lg p-2"
          style={{
            border: `dashed 1px ${currentPallet.text1}`,
          }}
        >
          <Title className="p-4">Settings</Title>
          <div>
            <h2>Work Color</h2>
            <Hue hue={120} onChange={() => {}} />
          </div>
        </div>
      </Container>
    </section>
  );
}
