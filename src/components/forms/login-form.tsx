import { useState, type FormEvent } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/button";
import { ArrowRight, Github, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth-service";
import type { LoginUserRequest } from "../../types/auth";
import { useToast } from "../common/sonner-custom";


export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Usando FormData para capturar os dados do formulário
        const formData = new FormData(e.currentTarget);

        const loginData: LoginUserRequest = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        try {
            const response = await AuthService.login(loginData);
            toast.success(`Bem-vindo, ${response.name}!`);
            navigate('/dashboard');
        } catch (error: unknown) {
            // Trata erros de validação do backend no formato RFC 7807 (Problem Details)
            if (
                error &&
                typeof error === 'object' &&
                'response' in error &&
                error.response &&
                typeof error.response === 'object' &&
                'data' in error.response &&
                error.response.data &&
                typeof error.response.data === 'object' &&
                'errors' in error.response.data
            ) {
                const responseData = error.response.data as { errors: Record<string, string[]> };
                const errors = responseData.errors;

                // Extrai e exibe cada mensagem de erro de validação
                for (const field in errors) {
                    const messages = errors[field];
                    if (Array.isArray(messages)) {
                        for (const message of messages) {
                            toast.error('Erro de validação', message);
                        }
                    }
                }
            } else {
                // Fallback para outros tipos de erro
                const errorMessage = error instanceof Error ? error.message : 'Verifique suas credenciais.';
                toast.error('Falha no login', errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Cabeçalho */}
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bem-vindo de volta</h1>
                <p className="mt-2 text-slate-500">Por favor, insira seus dados para acessar sua conta.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="E-mail"
                    placeholder="nome@exemplo.com"
                    required
                    icon={Mail}
                />

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        {/* Label renderizado manualmente para layout customizado */}
                        <label htmlFor="password" className="text-sm font-medium text-slate-900">Senha</label>
                        <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        icon={Lock}
                        rightElement={
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        }
                    />
                </div>

                {/* Checkbox customizado (simples demais para abstrair agora, mas poderia ser um componente) */}
                <div className="flex items-center">
                    <div className="flex items-center h-5">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                        />
                    </div>
                    <div className="ml-2 text-sm">
                        <label htmlFor="remember-me" className="text-slate-500 cursor-pointer select-none">Lembrar deste dispositivo</label>
                    </div>
                </div>

                <Button type="submit" isLoading={isLoading} className="cursor-pointer">
                    {!isLoading && (
                        <>
                            <span className="mr-2">Entrar na conta</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </form>

            {/* Divisor */}
            {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Ou continue com</span>
                </div>
            </div> */}
            <p className="text-center text-sm text-slate-500">
                Não tem uma conta?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                    Cadastre-se agora
                </Link>
            </p>
        </div>
    );
};
