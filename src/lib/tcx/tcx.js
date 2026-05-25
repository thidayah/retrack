import { calculateDistance } from "@/helper";

export function generateTCX(trackpoints, options = {}) {
  const {
    type = "Running",
    author = "Garmin Forerunner 55",
    startTime = trackpoints[0]?.time,
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
    <Activity Sport="${type}">
      <Id>${startTime}</Id>

      <Lap StartTime="${startTime}">
        <TotalTimeSeconds>${totalTimeSeconds}</TotalTimeSeconds>
        <DistanceMeters>${totalDistanceMeters}</DistanceMeters>

        <Track>`;

  const footer = `
        </Track>
      </Lap>
      <Creator>
        <Name>${author}</Name>
      </Creator>
    </Activity>
  </Activities>
</TrainingCenterDatabase>`;

  const points = trackpoints
    .map((p) => {
      const hrBlock = p.hr != null
        ? `\n          <HeartRateBpm><Value>${p.hr}</Value></HeartRateBpm>`
        : '';
      const cadenceBlock = p.cadence != null
        ? `\n          <Cadence>${p.cadence}</Cadence>`
        : '';
      return `
        <Trackpoint>
          <Time>${p.time}</Time>
          <Position>
            <LatitudeDegrees>${p.lat}</LatitudeDegrees>
            <LongitudeDegrees>${p.lng}</LongitudeDegrees>
          </Position>${hrBlock}${cadenceBlock}
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