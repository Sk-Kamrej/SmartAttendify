import { Prisma } from "@prisma/client";
import ApiError from "../../utils/ApiError.js";
import collegeRepository from "./college.repository.js";
import { getPagination } from "../../utils/pagination.js";

interface GetAllCollegesQuery {
  page?: string;
  limit?: string;
  search?: string;
  isActive?: string;
  sortBy?: "name" | "code" | "createdAt";
  sortOrder?: "asc" | "desc";
}

const createCollege = async (data: Prisma.CollegeCreateInput) => {
  const existingCode = await collegeRepository.findByCode(data.code);

  if (existingCode) {
    throw new ApiError(409, "College code already exists");
  }

  if (data.email) {
    const existingEmail = await collegeRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new ApiError(409, "College email already exists");
    }
  }

  return collegeRepository.create(data);
};

const getAllColleges = async (query: GetAllCollegesQuery) => {
  const { page, limit, skip } = getPagination(query);

  return collegeRepository.findAll({
    page,
    limit,
    skip,
    search: query.search,
    isActive:
      query.isActive === undefined
        ? undefined
        : query.isActive === "true",
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });
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
  data: Prisma.CollegeUpdateInput
) => {
  const college = await collegeRepository.findById(id);

  if (!college) {
    throw new ApiError(404, "College not found");
  }

  if (data.code && typeof data.code === "string") {
    const existingCode = await collegeRepository.findByCodeExceptId(
      data.code,
      id
    );

    if (existingCode) {
      throw new ApiError(409, "College code already exists");
    }
  }

  if (data.email && typeof data.email === "string") {
    const existingEmail = await collegeRepository.findByEmailExceptId(
      data.email,
      id
    );

    if (existingEmail) {
      throw new ApiError(409, "College email already exists");
    }
  }

  return collegeRepository.update(id, data);
};

const deleteCollege = async (id: string) => {
  const college = await collegeRepository.findById(id);

  if (!college) {
    throw new ApiError(404, "College not found");
  }

  return collegeRepository.softDelete(id);
};

export default {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
};