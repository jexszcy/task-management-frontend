# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Prerequisites
Make sure you have installed:
- **Node.js >= 18** ([https://nodejs.org/](https://nodejs.org/))
- **npm** (comes with Node.js) or **Yarn**
- Modern browser (Chrome, Firefox, Edge, etc.)
---

## Install Dependencies

```bash
npm install
```

## Configure Environment
Since there are no sensitive informations included in .env, did not add it to .gitignore

### Update .env with your backend api url
```bash
VITE_API_URL=http://localhost/task-management-backend/api/
```

## Run the Development Server
```bash
npm run dev
```

## Access your Application 
- Use default [http://localhost:5173/](http://localhost:5173/)
