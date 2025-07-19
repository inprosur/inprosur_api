import {
  CustomResponse,
  DegreeRequest,
  RequestWithIdParams,
} from "../types/express";
import * as DegressService from "../services/degreeService";

export const getAllDegrees = async (
  _req: DegreeRequest,
  res: CustomResponse
) => {
  try {
    const degress = await DegressService.getAllDegrees();
    res.status(200).json(degress);
  } catch (error) {
    console.error("Error fetching degress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDegreesById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  try {
    const degress = await DegressService.getDegreesById(id);
    degress
      ? res.status(200).json(degress)
      : res.status(404).json({ error: "Degress not found" });
  } catch (error) {
    console.error("Error fetching degress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createDegrees = async (
  req: DegreeRequest,
  res: CustomResponse
) => {
  const { name, description } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  try {
    const newDegress = await DegressService.createDegrees({
      name,
      description,
    });
    res.status(201).json(newDegress);
  } catch (error) {
    console.error("Error creating degress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
