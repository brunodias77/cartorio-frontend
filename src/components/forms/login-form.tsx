import { useState, type FormEvent } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/button";
import { ArrowRight, Github, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { SocialButton } from "../common/social-button";
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
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Verifique suas credenciais.';
            toast.error('Falha no login', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Cabeçalho */}
            <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                    <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                </div>
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
                        <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
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

                <Button type="submit" isLoading={isLoading}>
                    {!isLoading && (
                        <>
                            <span className="mr-2">Entrar na conta</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </form>

            {/* Divisor */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-slate-500">Ou continue com</span>
                </div>
            </div>

            {/* Botões Sociais */}
            <div className="grid grid-cols-2 gap-4">
                <SocialButton>
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                </SocialButton>
                <SocialButton icon={Github}>
                    GitHub
                </SocialButton>
            </div>

            <p className="text-center text-sm text-slate-500">
                Não tem uma conta?{' '}
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                    Cadastre-se agora
                </Link>
            </p>
        </div>
    );
};
