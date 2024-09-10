import { TimeInput } from "../components/time-input";
import { useUI } from "../hooks";
import { DEFAULT_SETTINGS, useSettings } from "../hooks/useSettings";
import { Button, Container, FileInput, H3, Hue, Switch, Title } from "../ui";
import { H4 } from "../ui/h4";

export default function SettingsPage() {
  const { currentPallet, workPallet, breakPallet } = useUI();
  const {
    workHue,
    breakHue,
    updateSettings,
    workShift,
    breakShift,
    autoStart,
    isAudioCuesAllowed,
  } = useSettings();
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
          <div className="space-y-2">
            <H3>Work/Break Times: </H3>
            <div className="flex gap-3 items-center w-full md:w-fit justify-between md:justify-start">
              <H4 className="my-0 mr-[10px]">WORK:</H4>
              <TimeInput
                time={workShift}
                onChange={(time) => updateSettings({ workShift: time })}
              />
              <Button
                pallet={currentPallet}
                className="p-2"
                onClick={() =>
                  updateSettings({
                    workShift: DEFAULT_SETTINGS.workShift,
                  })
                }
              >
                Reset
              </Button>
            </div>
            <div className="flex gap-3 items-center w-full md:w-fit justify-between md:justify-start">
              <H4 className="my-0">BREAK:</H4>
              <TimeInput
                time={breakShift}
                onChange={(time) => updateSettings({ breakShift: time })}
              />
              <Button
                pallet={currentPallet}
                className="p-2"
                onClick={() =>
                  updateSettings({
                    breakShift: DEFAULT_SETTINGS.breakShift,
                  })
                }
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="flex my-6 items-center gap-4">
            <H3 className="m-0">Auto Start:</H3>
            <Switch
              value={autoStart}
              onChange={(newVal) => {
                updateSettings({ autoStart: newVal });
              }}
              pallet={currentPallet}
            />
          </div>
          <div className="flex my-6 items-center gap-4">
            <H3 className="m-0">Audio:</H3>
            <Switch
              value={isAudioCuesAllowed}
              onChange={(newVal) => {
                updateSettings({ isAudioCuesAllowed: newVal });
              }}
              pallet={currentPallet}
            />
          </div>
          <div>
            <div>
              <H4>Work Cue</H4>
              <FileInput pallet={currentPallet} />
            </div>
            <div>
              <H4>Break Cue</H4>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
