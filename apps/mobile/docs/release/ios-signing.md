# iOS Signing (Template)

## Required secrets
- `IOS_BUNDLE_ID`
- `IOS_TEAM_ID`
- `IOS_SIGNING_CERT_BASE64`
- `IOS_SIGNING_CERT_PASSWORD`
- `IOS_PROFILE_BASE64`

## Local setup
1. Copy `.env.release.example` to `.env.release`.
2. Fill iOS values from secure storage.
3. Decode `.p12` and `.mobileprovision` only in secure runtime.
4. Configure signing in Xcode with matching Bundle ID and Team ID.

## Validation command
```bash
npm run release:ios:check --workspace apps/mobile
```

## Notes
- iOS archive/export requires macOS + Xcode.
- Do not commit certificates or provisioning profiles.
