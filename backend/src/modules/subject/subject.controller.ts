import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import subjectService from "./subject.service.js";

const createSubject = catchAsync(async (req: Request, res: Response) => {
  const subject = await subjectService.createSubject(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Subject created successfully",
      subject
    )
  );
});

const getAllSubjects = catchAsync(
  async (req: Request, res: Response) => {
    const subjects = await subjectService.getAllSubjects(req.query);

    res.status(200).json(
      new ApiResponse(
        true,
        "Subjects fetched successfully",
        subjects
      )
    );
  }
);

const getSubjectById = catchAsync(
  async (req: Request, res: Response) => {
    const subject = await subjectService.getSubjectById(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Subject fetched successfully",
        subject
      )
    );
  }
);

const updateSubject = catchAsync(
  async (req: Request, res: Response) => {
    const subject = await subjectService.updateSubject(
      String(req.params.id),
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Subject updated successfully",
        subject
      )
    );
  }
);

const deleteSubject = catchAsync(
  async (req: Request, res: Response) => {
    const subject = await subjectService.deleteSubject(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Subject deleted successfully",
        subject
      )
    );
  }
);

export default {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
