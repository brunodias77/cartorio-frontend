import { useState, type FormEvent, type ChangeEvent, useEffect } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/button';
import { User, Phone, FileText, CheckCircle, Send } from 'lucide-react';
import { ItbiService } from '../../services/itbi-service';
import { useToast } from '../common/sonner-custom';
import type { Itbi } from '../../types/itbi';

interface ItbiEditFormProps {
    itbi: Itbi;
    onSuccess: () => void;
    onCancel: () => void;
}

// Função para aplicar máscara de telefone brasileiro
const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 11);

    if (limited.length <= 2) {
        return limited;
    } else if (limited.length <= 7) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else if (limited.length <= 10) {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
    } else {
        return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
};

// Remove a máscara e retorna apenas números
const unformatPhone = (value: string): string => {
    return value.replace(/\D/g, '');
};

// Opções de status (baseado no backend)
const STATUS_OPTIONS = [
    { id: 1, label: 'Pendente' },
    { id: 2, label: 'Sim' },
    { id: 3, label: 'Não' },
];

// Obter ID do status pela descrição
const getStatusIdByDescription = (descricao: string): number => {
    const option = STATUS_OPTIONS.find(o => o.label === descricao);
    return option?.id ?? 1;
};

export const ItbiEditForm = ({ itbi, onSuccess, onCancel }: ItbiEditFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [nomeCliente, setNomeCliente] = useState(itbi.nomeCliente);
    const [telefone, setTelefone] = useState(formatPhone(itbi.telefoneCliente || ''));
    const [solicitadoId, setSolicitadoId] = useState(getStatusIdByDescription(itbi.solicitadoDescricao));
    const [numeroProtocolo, setNumeroProtocolo] = useState(itbi.numeroProtocolo);
    const [enviadoId, setEnviadoId] = useState(getStatusIdByDescription(itbi.enviadoDescricao));
    const toast = useToast();

    useEffect(() => {
        setNomeCliente(itbi.nomeCliente);
        setTelefone(formatPhone(itbi.telefoneCliente || ''));
        setSolicitadoId(getStatusIdByDescription(itbi.solicitadoDescricao));
        setNumeroProtocolo(itbi.numeroProtocolo);
        setEnviadoId(getStatusIdByDescription(itbi.enviadoDescricao));
    }, [itbi]);

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        setTelefone(formatted);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação do telefone (apenas se preenchido)
        const phoneNumbers = unformatPhone(telefone);
        if (phoneNumbers.length > 0 && (phoneNumbers.length < 10 || phoneNumbers.length > 11)) {
            toast.error('Telefone inválido', 'Digite um telefone com DDD (10 ou 11 dígitos)');
            return;
        }

        setIsLoading(true);

        try {
            await ItbiService.update(itbi.id, {
                nomeCliente,
                telefoneCliente: phoneNumbers,
                solicitadoId,
                numeroProtocolo,
                enviadoId,
            });
            toast.success('ITBI atualizado com sucesso!');
            onSuccess();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar ITBI';
            toast.error('Erro ao atualizar', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                id="nomeCliente"
                name="nomeCliente"
                type="text"
                label="Nome do Cliente"
                placeholder="Digite o nome completo"
                required
                icon={User}
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
            />

            <Input
                id="telefoneCliente"
                name="telefoneCliente"
                type="tel"
                label="Telefone (opcional)"
                placeholder="(00) 00000-0000"
                icon={Phone}
                value={telefone}
                onChange={handlePhoneChange}
            />

            {/* Status Solicitado */}
            <div className="space-y-2">
                <label htmlFor="solicitadoId" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <CheckCircle className="size-5 text-slate-400" />
                    Solicitado
                </label>
                <select
                    id="solicitadoId"
                    value={solicitadoId}
                    onChange={(e) => setSolicitadoId(Number(e.target.value))}
                    className="w-full h-11 px-4 border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                    {STATUS_OPTIONS.map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                </select>
            </div>

            <Input
                id="numeroProtocolo"
                name="numeroProtocolo"
                type="text"
                label="Número do Protocolo"
                placeholder="Digite o número do protocolo"
                icon={FileText}
                value={numeroProtocolo}
                onChange={(e) => setNumeroProtocolo(e.target.value)}
            />

            {/* Status Enviado */}
            <div className="space-y-2">
                <label htmlFor="enviadoId" className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <Send className="size-5 text-slate-400" />
                    Enviado
                </label>
                <select
                    id="enviadoId"
                    value={enviadoId}
                    onChange={(e) => setEnviadoId(Number(e.target.value))}
                    className="w-full h-11 px-4 border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                    {STATUS_OPTIONS.map(option => (
                        <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                    Cancelar
                </button>
                <Button type="submit" isLoading={isLoading} className="flex-1">
                    {!isLoading && 'Salvar Alterações'}
                </Button>
            </div>
        </form>
    );
};
