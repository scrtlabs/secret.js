#!/usr/bin/env node

const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

(async () => {
  await exec(`mkdir -p "${__dirname}/../src/query/"`);

  const outputFile = `${__dirname}/../src/query/cosmos.ts`;

  await exec(`echo '// Auto-generated' > "${outputFile}"`);
  await exec(`echo '// See scripts/generate_query.js' >> "${outputFile}"`);

  const { stdout } = await exec(
    `find "${__dirname}/../src/protobuf" -name query.ts`,
  );
  const modulesPaths = stdout
    .split("\n")
    .filter((modulePath) => modulePath.length > 0)
    .filter((modulePath) => !modulePath.includes("/secret/"))
    .filter((modulePath) => !modulePath.includes("/cosmos/auth/"))
    .map((modulePath) => path.relative(__dirname, modulePath.trim()))
    .map((modulePath) => modulePath.replace("../src/", "../"))
    .map((modulePath) => modulePath.replace(".ts", ""))
    .sort();

  const cosmosModuleNameRegex = new RegExp(`/cosmos/(.+?)/v1beta1/`);
  const ibcModuleNameRegex = new RegExp(`/ibc/.+?/(.+?)/v1/`);
  for (const modulePath of modulesPaths) {
    if (modulePath.includes("/tendermint/")) {
      await exec(
        `echo 'export { ServiceClientImpl as TendermintQuerier } from "${modulePath}";' >> "${outputFile}"`,
      );
    } else if (modulePath.includes("/cosmos/")) {
      const moduleName = modulePath.match(cosmosModuleNameRegex)[1];
      const exportName = `${moduleName
        .charAt(0)
        .toUpperCase()}${moduleName.slice(1)}Querier`;

      await exec(
        `echo 'export { QueryClientImpl as ${exportName} } from "${modulePath}";' >> "${outputFile}"`,
      );
    } else if (modulePath.includes("/ibc/")) {
      const moduleName = modulePath.match(ibcModuleNameRegex)[1];
      const exportName = `Ibc${moduleName
        .charAt(0)
        .toUpperCase()}${moduleName.slice(1)}Querier`;

      await exec(
        `echo 'export { QueryClientImpl as ${exportName} } from "${modulePath}";' >> "${outputFile}"`,
      );
    }
  }
})();
