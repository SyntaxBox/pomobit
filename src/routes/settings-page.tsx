import { TimeInput } from "../components/time-input";
import { useUI } from "../hooks";
import { DEFAULT_SETTINGS, useSettings } from "../hooks/useSettings";
import { Button, Container, H3, Hue, Title } from "../ui";
import { H4 } from "../ui/h4";
export default function SettingsPage() {
  const { currentPallet, workPallet, breakPallet } = useUI();
  const { workHue, breakHue, updateSettings, workShift, breakShift } =
    useSettings();

  return (
    <section
      style={{
        background: currentPallet.background + "b2",
        color: currentPallet.text1,
      }}
      className="flex-grow"
    >
      <Container as="div">
        <div
          className="rounded-lg p-4"
          style={{
            border: `dashed 1px ${currentPallet.text1}`,
          }}
        >
          <Title className="">Settings</Title>
          <div>
            <H3>Work Color:</H3>

            <div className="flex gap-3 items-center">
              <Hue
                hue={workHue}
                onChange={(newHsv) => updateSettings({ workHue: newHsv.h })}
                className="w-full"
              />
              <Button
                pallet={workPallet}
                className="p-2"
                onClick={() =>
                  updateSettings({
                    workHue: DEFAULT_SETTINGS.workHue,
                  })
                }
              >
                Reset
              </Button>
            </div>
          </div>
          <div>
            <H3>Break Color:</H3>
            <div className="flex gap-3 items-center h-fit">
              <Hue
                hue={breakHue}
                className="w-full"
                onChange={(newHsv) => updateSettings({ breakHue: newHsv.h })}
              />
              <Button
                pallet={breakPallet}
                className="p-2"
                onClick={() =>
                  updateSettings({
                    breakHue: DEFAULT_SETTINGS.breakHue,
                  })
                }
              >
                Reset
              </Button>
            </div>
          </div>
          <div>
            <H3>Work/Break Times: </H3>
            <H4>WORK</H4>
            <TimeInput
              time={workShift}
              onChange={(time) => updateSettings({ workShift: time })}
            />
            <H4>BREAK</H4>
            <TimeInput
              time={breakShift}
              onChange={(time) => updateSettings({ breakShift: time })}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
