import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  { ignores: ["public/**", ".next/**"] },
  ...nextCoreWebVitals
];

export default eslintConfig;
