import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import academicSessionService from "./academicSession.service.js";

const createAcademicSession = catchAsync(
  async (req: Request, res: Response) => {
    const session =
      await academicSessionService.createAcademicSession(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Academic session created successfully",
        session
      )
    );
  }
);

const getAllAcademicSessions = catchAsync(
  async (req: Request, res: Response) => {
    const sessions =
      await academicSessionService.getAllAcademicSessions(
        req.query
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Academic sessions fetched successfully",
        sessions
      )
    );
  }
);

const getAcademicSessionById = catchAsync(
  async (req: Request, res: Response) => {
    const session =
      await academicSessionService.getAcademicSessionById(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Academic session fetched successfully",
        session
      )
    );
  }
);

const updateAcademicSession = catchAsync(
  async (req: Request, res: Response) => {
    const session =
      await academicSessionService.updateAcademicSession(
        String(req.params.id),
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Academic session updated successfully",
        session
      )
    );
  }
);

const deleteAcademicSession = catchAsync(
  async (req: Request, res: Response) => {
    const session =
      await academicSessionService.deleteAcademicSession(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Academic session deleted successfully",
        session
      )
    );
  }
);

export default {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
};
