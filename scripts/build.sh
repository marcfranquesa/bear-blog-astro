#!/usr/bin/env sh
set -eu

content_repo="${CONTENT_REPO:-}"

if [ -n "$content_repo" ] && [ -z "${CI:-}" ] && [ -z "${NETLIFY:-}" ] && [ -z "${BUILD_IN_PLACE:-}" ]; then
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT

  rsync -a \
    --exclude .git \
    --exclude dist \
    --exclude node_modules \
    ./ "$tmp"/
  if [ -d node_modules ]; then
    ln -s "$PWD/node_modules" "$tmp/node_modules"
  fi

  (cd "$tmp" && BUILD_IN_PLACE=1 sh scripts/build.sh)
  rm -rf dist
  cp -R "$tmp/dist" dist
  exit 0
fi

if [ -n "$content_repo" ]; then
  rm -rf src/content
  if [ -n "${CONTENT_DEPLOY_KEY_B64:-}" ]; then
    mkdir -p "$HOME/.ssh"
    key_file="$(mktemp)"
    trap 'rm -f "$key_file"' EXIT
    if ! printf '%s' "$CONTENT_DEPLOY_KEY_B64" | base64 -d > "$key_file" 2>/dev/null; then
      printf '%s' "$CONTENT_DEPLOY_KEY_B64" | base64 -D > "$key_file"
    fi
    chmod 600 "$key_file"
    if ! ssh-keygen -y -f "$key_file" >/dev/null 2>&1; then
      echo "CONTENT_DEPLOY_KEY_B64 is not a valid unencrypted SSH private key." >&2
      exit 1
    fi
    export GIT_SSH_COMMAND="ssh -i $key_file -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
  fi
  GIT_SSH_COMMAND="${GIT_SSH_COMMAND:-ssh -o StrictHostKeyChecking=accept-new}" \
    git clone --depth 1 "$content_repo" src/content
fi

bun run build
