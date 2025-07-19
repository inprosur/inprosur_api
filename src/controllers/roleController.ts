import {
  CustomResponse,
  CreateRoleRequest,
  RequestWithIdParams,
} from "../types/express";
import * as RoleService from "../services/roleService";
import * as RolePermissionService from "../services/rolPermissionService";

// Función para agregar un nuevo rol usando el servicio de rol. Se espera que el cuerpo de la solicitud contenga las IDs de Rol y Permiso. Se maneja un error 400 en caso de que falten los IDs.
export const createRole = async (
  req: CreateRoleRequest,
  res: CustomResponse
) => {
  try {
    // Verifica si el cuerpo de la solicitud contiene los campos requeridos: name, descirption y permissionId. Si falta alguno de ellos, devuelve un error 400
    const { name, description, permissionId } = req.body;
    if (!name || !description || !permissionId) {
      res.status(400).json({
        error: "Missing required fields.",
        message: "Name, description and permissionId are required.",
      });
      return;
    }

    const newRole = await RoleService.createRole({
      name,
      description,
    });

    const newRolePermission = await RolePermissionService.createRolePermission({
      roleId: newRole!.id!,
      permissionId,
    });

    // Si todo sale bien, devuelve un mensaje de éxito y el nuevo rol y la relación de rol-permission
    res.status(201).json({
      successs: true,
      data: {
        role: newRole,
        rolePermission: newRolePermission,
      },
      message: "Role and role-permission relationship created succsessfully",
    });
  } catch (error) {
    // Maneja cualquier error que ocurra durante el proceso de creación del rol y la relación de rol-permission. Devuelve un error 500 si ocurre un error interno del servidor
    console.error("Error creating role:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create role and role-permission relationship",
    });
  }
};

// Función para obtener todos los roles usando el servicio del rolService. Se maneja un error 404 si no se encuentran roles en la base de datos.
export const getAllRoles = async (
  _req: CreateRoleRequest,
  res: CustomResponse
) => {
  try {
    const roles = await RoleService.getAllRoles();
    if (!roles || roles.length === 0) {
      res.status(404).json({
        error: "No roles found",
        message: "No roles found in the database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: roles,
      message: "Roles retrieved successfully.",
    });
  } catch (error) {
    console.error("Error retrieving roles:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to retrieve roles.",
    });
  }
};

export const getRoleById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  try {
    const roleId = Number(req.params.id);
    if (!Number.isInteger(roleId) || roleId <= 0) {
      res.status(400).json({
        error: "Invalid role ID",
        message: "Role ID must be a positive integer.",
      });
      return;
    }

    const role = await RoleService.getRoleById(roleId);
    if (!role) {
      res.status(404).json({
        error: "Role not found",
        message: `No role found with ID ${roleId}.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: role,
      message: "Role retrieved successfully.",
    });
  } catch (error) {
    console.error("Error retrieving role:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to retrieve role.",
    });
  }
};
