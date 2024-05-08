import fs from 'fs';
import Vue from '@vitejs/plugin-vue';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

// 인증서 파일 경로를 지정합니다.
const cert = fs.readFileSync('localhost.pem');
const key = fs.readFileSync('localhost-key.pem');



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
  })],
  // assetsInclude: ['**/*.html'] 
};