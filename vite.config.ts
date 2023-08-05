import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';

const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'/@': pathResolve('./src/')
};

const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [vue()],

    root: process.cwd(),
		resolve: { alias },
		base: './',
		mode: 'dev',

		// 本地运行配置，及代理配置
		server: {
			host: '0.0.0.0',
			port: 8899,
			open: false,
			hmr: true,
			proxy: {
				'/api-client': {
					target: 'http://localhost:20001',
					changeOrigin: true,
					ws: true
				},
        		'/api-uua': {
					target: 'http://localhost:20001',
					changeOrigin: true,
					ws: true
				},
			},
		},
  }
})

export default viteConfig;
