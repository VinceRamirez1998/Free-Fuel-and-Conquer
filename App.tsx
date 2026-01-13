
import React, { useState } from 'react';
import type { FormData, MealPlanResponse } from './types';
import { INITIAL_FORM_STATE, TRANSLATIONS } from './constants';
import UserInputForm from './components/UserInputForm';
import MealPlanDisplay from './components/MealPlanDisplay';
import { generateMealPlan } from './services/geminiService';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
    const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Derived language from formData
    const language = formData.language || 'en';
    const t = TRANSLATIONS[language];

    const handleFormSubmit = async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        setMealPlan(null);
        setFormData(data); // Sync state back from form
        try {
            const plan = await generateMealPlan(data);
            setMealPlan(plan);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData(INITIAL_FORM_STATE);
        setMealPlan(null);
        setError(null);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Logo Container */}
                        <div className="flex-shrink-0 w-12 h-12 bg-black border-2 border-lime-400 rounded-lg flex items-center justify-center overflow-hidden">
                             {/* 
                                NOTE: Replace the src below with the actual path to your logo file 
                                e.g. src="/logo.png" or a base64 string.
                             */}
                            <img 
                                src="https://assets.cdn.filesafe.space/Zm5F1ZUDkepScHsmkXKM/media/69649136f8a93bf628e3c977.png" 
                                alt="F&C Logo" 
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter leading-none">
                                Fuel & <span className="text-lime-400">Conquer</span>
                            </h1>
                            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                                {t.headers.appSubtitle}
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-bold text-slate-300 border border-slate-700">
                            High-Performance Nutrition
                        </span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                {!mealPlan && !isLoading && !error && (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-extrabold text-slate-800">{t.headers.heroTitle}</h2>
                            <p className="text-slate-500 mt-2">{t.headers.heroSubtitle}</p>
                        </div>
                        <UserInputForm
                            initialData={formData}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                )}
                
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl shadow-2xl border border-slate-200">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h2 className="mt-8 text-3xl font-black text-slate-900 italic uppercase">{t.headers.loadingTitle}</h2>
                        <p className="mt-2 text-slate-500 font-medium">{t.headers.loadingSubtitle}</p>
                    </div>
                )}
                
                {error && (
                     <div className="p-12 bg-white rounded-xl shadow-xl text-center border-t-4 border-red-500">
                        <h2 className="text-3xl font-black text-red-600 italic uppercase">{t.headers.errorTitle}</h2>
                        <p className="mt-4 text-slate-600 font-medium">{error}</p>
                        <button
                            onClick={handleReset}
                            className="mt-8 px-8 py-3 bg-slate-900 text-white font-bold rounded-lg shadow-lg hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400"
                        >
                            {t.headers.resetBtn}
                        </button>
                    </div>
                )}

                {mealPlan && (
                    <MealPlanDisplay plan={mealPlan} onReset={handleReset} language={language} />
                )}
            </main>
            <footer className="py-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest border-t border-slate-200 mt-12">
                <p>&copy; {new Date().getFullYear()} Fuel & Conquer. {t.headers.footer}</p>
            </footer>
        </div>
    );
};

export default App;
