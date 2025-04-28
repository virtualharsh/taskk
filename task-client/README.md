> npm create vite@latest

> npm i react-router-dom

> npm create vite@latest

> npm install tailwindcss @tailwindcss/vite

> @import "tailwindcss" in index.css

tsconfig.app.json
```
{
    "compilerOptions": {
        // ...
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
        // ...
    }
}
```

tsconfig.json
```
{
    "files": [],
    "references": [
        {
            "path": "./tsconfig.app.json"
        },
        {
            "path": "./tsconfig.app.json"
        }
    ],
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "./src/*"
            ]
        }
    }
}
```

> npm install -D @types/node

vite.config.ts
```
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

> npx shadcn@latest init

> npx shadcn@latest add button
