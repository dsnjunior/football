export const languages = {
  en: 'English',
  'pt-BR': 'Português',
};

export type Lang = keyof typeof languages;

export const defaultLang = 'en';

export const ui = {
  en: {
    'pagetitle.home': 'Home',
    'login.google': 'Login with Google',
    'nav.support': 'Support',
    'nav.home': 'Home',
  },
  'pt-BR': {
    'pagetitle.home': 'Início',
    'login.google': 'Entrar com o Google',
    'nav.support': 'Suporte',
    'nav.home': 'Início',
  },
} as const;