import path from 'path';

import spawnQuicktype, { writeMultiSourceFile } from '../../utility/quicktype';

type GenerateSchemaArgs = {
	output: string;
	paths: string[];
	namespace?: string;
};

async function spawnGenerateSchema(args: GenerateSchemaArgs): Promise<void> {
	if (!args.paths) {
		throw new Error('at least one source file must be specified');
	}

	for (const source of args.paths) {
		const code = await spawnQuicktype(
			'-l',
			'c++',
			'--include-location',
			'global-include',
			'--enum-type',
			'unsigned int',
			'--source-style',
			'multi-source',
			'--namespace',
			args.namespace || 'Schema',
			path.resolve(source),
		);

		writeMultiSourceFile(code, args.output);
	}
}

export default spawnGenerateSchema;
