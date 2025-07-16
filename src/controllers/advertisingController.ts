import { Request, Response } from "../types/express";
import * as AdvertisingService from "../services/advertisingService";

export const createAdvertising = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Body is missing",
        message: "Request body is missing",
      });
      return;
    }
    const { imgUrl, externalUrl, courseId, status } = req.body;

    if (!imgUrl) {
      res.status(400).json({
        error: "Missing fields",
        message: "Missing requiered fields.",
      });
      return;
    }

    const newAdvertising = await AdvertisingService.createAdvertising({
      imgUrl,
      courseId: courseId ?? null,
      status,
      externalUrl: externalUrl ?? null,
      createdAt: new Date(),
    });

    res.status(200).json({
      success: true,
      data: newAdvertising,
      message: "Advetising created succesfully.",
    });
  } catch (error) {
    console.error("Error creating advertisingn item: ", error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

export const getAllAdvertisings = async (_req: Request, res: Response) => {
  try {
    const advertisings = await AdvertisingService.getAllAdvertisings();
    if (!advertisings || advertisings.length === 0) {
      res.status(404).json({
        error: "No data found",
        message: "No se encontraron anuncions",
      });
      return;
    }
    const advertisingStatus = advertisings.map((advertising) => ({
      ...advertising,
      status: Boolean(advertising.status),
    }));
    res.status(200).json({
      success: true,
      data: advertisingStatus,
      message: "Users retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching advertisings: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch Advertisings.",
    });
  }
};
