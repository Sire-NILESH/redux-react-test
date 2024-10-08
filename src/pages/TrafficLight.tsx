import { useEffect, useState } from "react";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { cn } from "../utils/cn";

type LightState = "red" | "green" | "yellow" | "orange";

interface TrafficState {
  light: LightState;
  colorHex: string;
  time: number;
}

const trafficStates: TrafficState[] = [
  {
    light: "red",
    colorHex: "#dc2626",
    time: 4000,
  },
  {
    light: "yellow",
    colorHex: "#ca8a04",
    time: 500,
  },
  // {
  //   light: "orange",
  //   colorHex: "#ea580c",
  //   time: 500,
  // },
  {
    light: "green",
    colorHex: "#16a34a",
    time: 3000,
  },
];

const TrafficLight = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrent((prev) => (prev < trafficStates.length - 1 ? prev + 1 : 0));
    }, trafficStates[current].time);

    return () => {
      clearTimeout(timerId);
    };
  }, [current]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Traffic light</PageTitle>
        <PageDescription>
          A demonstration of a traffic light component that changes light
          signals as{" "}
          {trafficStates
            .map((state) => `${state.light} for ${state.time} ms`)
            .join(", ")}
        </PageDescription>
      </PageHeader>

      <PageBody>
        <figure className="w-36 p-4 bg-black text-white border border-1 border-border rounded-lg space-y-4 text-center">
          <h4 className="text-sm uppercase">Traffic Light</h4>

          <div className="flex flex-col items-center space-y-4">
            {trafficStates.map((trafficState, i) => (
              <TrafficLightBulb
                key={i}
                style={{
                  backgroundColor:
                    trafficStates[current].light === trafficState.light
                      ? trafficState.colorHex
                      : "transparent",
                  borderColor:
                    trafficStates[current].light === trafficState.light
                      ? trafficState.colorHex
                      : undefined,
                }}
              />
            ))}
          </div>
        </figure>
      </PageBody>
    </Page>
  );
};

export default TrafficLight;

interface TrafficLightBulbProps extends React.HTMLAttributes<HTMLDivElement> {}

function TrafficLightBulb({ className, ...props }: TrafficLightBulbProps) {
  return (
    <div
      className={cn("border border-gray-600 rounded-full size-20", className)}
      {...props}
    />
  );
}
