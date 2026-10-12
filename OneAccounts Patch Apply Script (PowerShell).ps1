<#
  Applies the OneAccounts SEO quick fixes to your local website folder.
  It never commits and never pushes. Everything goes onto a new branch so you can review and discard it.

  Usage (PowerShell):
    1. Save oneaccounts-seo-quick-fixes.patch and this script in the same folder (for example Downloads).
    2. Run:  .\apply-seo-quick-fixes.ps1 -RepoPath "C:\path\to\oneaccounts-website"
       Add -Build to also run npm install and npm run build as a check.
  If PowerShell blocks the script, run once:  Set-ExecutionPolicy -Scope Process Bypass
#>
param(
  [Parameter(Mandatory = $true)][string]$RepoPath,
  [switch]$Build
)
$ErrorActionPreference = "Stop"
$patch = Join-Path $PSScriptRoot "oneaccounts-seo-quick-fixes.patch"
if (-not (Test-Path $patch)) { throw "Patch file not found next to this script: $patch" }
if (-not (Test-Path (Join-Path $RepoPath ".git"))) { throw "$RepoPath is not a git folder." }
Set-Location $RepoPath

if (git status --porcelain) {
  Write-Host "You have uncommitted changes. Commit or stash them first, then run this again." -ForegroundColor Yellow
  git status --short
  exit 1
}

git pull --ff-only
$branch = "seo-quick-fixes"
git checkout -b $branch
if ($LASTEXITCODE -ne 0) { throw "Could not create branch $branch (does it already exist?)." }

git apply --check $patch 2>$null
if ($LASTEXITCODE -eq 0) { git apply $patch }
else {
  Write-Host "Plain apply failed, retrying and ignoring line-ending differences..." -ForegroundColor Yellow
  git apply --check --ignore-whitespace $patch
  if ($LASTEXITCODE -ne 0) {
    git checkout -
    git branch -D $branch | Out-Null
    throw "The patch does not fit your folder. Your latest main may differ from the one I used (commit 02dca71). Nothing was changed."
  }
  git apply --ignore-whitespace $patch
}

Write-Host "`nPatch applied on branch '$branch'. Changed files:" -ForegroundColor Green
git status --short

if ($Build) {
  npm install
  npm run build
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  npm run dev        # open http://localhost:3000 and check the home page and a guide"
Write-Host "  git diff           # review every change"
Write-Host "  To discard everything:  git checkout main ; git branch -D $branch"
Write-Host "  When you are happy:     git add -A ; git commit -m 'SEO quick fixes' ; git push -u origin $branch"
Write-Host "  (Vercel will make a preview link for the branch. Merge to main only after checking it.)"
