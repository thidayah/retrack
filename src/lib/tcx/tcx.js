import { calculateDistance } from "@/helper";

export function generateTCX(trackpoints, options = {}) {
  const {
    name = "ReTrack Activity",
    sport = "Running",
    startTime = trackpoints[0]?.time,
    creator = "Garmin Forerunner 55",
  } = options;

  const totalTimeSeconds =
    (new Date(trackpoints.at(-1)?.time) -
      new Date(trackpoints[0]?.time)) /
    1000;

  const totalDistanceMeters = calculateDistance(trackpoints);

  const header = `<?xml version="1.0" encoding="UTF-8"?>
<TrainingCenterDatabase
  xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2">

  <Activities>
    <Activity Sport="${sport}">
      <Id>${startTime}</Id>

      <Lap StartTime="${startTime}">
        <TotalTimeSeconds>${totalTimeSeconds}</TotalTimeSeconds>
        <DistanceMeters>${totalDistanceMeters}</DistanceMeters>

        <Track>`;

  const footer = `
        </Track>
      </Lap>
      <Creator>
        <Name>${creator}</Name>
      </Creator>
    </Activity>
  </Activities>
</TrainingCenterDatabase>`;

  const points = trackpoints
    .map((p) => {
      return `
        <Trackpoint>
          <Time>${p.time}</Time>
          <Position>
            <LatitudeDegrees>${p.lat}</LatitudeDegrees>
            <LongitudeDegrees>${p.lng}</LongitudeDegrees>
          </Position>
          <HeartRateBpm>
            <Value>${p.hr || 0}</Value>
          </HeartRateBpm>
          <Cadence>${(p.cadence || 0)}</Cadence>
        </Trackpoint>`;
    })
    .join("");

  return header + points + footer;
}

export function downloadTCX(tcxString, filename = "activity.tcx") {
  const blob = new Blob([tcxString], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}