package migrations

import "embed"

// Files contains SQL migration files.
//go:embed *.up.sql
var Files embed.FS
