const required = [
  "ANDROID_KEYSTORE_BASE64",
  "ANDROID_KEY_ALIAS",
  "ANDROID_KEYSTORE_PASSWORD",
  "ANDROID_KEY_PASSWORD"
];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error("Missing Android release env vars:");
  for (const envName of missing) {
    console.error(`- ${envName}`);
  }
  process.exit(1);
}

console.log("Android release env check passed.");
