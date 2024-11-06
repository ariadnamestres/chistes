
// esto me lo hace añadir para que vaya el .env en el vite
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}