import SftpClient from "ssh2-sftp-client";
import type {Plugin} from 'vite';

type DeployOptions = {
	outDir: string;
	connectionOptions: {
		host: string;
		username: string;
		password: string;
	};
};

export const vitePluginDeploy = (options: DeployOptions): Plugin => {
	let distDir = 'dist';
	return {
		name: 'vite-plugin-deploy',
		apply: 'build',
		enforce: 'post',
		configResolved(cfg) {
			distDir = cfg.build.outDir;
		},
		closeBundle() {
			const input = distDir;
			const output = options.outDir;

			function config() {
				const config = {
					connect: {
						host: options.connectionOptions.host,
						username: options.connectionOptions.username,
						password: options.connectionOptions.password,
					},
					outputPath: output,
				}

				return config
			}
			const start = new Date();

			async function deploy() {
				const client = new SftpClient();

				try {
					await client.connect(config().connect)
					client.on("upload", (info) => {
						console.log(`Uploaded ${info.source}`)
					})
					let rslt = await client.uploadDir(input, output, { useFastput: true })
					return rslt
				} catch (err) {
					console.error(err)
				} finally {
					client.end()
				}
			}

			return deploy()
				.then(() => {
					const end = new Date();
					const time = end.getTime() - start.getTime();
					console.log(`\x1b[32m Deploy: Finished in ${time / 1000}s`);
				})
				.catch((err) => {
					console.log(`\x1b[31m Deploy: Error ${err.message}`)
				})
		},
	};
};
