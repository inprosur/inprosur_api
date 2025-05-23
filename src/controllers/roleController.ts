import { Request, Response } from "express";
import * as RoleService from "../services/roleService";
import * as RolePermissionService from "../services/rolPermissionService";

// Función para agregar un nuevo rol usando el servicio de rol. Se espera que el cuerpo de la solicitud contenga las IDs de Rol y Permiso. Se maneja un error 400 en caso de que falten los IDs.
export const createRole = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Request body is missing",
      });
      return;
    }

    const { name, description, permissionId } = req.body;

    if (!name || !description || !permissionId) {
      res.status(400).json({
        error: "Missing required fields.",
        message: "Name, description and permissionId are required.",
      });
      return;
    }

    await RoleService.createRole({ name, description });
    const newRole = await RoleService.getRoleByName(name);
    if (!newRole) {
      res.status(400).json({
        error: "Failed to create role",
        message: "Role was not created or not found",
      });
      return;
    }

    await RolePermissionService.createRolePermission({
      roleId: newRole!.id!,
      permissionId: permissionId,
    });
    const newRolePermission =
      await RolePermissionService.getRollPermissionByIds({
        roleId: newRole!.id!,
        permissionId: permissionId,
      });
    if (!newRolePermission) {
      res.status(400).json({
        error: "Failed to create role-permisssion relationship",
        message: "Role-permission relationship was not created or not found",
      });
      return;
    }

    res.status(201).json({
      successs: true,
      data: {
        role: newRole,
        rolePermission: newRolePermission,
      },
      message: "Role and role-permission relationship created succsessfully",
    });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create role and role-permission relationship",
    });
  }
};
