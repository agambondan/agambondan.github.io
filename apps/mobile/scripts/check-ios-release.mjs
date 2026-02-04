const required = ["IOS_BUNDLE_ID", "IOS_TEAM_ID", "IOS_SIGNING_CERT_BASE64", "IOS_PROFILE_BASE64"];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error("Missing iOS release env vars:");
  for (const envName of missing) {
    console.error(`- ${envName}`);
  }
  process.exit(1);
}

console.log("iOS release env check passed.");
