import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export const createJob = async (jobData) => {
  const ref = collection(db, "jobs");
  const res = await addDoc(ref, {
    ...jobData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return res.id;
};

// READ jobs (current user)
export const getJobsByUser = async (uid) => {
  const ref = collection(db, "jobs");

  const q = query(
    ref,
    where("userId", "==", uid),
    // orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Get Job By jobId
export const getJobById = async (jobId) => {
  const ref = doc(db, "jobs", jobId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

// UPDATE job
export const updateJob = async (jobId, updates) => {
  const ref = doc(db, "jobs", jobId);
  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
  return true;
};

// Delete Jobs
export const deleteJob = async (jobId) => {
  const ref = doc(db, "jobs", jobId);
  await deleteDoc(ref);
  return true;
};
