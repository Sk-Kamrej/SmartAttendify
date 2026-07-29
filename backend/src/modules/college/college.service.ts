import collegeRepository from "./college.repository.js";
import { CreateCollegeInput } from "./college.validator.js";
import ApiError from "../../utils/ApiError.js";
import { Prisma } from "@prisma/client";

const createCollege = async (data: CreateCollegeInput) => {
  // Check duplicate college code
  const existingCode = await collegeRepository.findByCode(data.code);

  if (existingCode) {
    throw new ApiError(409, "College code already exists");
  }

  // Check duplicate email
  if (data.email) {
    const existingEmail = await collegeRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new ApiError(409, "College email already exists");
    }
  }

  return collegeRepository.create({
    name: data.name,
    code: data.code,
    email: data.email,
    phone: data.phone,
    website: data.website,
    logoUrl: data.logoUrl,
    address: data.address,
  });
};

const getAllColleges = async () => {
  return collegeRepository.findAll();
};

const getCollegeById = async (id: string) => {
  const college = await collegeRepository.findById(id);

  if (!college) {
    throw new ApiError(404, "College not found");
  }

  return college;
};

const updateCollege = async (
  id: string,
  payload: Prisma.CollegeUpdateInput
) => {
  // Check if college exists
  const existingCollege = await collegeRepository.findById(id);

  if (!existingCollege) {
    throw new ApiError(404, "College not found");
  }

  // Check duplicate code
  if (payload.code && typeof payload.code === "string") {
    const codeExists = await collegeRepository.findByCodeExceptId(
      payload.code,
      id
    );

    if (codeExists) {
      throw new ApiError(409, "College code already exists");
    }
  }

  // Check duplicate email
  if (payload.email && typeof payload.email === "string") {
    const emailExists = await collegeRepository.findByEmailExceptId(
      payload.email,
      id
    );

    if (emailExists) {
      throw new ApiError(409, "College email already exists");
    }
  }

  return collegeRepository.update(id, payload);
};

export default {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
};