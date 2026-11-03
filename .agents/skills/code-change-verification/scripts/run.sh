#!/usr/bin/env bash

set -euo pipefail

repository_root="$(git rev-parse --show-toplevel)"
cd "$repository_root"

run_step() {
  echo
  echo "==> $*"
  "$@"
}

run_step pnpm install --frozen-lockfile
run_step pnpm format:check
run_step pnpm lint
run_step pnpm typecheck
run_step pnpm test
run_step pnpm build
run_step git diff --check
