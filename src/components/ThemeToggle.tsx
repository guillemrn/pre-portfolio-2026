import React, { useEffect, useState } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('system');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('theme_preference') as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = () => {
            // Remove both potentially if using a different strategy, but here we just need to add/remove 'dark'
            if (theme === 'dark') {
                root.classList.add('dark');
            } else if (theme === 'light') {
                root.classList.remove('dark');
            } else {
                // System
                if (mediaQuery.matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        applyTheme();

        if (theme === 'system') {
            mediaQuery.addEventListener('change', applyTheme);
            return () => mediaQuery.removeEventListener('change', applyTheme);
        } else {
            localStorage.setItem('theme_preference', theme);
        }
    }, [theme, mounted]);

    const cycleTheme = () => {
        setTheme((prev) => {
            if (prev === 'light') return 'dark';
            if (prev === 'dark') return 'system';
            return 'light';
        });
    };

    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <button
            onClick={cycleTheme}
            className="p-2 rounded-full hover:bg-forest/10 dark:hover:bg-bone/10 transition-colors text-forest dark:text-bone"
            aria-label="Toggle theme"
            title={`Current theme: ${theme}`}
        >
            {theme === 'light' && <Sun size={20} />}
            {theme === 'dark' && <Moon size={20} />}
            {theme === 'system' && <Laptop size={20} />}
        </button>
    );
}
