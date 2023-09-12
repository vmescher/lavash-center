import FtpDeploy from 'ftp-deploy';
import type {Plugin} from 'vite';

type DeployOptions = {
	outDir: string;
	sftp?: boolean;
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

			const FTPDeploy = new FtpDeploy();
			const config = {
				user: options.connectionOptions.username,
				password: options.connectionOptions.password,
				host: options.connectionOptions.host,
				localRoot: input,
				remoteRoot: output,
				include: ['*', '**/*'],
				sftp: options.sftp,
			};

			FTPDeploy.on('uploading', function (data) {
				console.log(data.filename);
			});

			return FTPDeploy.deploy(config)
				.then(() => console.log('\x1b[32m Deploy:  Finished'))
				.catch((err) => console.error('\x1b[31m Deploy: Error', err));
		},
	};
};
