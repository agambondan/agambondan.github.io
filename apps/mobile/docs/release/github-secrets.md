# GitHub Secrets Mapping

## Android
- `ANDROID_KEYSTORE_BASE64`: Base64 encoded JKS file
- `ANDROID_KEY_ALIAS`: Keystore key alias
- `ANDROID_KEYSTORE_PASSWORD`: Keystore password
- `ANDROID_KEY_PASSWORD`: Key password

## iOS
- `IOS_BUNDLE_ID`: App bundle identifier
- `IOS_TEAM_ID`: Apple Developer Team ID
- `IOS_SIGNING_CERT_BASE64`: Base64 encoded `.p12`
- `IOS_SIGNING_CERT_PASSWORD`: `.p12` password
- `IOS_PROFILE_BASE64`: Base64 encoded provisioning profile

## Where used
- CI job environment variables for release pipelines
- Local release checks via `release:android:check` and `release:ios:check`

## Security notes
- Do not print secrets in logs.
- Rotate secrets when team access changes.
- Keep raw signing assets outside the repo.
