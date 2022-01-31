const {
  fromHex,
  toHex,
  fromUtf8,
  toUtf8,
  fromBase64,
  toBase64,
} = require("@cosmjs/encoding");
const { SecretNetworkClient } = require("./dist");

(async () => {
  const secretjs = await SecretNetworkClient.init(
    "https://rpc-secret.scrtlabs.com/secret-4/rpc/",
  );

  const x = await secretjs.query.auth.account({
    address: "secret1e8fnfznmgm67nud2uf2lrcvuy40pcdhrerph7v",
  });
  console.log(fromBase64(x.account.value));
})();
