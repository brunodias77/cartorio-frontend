import { Sidebar } from "../../components/layout/sidebar";
import { Header } from "../../components/layout/header";
import { ProtocolStats } from "../../components/dashboard/protocol-stats";
import { ItbiService } from "../../services/itbi-service";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "../../components/common/sonner-custom";
import { ItbiSearch } from "../../components/common/itbi-search";
import { ItbiModal } from "../../components/common/itbi-modal";
import { ItbiForm } from "../../components/forms/itbi-form";
import { ItbiEditForm } from "../../components/forms/itbi-edit-form";
import { ItbiTableList } from "../../components/common/itbi-table-list";
import type { Itbi } from "../../types/itbi";

export const DashboardPage = () => {
    const [stats, setStats] = useState({ total: 0, pendingSent: 0, completed: 0 });
    const [itbis, setItbis] = useState<Itbi[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItbi, setEditingItbi] = useState<Itbi | null>(null);
    const toast = useToast();

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleCreateClick = () => {
        setIsCreateModalOpen(true);
    };

    const handleEditClick = (itbi: Itbi) => {
        setEditingItbi(itbi);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: number) => {
        const deleteItbi = async () => {
            try {
                await ItbiService.delete(id);
                toast.success('ITBI excluído com sucesso!');
                fetchData();
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir';
                toast.error('Erro ao excluir', errorMessage);
            }
        };

        toast.confirm('Confirmar exclusão', deleteItbi, 'Tem certeza que deseja excluir este protocolo?');
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await ItbiService.getAll({ pageNumber: 1, pageSize: 100 });
            const items = response.data?.items ?? [];

            setItbis(items);

            const total = items.length;
            const pendingSent = items.filter((item) => item.enviadoDescricao !== "Sim").length;
            const completed = items.filter((item) =>
                item.solicitadoDescricao === "Sim" && item.enviadoDescricao === "Sim"
            ).length;

            setStats({ total, pendingSent, completed });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            toast.error('Erro ao carregar dados', errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        fetchData();
    };

    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        setEditingItbi(null);
        fetchData();
    };

    // Filtrar itbis pelo termo de busca
    const filteredItbis = itbis.filter(itbi =>
        itbi.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itbi.numeroProtocolo.includes(searchTerm)
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Header />
            <Sidebar />

            <main className="pt-24 px-4 pb-12 lg:pl-72 lg:pr-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">Controle de IBTI</h1>
                    <p className="text-slate-500 text-sm">
                        Gerencie solicitações e envios de documentos do cartório.
                    </p>
                </div>
                {isLoading ? (
                    <div className="flex justify-center p-8">
                        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <ProtocolStats stats={stats} />
                )}

                <ItbiSearch
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onCreateClick={handleCreateClick}
                />

                <ItbiTableList
                    itbis={filteredItbis}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                />

            </main>

            {/* Modal de criação */}
            <ItbiModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                title="Novo ITBI"
            >
                <ItbiForm
                    onSuccess={handleCreateSuccess}
                    onCancel={() => setIsCreateModalOpen(false)}
                />
            </ItbiModal>

            {/* Modal de edição */}
            <ItbiModal
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false); setEditingItbi(null); }}
                title="Editar ITBI"
            >
                {editingItbi && (
                    <ItbiEditForm
                        itbi={editingItbi}
                        onSuccess={handleEditSuccess}
                        onCancel={() => { setIsEditModalOpen(false); setEditingItbi(null); }}
                    />
                )}
            </ItbiModal>
        </div>
    );
}



