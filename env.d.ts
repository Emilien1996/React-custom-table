/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: string
  VITE_FIREBASE_APP_ID: string
  VITE_FIREBASE_MESSAGING_Sender_ID: string
  VITE_FIREBASE_STORAGE_BUCKET: string
  VITE_FIREBASE_PROJECT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
