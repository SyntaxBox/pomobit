import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Container, H2 } from "../ui";
import { useUI } from "../hooks";
const contributions = [
  { date: "2023-01-01", count: 2 },
  { date: "2023-01-02", count: 4 },
  { date: "2023-01-03", count: 1 },
  // ...add more dates
];
export default function StatsPage() {
  const { currentPallet } = useUI();
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
        <CalendarHeatmap
          startDate={new Date("2023-01-01")}
          endDate={new Date("2023-12-31")}
          values={contributions}
          classForValue={(value) => {
            if (!value) return "color-empty";
            // Map intensity to a CSS class for color
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => ({
            "data-tip": value
              ? `${value.date}: ${value.count} contributions`
              : "No contributions",
          })}
          showWeekdayLabels
        />
      </Container>
    </section>
  );
}
