import fs from 'fs';
import Vue from '@vitejs/plugin-vue';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

// 인증서 파일 경로를 지정합니다.
const cert = fs.readFileSync('localhost.pem');
const key = fs.readFileSync('localhost-key.pem');

const filterWarningsPlugin = {
  name: 'filter-warnings',
  configureServer(server) {
    const originalWarn = server.middlewares.logger.warn;
    server.middlewares.logger.warn = (msg, ...args) => {
      if (msg.includes('Multiple instances of Three.js being imported')) {
        // 해당 경고 메시지를 무시합니다.
        return;
      }
      originalWarn.call(server.middlewares.logger, msg, ...args);
    };
  }
}

export default {
  root: 'src/',
  publicDir: '../static/',
  base: './',
  resolve: {
    alias: {
      '@views': '/views',
      '@resource': '/../static/resource/',
    },
  
  },
  server: {
    host: true,
    open: !isCodeSandbox, // Open if it's not a CodeSandbox
    https: {
      key,
      cert,
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true
  },
  plugins: [Vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('a-')
      }
    }
  }),
  filterWarningsPlugin],
};