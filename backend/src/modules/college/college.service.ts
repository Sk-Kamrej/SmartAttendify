import collegeRepository from "./college.repository.js";
import { CreateCollegeInput } from "./college.validator.js";
import ApiError from "../../utils/ApiError.js";

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

export default {
  createCollege,
  getAllColleges,
  getCollegeById,
};