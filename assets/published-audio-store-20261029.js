let publishedManifest;
const publishedCache = new Map();

async function readPublishedAudio(id) {
  publishedManifest ??= fetch(new URL("audio/manifest.json", document.baseURI)).then(async response => {
    if (!response.ok) throw new Error("Published audio manifest could not load");
    return await response.json();
  }).catch(() => { publishedManifest = undefined; return {}; });
  const clip = (await publishedManifest)[id];
  if (!clip) return undefined;
  let blob = publishedCache.get(id);
  if (!blob) {
    const response = await fetch(new URL(clip.src, document.baseURI));
    if (!response.ok) throw new Error("Published audio could not load: " + id);
    blob = await response.blob();
    if (!blob.size) throw new Error("Published audio is empty: " + id);
    publishedCache.set(id, blob);
    if (publishedCache.size > 24) publishedCache.delete(publishedCache.keys().next().value);
  }
  return { id, blob, name: clip.name, enabled: true };
}

async function audioDB() {
  return await new Promise((resolve, reject) => {
    const request = indexedDB.open("kikiau-audio", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("recordings", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readLocalAudio(id) {
  const db = await audioDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("recordings", "readonly");
    const request = transaction.objectStore("recordings").get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}

export async function readAudio(id) {
  const local = await readLocalAudio(id).catch(() => undefined);
  return local ?? await readPublishedAudio(id);
}

export async function writeAudio(record) {
  const db = await audioDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("recordings", "readwrite");
    transaction.objectStore("recordings").put(record);
    transaction.oncomplete = () => { db.close(); resolve(); };
    transaction.onerror = () => { db.close(); reject(transaction.error); };
  });
}
