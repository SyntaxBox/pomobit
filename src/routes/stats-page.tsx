import { Container, H2 } from "../ui";
import { useUI } from "../hooks";
import { HeatCalendar } from "../components";
import { Session } from "../stores";
export default function StatsPage() {
  const { currentPallet } = useUI();

  function getLocalStorageDateItems(): Record<string, Session[]> {
    // Get all keys from localStorage
    const allKeys = Object.keys(localStorage);

    // Filter keys that are valid dates
    const dateKeys = allKeys.filter((key) => {
      const date = new Date(key);
      return date instanceof Date && !isNaN(date.getTime());
    });

    // Create an object with date keys and their values
    const dateItems: Record<string, Session[]> = {};
    dateKeys.forEach((key) => {
      if (!key) return;
      const item = localStorage.getItem(key);
      if (!item) return;
      try {
        const parsedItem = JSON.parse(item) as Session[];
        if (Array.isArray(parsedItem)) {
          dateItems[key] = parsedItem;
        }
      } catch (error) {
        console.error(`Error parsing item for key ${key}:`, error);
      }
    });

    return dateItems;
  }

  const data = getLocalStorageDateItems();
  return (
    <section
      style={{
        background: currentPallet.background + "b2",
        color: currentPallet.text1,
      }}
      className="flex-grow"
    >
      <Container as="div">
        <H2>Your Contributions</H2>
        <HeatCalendar
          pallet={currentPallet}
          data={Object.entries(data).map(([date, sessions]) => ({
            date,
            count: sessions.filter((session) => session.type === "WORK").length,
          }))}
        />
      </Container>
    </section>
  );
}
