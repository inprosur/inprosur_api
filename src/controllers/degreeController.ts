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

export const updateDegrees = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;

  if (isNaN(id) || !name) {
    res.status(400).json({ error: "Invalid data or ID" });
    return;
  }

  try {
    const updated = await DegressService.updateDegrees(id, { name, description });
    updated
      ? res.status(200).json(updated)
      : res.status(404).json({ error: "Degree not found" });
  } catch (error) {
    console.error("Error updating degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteDegrees = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  try {
    const deleted = await DegressService.deleteDegrees(id);
    deleted
      ? res.status(200).json({ message: "Degree deleted successfully" })
      : res.status(404).json({ error: "Degree not found" });
  } catch (error) {
    console.error("Error deleting degree:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};