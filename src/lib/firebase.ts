import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "gosemsas-mock.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "gosemsas-mock",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "gosemsas-mock.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:mock",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Firestore helpers for live-dashboard
export async function getLiveDashboard(year: string) {
  try {
    const ref = doc(db, "live_dashboard", year);
    const snap = await getDoc(ref);
    if (snap.exists()) return snap.data();
    return null;
  } catch (e) {
    console.warn("Firebase get failed, using mock:", e);
    return null;
  }
}

export async function setLiveDashboard(year: string, data: any) {
  try {
    const ref = doc(db, "live_dashboard", year);
    await setDoc(ref, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (e) {
    console.warn("Firebase set failed:", e);
    return false;
  }
}

export function subscribeLiveDashboard(year: string, cb: (data:any)=>void) {
  try {
    const ref = doc(db, "live_dashboard", year);
    return onSnapshot(ref, (snap) => {
      if (snap.exists()) cb(snap.data());
    });
  } catch {
    return () => {};
  }
}

export const isFirebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig.projectId !== "gosemsas-mock";
