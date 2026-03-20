#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_DIR="$ROOT_DIR/.next/standalone"
RELEASE_DIR="$ROOT_DIR/release"
PACKAGE_DIR="$RELEASE_DIR/taphoaweb-vn"

rm -rf "$PACKAGE_DIR"
mkdir -p "$PACKAGE_DIR/.next"

cp -R "$BUILD_DIR/"* "$PACKAGE_DIR/"
rm -rf "$PACKAGE_DIR/content"
cp -R "$ROOT_DIR/.next/static" "$PACKAGE_DIR/.next/static"
cp -R "$ROOT_DIR/public" "$PACKAGE_DIR/public"
cp "$ROOT_DIR/ecosystem.config.cjs" "$PACKAGE_DIR/ecosystem.config.cjs"
cp "$ROOT_DIR/.env.example" "$PACKAGE_DIR/.env.example"

cd "$RELEASE_DIR"
tar -czf taphoaweb-vn.tar.gz taphoaweb-vn

printf "Da tao goi deploy: %s\n" "$RELEASE_DIR/taphoaweb-vn.tar.gz"
