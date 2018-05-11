export type Examiner = {
  id: number;
  firstName: string;
  lastName: string;
  slots: Slot[];
};

export type Candidate = {
  id: number;
  firstName: string;
  lastName: string;
  licenseNum: string;
  pass: boolean;
};

export type Slot = {
  time: string;
  type: string;
  candidate: Candidate;
};

export type Query = {
  examiners: Examiner[];
};
