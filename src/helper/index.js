export function toUTC(dateString) {
  // return new Date(dateString + "+07:00").toISOString();
  return new Date(dateString + "+07:00");
}

export function getLocalDateTime(date = new Date()) {
  const pad = (num) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


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

export function meterToKm(meter, decimals = 2) {
  return (meter / 1000).toFixed(decimals);
}

export function getDurationFromDistanceAndPace(
  distanceMeters,
  paceOrSpeed,
  mode = "run" // "run" | "ride"
) {
  if (!distanceMeters || distanceMeters <= 0) {
    throw new Error("Distance must be greater than 0");
  }

  const distanceKm = distanceMeters / 1000;

  let totalSeconds = 0;

  // 🚴 RIDE MODE → speed (km/h)
  if (mode === "ride") {
    let speed = 0;

    if (typeof paceOrSpeed === "string") {
      speed = parseFloat(paceOrSpeed.replace("km/h", "").trim());
    } else {
      speed = paceOrSpeed;
    }

    if (!speed || speed <= 0) {
      throw new Error("Invalid speed");
    }

    const hours = distanceKm / speed;
    totalSeconds = Math.round(hours * 3600);
  }

  // 🏃 RUN MODE → pace (mm:ss)
  else {
    const parts = paceOrSpeed.split(":").map(Number);

    let paceSecPerKm = 0;

    if (parts.length === 2) {
      paceSecPerKm = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      paceSecPerKm =
        parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else {
      throw new Error("Invalid pace format");
    }

    totalSeconds = Math.round(distanceKm * paceSecPerKm);
  }

  // 🔹 convert ke hh:mm:ss
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function getPaceFromDistanceAndDuration(
  distanceMeters,
  duration,
  mode = "run" // "run" | "ride"
) {
  if (!distanceMeters || distanceMeters <= 0) {
    throw new Error("Distance must be greater than 0");
  }

  const parts = duration.split(":").map(Number);

  let totalSeconds = 0;

  if (parts.length === 3) {
    totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    totalSeconds = parts[0] * 60 + parts[1];
  } else {
    throw new Error("Invalid duration format");
  }

  const distanceKm = distanceMeters / 1000;

  // 🚴 RIDE MODE → km/h
  if (mode === "ride") {
    const hours = totalSeconds / 3600;
    const speed = distanceKm / hours;

    return `${speed.toFixed(1)}`;
  }

  // 🏃 RUN MODE → min/km
  const paceSecPerKm = totalSeconds / distanceKm;

  let minutes = Math.floor(paceSecPerKm / 60);
  let seconds = Math.round(paceSecPerKm % 60);

  // fix 60 detik
  if (seconds === 60) {
    minutes += 1;
    seconds = 0;
  }

  const pad = (n) => String(n).padStart(2, "0");

  return `${pad(minutes)}:${pad(seconds)}`;
}

export function downloadFile(fileString, type = "gpx", filename = "activity") {
  const blob = new Blob([fileString], { type: type === "gpx" ? "application/gpx+xml" : "application/xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename + '.' + type;
  a.click();

  URL.revokeObjectURL(url);
}