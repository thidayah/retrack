import { durationToSeconds, getDistance, getDurationFromPace, parsePace, toUTC } from "@/helper";

export function generateTrackpoints({
  coordinates,
  distance, // meter
  duration, // detik
  avgPace = "6:45",
  avgHr = 150,
  avgCadence = 170,
  variability = 0.05,
  startTime = new Date()
}) {
  if (!coordinates || coordinates.length < 2) return [];

  // 🔥 hitung jarak per segment
  const segments = [];

  for (let i = 1; i < coordinates.length; i++) {
    const d = getDistance(coordinates[i - 1], coordinates[i]);
    segments.push(d);
  }

  const totalDistance = segments.reduce((a, b) => a + b, 0);


  // 🔥 buat weight berbasis jarak + variability
  const weights = segments.map((d) => {
    const factor = 1 + (Math.random() * 2 - 1) * variability;
    return d * factor;
  });

  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let totalDuration = 0;

  if (avgPace) {
    const pace = parsePace(avgPace);
    totalDuration = getDurationFromPace(totalDistance, pace);
  } else if (duration) {
    totalDuration = durationToSeconds(duration);
  } else {
    throw new Error("Either avgPace or duration must be provided");
  }

  // 🔥 waktu per segment (NORMALIZED)
  const segmentTimes = weights.map(
    (w) => (w / totalWeight) * totalDuration
  );

  // let currentTime = new Date(startTime);
  let currentTime = toUTC(startTime); // convert to UTC ISO string, assuming input is in WIB (UTC+7)

  const trackpoints = [];

  for (let i = 0; i < coordinates.length; i++) {
    if (i > 0) {
      currentTime = new Date(
        currentTime.getTime() + segmentTimes[i - 1] * 1000
      );
    }

    const hr = Math.round(avgHr + (Math.random() * 6 - 3));
    const cadence = Math.round(
      Math.max(150, Math.min(190, avgCadence + (Math.random() * 4 - 2))) / 2
    );

    trackpoints.push({
      lat: coordinates[i].lat,
      lng: coordinates[i].lng,
      time: currentTime.toISOString(),
      hr,
      cadence,
      // cadence: Math.round(cadence / 2),
    });
  }

  return trackpoints;
}

export function generateTrackpointsV2({
  coordinates,
  distance,
  duration,
  avgPace = "6:45",
  avgHr = 150,
  avgCadence = 170,
  variability = 0.05,
  startTime = new Date()
}) {
  if (!coordinates || coordinates.length < 2) return [];

  // 🔹 distance per segment
  const segments = [];
  for (let i = 1; i < coordinates.length; i++) {
    segments.push(getDistance(coordinates[i - 1], coordinates[i]));
  }

  const totalDistance = segments.reduce((a, b) => a + b, 0);

  // 🔹 duration resolve
  let totalDuration = 0;
  if (avgPace) {
    totalDuration = getDurationFromPace(totalDistance, parsePace(avgPace));
  } else if (duration) {
    totalDuration = durationToSeconds(duration);
  } else {
    throw new Error("Either avgPace or duration must be provided");
  }

  // 🔹 progress-based curve (0 → 1)
  const getPaceFactor = (progress) => {
    if (progress < 0.2) return 1.1;      // warmup (lebih lambat)
    if (progress < 0.8) return 1.0;      // steady
    return 0.95;                         // finish (lebih cepat)
  };

  const getHrFactor = (progress) => {
    if (progress < 0.2) return 0.9;
    if (progress < 0.8) return 1.0;
    return 1.05;
  };

  // 🔹 weight + variability + curve
  const weights = segments.map((d, i) => {
    const progress = i / segments.length;

    const baseFactor = getPaceFactor(progress);
    const randomFactor = 1 + (Math.random() * 2 - 1) * variability;

    return d * baseFactor * randomFactor;
  });

  const totalWeight = weights.reduce((a, b) => a + b, 0);

  const segmentTimes = weights.map(
    (w) => (w / totalWeight) * totalDuration
  );

  let currentTime = toUTC(startTime);

  const trackpoints = [];

  for (let i = 0; i < coordinates.length; i++) {
    const progress = i / coordinates.length;

    if (i > 0) {
      currentTime = new Date(
        currentTime.getTime() + segmentTimes[i - 1] * 1000
      );
    }

    // 🔥 HR curve
    const hrBase = avgHr * getHrFactor(progress);
    const hr = Math.round(hrBase + (Math.random() * 6 - 3));

    // 🔥 cadence mengikuti pace
    const paceInfluence = 1 / getPaceFactor(progress);
    const cadenceRaw =
      avgCadence * paceInfluence + (Math.random() * 4 - 2);

    const cadence = Math.round(
      Math.max(150, Math.min(190, cadenceRaw)) / 2
    );

    trackpoints.push({
      lat: coordinates[i].lat,
      lng: coordinates[i].lng,
      time: currentTime.toISOString(),
      hr,
      cadence,
    });
  }

  return trackpoints;
}