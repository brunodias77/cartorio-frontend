// itbi-service.ts
import api from "./api";
import type {
  CreateItbiRequest,
  CreateItbiResponse,
  GetAllItbiParams,
  GetAllItbiResponse,
  UpdateItbiRequest,
  UpdateItbiResponse,
  DeleteItbiResponse,
} from "../types/itbi";
import type { ApiResponse } from "../types/api-response";

export const ItbiService = {
  /**
   * Busca todos os registros de ITBI com paginação.
   * Endpoint: GET /api/Itbi
   */
  getAll: async (
    params?: GetAllItbiParams
  ): Promise<ApiResponse<GetAllItbiResponse>> => {
    const response = await api.get<ApiResponse<GetAllItbiResponse>>("/Itbi", {
      params: {
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
      },
    });
    return response.data;
  },

  /**
   * Cria um novo registro de ITBI.
   * Endpoint: POST /api/Itbi
   */
  create: async (
    data: CreateItbiRequest
  ): Promise<ApiResponse<CreateItbiResponse>> => {
    const response = await api.post<ApiResponse<CreateItbiResponse>>(
      "/Itbi",
      data
    );
    return response.data;
  },

  /**
   * Atualiza um registro existente.
   * Endpoint: PUT /api/Itbi/{id}
   */
  update: async (
    id: number,
    data: Omit<UpdateItbiRequest, "id">
  ): Promise<ApiResponse<UpdateItbiResponse>> => {
    // O backend espera o ID na URL E no corpo (body), conforme validação:
    // "if (id != request.Id) return BadRequest..."
    const payload: UpdateItbiRequest = { ...data, id };

    const response = await api.put<ApiResponse<UpdateItbiResponse>>(
      `/Itbi/${id}`,
      payload
    );
    return response.data;
  },

  /**
   * Remove um registro.
   * Endpoint: DELETE /api/Itbi/{id}
   */
  delete: async (id: number): Promise<ApiResponse<DeleteItbiResponse>> => {
    const response = await api.delete<ApiResponse<DeleteItbiResponse>>(
      `/Itbi/${id}`
    );
    return response.data;
  },
};
