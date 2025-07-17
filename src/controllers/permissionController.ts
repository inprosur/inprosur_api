
import { CustomResponse, GetPermissionParams, PermissionRequest } from "../types/express";
import * as PermissionService from "../services/permissionService";

// Función para crear un nuevo permiso, pasamos el permiso al servicio de permisos
export const createPermission = async (req: PermissionRequest, res: CustomResponse) => {
  try {

    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Name, description are required",
      });
      return;
    }

    const newPermission = await PermissionService.createPermission({
      name,
      description,
    });
    res.status(201).json({
      success: true,
      data: newPermission,
      message: "Permission created successfully.",
    });
  } catch (error) {
    console.error("Error creating permission:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create the permission.",
    });
  }
};

//Función para obtener todos los permisos, llamando al servicio de permisos
export const getAllPermissions = async (_req: PermissionRequest, res: CustomResponse) => {
  try {
    const users = await PermissionService.getAllPermissions();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching permissions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Función para obtener un permiso por su ID, llamando al servicio de permisos
export const getPermissionById = async (req: GetPermissionParams, res: CustomResponse) => {
  const permissionId = parseInt(req.params.id);
  if (isNaN(permissionId)) {
    res.status(400).json({ error: "Invalid permission ID" });
  } else {
    try {
      const permission = await PermissionService.getPermissionById(
        permissionId
      );
      if (permission) {
        res.status(200).json(permission);
      } else {
        res.status(404).json({ error: "Permission not found" });
      }
    } catch (error) {
      console.error("Error fetching permission:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
