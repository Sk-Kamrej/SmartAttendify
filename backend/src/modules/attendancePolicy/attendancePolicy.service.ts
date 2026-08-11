import ApiError from "../../utils/ApiError.js";

import attendancePolicyRepository from "./attendancePolicy.repository.js";
import collegeRepository from "../college/college.repository.js";

const createAttendancePolicy = async (payload: {
  collegeId: string;
  minimumAttendancePercentage?: number;
  attendanceEditWindowMinutes?: number;
  allowLateAttendance?: boolean;
  allowLeaveAttendance?: boolean;
  autoLockAttendance?: boolean;
}) => {
  const college = await collegeRepository.findById(
    payload.collegeId
  );

  if (!college) {
    throw new ApiError(404, "College not found");
  }

  const existingPolicy =
    await attendancePolicyRepository.findByCollegeId(
      payload.collegeId
    );

  if (existingPolicy) {
    throw new ApiError(
      409,
      "Attendance policy already exists for this college"
    );
  }

  return attendancePolicyRepository.create({
    minimumAttendancePercentage:
      payload.minimumAttendancePercentage ?? 75,

    attendanceEditWindowMinutes:
      payload.attendanceEditWindowMinutes ?? 30,

    allowLateAttendance:
      payload.allowLateAttendance ?? true,

    allowLeaveAttendance:
      payload.allowLeaveAttendance ?? true,

    autoLockAttendance:
      payload.autoLockAttendance ?? true,

    college: {
      connect: {
        id: payload.collegeId,
      },
    },
  });
};

const getAttendancePolicyById = async (
  id: string
) => {
  const policy =
    await attendancePolicyRepository.findById(id);

  if (!policy) {
    throw new ApiError(
      404,
      "Attendance policy not found"
    );
  }

  return policy;
};

const getAttendancePolicyByCollegeId = async (
  collegeId: string
) => {
  const policy =
    await attendancePolicyRepository.findByCollegeId(
      collegeId
    );

  if (!policy) {
    throw new ApiError(
      404,
      "Attendance policy not found for this college"
    );
  }

  return policy;
};

const updateAttendancePolicy = async (
  id: string,
  payload: {
    minimumAttendancePercentage?: number;
    attendanceEditWindowMinutes?: number;
    allowLateAttendance?: boolean;
    allowLeaveAttendance?: boolean;
    autoLockAttendance?: boolean;
  }
) => {
  const policy =
    await attendancePolicyRepository.findById(id);

  if (!policy) {
    throw new ApiError(
      404,
      "Attendance policy not found"
    );
  }

  return attendancePolicyRepository.update(
    id,
    payload
  );
};

const deleteAttendancePolicy = async (
  id: string
) => {
  const policy =
    await attendancePolicyRepository.findById(id);

  if (!policy) {
    throw new ApiError(
      404,
      "Attendance policy not found"
    );
  }

  return attendancePolicyRepository.remove(id);
};

export default {
  createAttendancePolicy,
  getAttendancePolicyById,
  getAttendancePolicyByCollegeId,
  updateAttendancePolicy,
  deleteAttendancePolicy,
};
