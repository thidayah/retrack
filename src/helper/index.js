export function toUTC(dateString) {
  // return new Date(dateString + "+07:00").toISOString();
  return new Date(dateString + "+07:00");
}

export function durationToSeconds(duration) {
  const parts = duration.split(":").map(Number);

  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h * 3600 + m * 60 + s;
  }

  if (parts.length === 2) {
    const [m, s] = parts;
    return m * 60 + s;
  }

  throw new Error("Format duration tidak valid");
}

export function getDurationFromPace(distanceMeters, paceSecPerKm) {
  const distanceKm = distanceMeters / 1000;
  return Math.round(distanceKm * paceSecPerKm); // hasil detik
}

export function parsePace(paceStr) {
  const [min, sec] = paceStr.split(":").map(Number);
  return min * 60 + sec;
}

export function calculateDistance(trackpoints) {
  let total = 0;

  for (let i = 1; i < trackpoints.length; i++) {
    total += getDistance(trackpoints[i - 1], trackpoints[i]);
  }

  return total;
}

export function getDistance(p1, p2) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(p2.lat - p1.lat);
  const dLng = toRad(p2.lng - p1.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(p1.lat)) *
    Math.cos(toRad(p2.lat)) *
    Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}