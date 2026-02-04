# Android Signing (Template)

## Required secrets
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_PASSWORD`

## Local setup
1. Copy `.env.release.example` to `.env.release`.
2. Fill Android values from your password manager.
3. Decode keystore from base64 only at runtime in CI/local secure shell.
4. Copy `android/keystore.properties.example` to `android/keystore.properties`.

## Validation command
```bash
npm run release:android:check --workspace apps/mobile
```

## Notes
- Never commit `.env.release`, `.jks`, or `keystore.properties`.
- Keep keystore backup in secure vault.
