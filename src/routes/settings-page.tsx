import { useUI } from "../hooks";
import { Container, Hue, Title } from "../ui";
export default function SettingsPage() {
  const { currentPallet } = useUI();
  return (
    <section
      style={{
        background: currentPallet.background + "b2",
      }}
      className="pt-8 flex-grow"
    >
      <Container
        as="div"
        className="rounded-lg p-2"
        style={{
          border: `dashed 1px ${currentPallet.text1}`,
        }}
      >
        <Title className="p-4">Settings</Title>
        <Hue hue={120} onChange={() => {}} />
      </Container>
    </section>
  );
}
