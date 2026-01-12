import { RegisterForm } from "../../components/forms/register-form";

export const RegisterPage = () => {
    return (
        <div className="min-h-screen w-full flex bg-white font-sans text-slate-900">
            {/* Lado Esquerdo - Container do Formulário */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 xl:p-24 animate-in fade-in slide-in-from-left-4 duration-700">
                <RegisterForm />
            </div>

            {/* Lado Direito - Imagem e Estilo */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-900">
                <div className="absolute inset-0  mix-blend-overlay z-10" />
                <img
                    src="https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Office Workspace"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-20 flex flex-col justify-end p-16 text-white h-full w-full">
                    {/* <div className="mb-8">
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <blockquote className="text-2xl font-medium leading-relaxed mb-6">
                            "Esta plataforma revolucionou completamente a forma como gerenciamos nossos fluxos de trabalho. A interface é intuitiva e o desempenho é impecável."
                        </blockquote>
                        <div>
                            <p className="font-semibold text-lg">Sofia Andrade</p>
                            <p className="text-indigo-200">Gerente de Produto, TechFlow</p>
                        </div>
                    </div> */}
                    <div className="flex justify-between items-end border-t border-white/20 pt-8">
                        <p className="text-sm text-indigo-200">© 2026 @diasdev_  Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
