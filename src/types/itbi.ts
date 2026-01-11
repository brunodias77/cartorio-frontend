// ==========================================
// GET ALL (Listagem)
// ==========================================

export interface ItbiItemResponse {
  id: number;
  nomeCliente: string;
  telefoneCliente: string;
  numeroProtocolo: string;
  solicitadoDescricao: string;
  enviadoDescricao: string;
  dataCadastro: string;
}

// Alias para uso simplificado
export interface Itbi {
  id: number;
  nomeCliente: string;
  telefoneCliente: string;
  numeroProtocolo: string;
  solicitadoDescricao: string;
  enviadoDescricao: string;
  dataCadastro: string;
}

export interface GetAllItbiResponse {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  items: ItbiItemResponse[];
}

export interface GetAllItbiParams {
  pageNumber?: number;
  pageSize?: number;
}
// ==========================================
// CREATE
// ==========================================

export interface CreateItbiRequest {
  nomeCliente: string;
  telefoneCliente: string;
}

export interface CreateItbiResponse {
  id: number;
  nomeCliente: string;
  telefoneCliente: string;
  numeroProtocolo: string;
  solicitadoId: number;
  solicitadoDescricao: string;
  enviadoId: number;
  enviadoDescricao: string;
  dataCadastro: string;
}

// ==========================================
// UPDATE
// ==========================================

export interface UpdateItbiRequest {
  id: number;
  nomeCliente: string;
  telefoneCliente?: string | null;
  solicitadoId?: number | null;
  numeroProtocolo?: string | null;
  enviadoId?: number | null;
}

export interface UpdateItbiResponse {
  id: number;
  nomeCliente: string;
  telefoneCliente: string;
  numeroProtocolo: string;
  solicitadoDescricao: string;
  enviadoDescricao: string;
}

// ==========================================
// DELETE
// ==========================================

export interface DeleteItbiResponse {
  id: number;
  sucesso: boolean;
  dataExclusao: string;
}
