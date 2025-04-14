import { defineStore } from "pinia";

export type PresenceStatus = "Present" | "Late" | "Absent" | "Partial";
export type NonComplianceType =
  | "None"
  | "Late Arrival"
  | "Early Leave"
  | "Did Not Check Back"
  | "Incomplete Attendance";

export interface AttendanceRecord {
  id: number;
  employeeName: string;
  getToWork: string;
  outOfOffice: string;
  reenterOffice: string;
  backToWork: string;
  presence: PresenceStatus;
  nonCompliance: NonComplianceType;
  reasonType: string;
  reason: string;
  newStartDate: string;
  newOfficeOpenDate: string;
  newOfficeReEntryDate: string;
  newReturnToWorkDate: string;
  notes: string;
  document: string;
}

function randomDate(baseDate: Date, hour: number, minute: number): string {
  const date = new Date(baseDate);
  date.setHours(hour);
  date.setMinutes(minute);
  return date.toISOString().slice(0, 16);
}

function getRandomName(): string {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Ethan",
    "Fatima",
    "George",
    "Hana",
    "Ivan",
    "Jenny",
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomEmployeeId(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

const presenceOptions: PresenceStatus[] = ["Present", "Late", "Absent", "Partial"];
const nonComplianceOptions: NonComplianceType[] = [
  "None",
  "Late Arrival",
  "Early Leave",
  "Did Not Check Back",
  "Incomplete Attendance",
];
const reasons = ["Medical Leave", "Urgent Task", "Personal Reason", "Technical Issue"];

export const useAttendanceStore = defineStore("attendance", {
  state: () => ({
    records: [] as AttendanceRecord[],
  }),
  actions: {
    initializeRecords() {
      const baseDate = new Date("2025-04-01");
      this.records = Array.from({ length: 20 }, () => {
        const presence = presenceOptions[Math.floor(Math.random() * presenceOptions.length)];
        const nonCompliance =
          nonComplianceOptions[Math.floor(Math.random() * nonComplianceOptions.length)];
        const reasonType = reasons[Math.floor(Math.random() * reasons.length)];
        const getToWork = randomDate(baseDate, 8, Math.floor(Math.random() * 60));
        const outOfOffice = randomDate(baseDate, 11, Math.floor(Math.random() * 60));
        const reenterOffice = randomDate(baseDate, 13, Math.floor(Math.random() * 60));
        const backToWork = randomDate(baseDate, 17, Math.floor(Math.random() * 60));

        return {
          id: getRandomEmployeeId(),
          employeeName: getRandomName(),
          getToWork,
          outOfOffice,
          reenterOffice,
          backToWork,
          presence,
          nonCompliance,
          reasonType,
          reason: "Random reason",
          newStartDate: getToWork,
          newOfficeOpenDate: outOfOffice,
          newOfficeReEntryDate: reenterOffice,
          newReturnToWorkDate: backToWork,
          notes: "Note about attendance",
          document: "doc.pdf",
        };
      });
    },

    addRecord(record: AttendanceRecord) {
      this.records.push(record); // use manually entered values
    },

    updateRecord(updated: AttendanceRecord) {
      const index = this.records.findIndex((r) => r.id === updated.id);
      if (index !== -1) this.records[index] = updated;
    },
  },
});
