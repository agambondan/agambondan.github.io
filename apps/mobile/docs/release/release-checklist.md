# Release Checklist

## Preflight
- [ ] `npm run validate:cv`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run qa:web`
- [ ] `npm run qa:mobile`

## Android
- [ ] Android signing envs are available in CI secrets
- [ ] `npm run release:android:check --workspace apps/mobile`
- [ ] Generate signed AAB
- [ ] Upload to Play Console internal track

## iOS
- [ ] iOS signing envs are available in CI secrets
- [ ] `npm run release:ios:check --workspace apps/mobile`
- [ ] Archive in Xcode / CI macOS runner
- [ ] Upload build to TestFlight

## Post-release
- [ ] Smoke test production build
- [ ] Confirm analytics/crash reporting
- [ ] Tag release in git
