import { defineConfig } from 'astro/config';

// 대표 주소는 apex(furdice.com) 하나로 통일. canonical·sitemap·robots 모두 이 값을 따른다.
export default defineConfig({
  site: 'https://furdice.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
