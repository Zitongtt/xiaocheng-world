# =====================================================================
#  诊断：为什么推送没有成功
#  用法：双击同目录下的 push-debug.cmd
# =====================================================================

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoUrl  = "https://github.com/Zitongtt/xiaocheng-world.git"

function Head($m) { Write-Host "`n=== $m ===" -ForegroundColor Cyan }
function Good($m){ Write-Host "  [OK]   $m" -ForegroundColor Green }
function Bad($m) { Write-Host "  [FAIL] $m" -ForegroundColor Red }
function Info($m){ Write-Host "  [INFO] $m" -ForegroundColor Gray }

Write-Host "诊断时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor DarkGray
Write-Host "脚本目录: $RepoRoot" -ForegroundColor DarkGray

# ---------------------------------------------------------------- 1. git
Head "1) git 是否可用"
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if ($gitCmd) {
  Good "找到 git: $($gitCmd.Source)"
  Info "$(git --version)"
} else {
  Bad "PATH 里没有 git。请安装 https://git-scm.com/download/win 后重开窗口"
}

# ------------------------------------------------------- 2. 本地仓库状态
Head "2) 本地仓库状态"
Set-Location $RepoRoot
if (Test-Path (Join-Path $RepoRoot ".git")) {
  Good ".git 存在"
  Info "当前分支: $(git rev-parse --abbrev-ref HEAD 2>&1)"
  $log = git log --oneline -3 2>&1
  if ($LASTEXITCODE -eq 0) { Good "本地提交:"; $log | ForEach-Object { Info "  $_" } }
  else { Bad "本地还没有任何提交（$log）" }
  $rmt = git remote get-url origin 2>&1
  if ($LASTEXITCODE -eq 0) { Good "remote origin = $rmt" } else { Bad "没有配置 remote origin" }
  Info "改动文件数: $((git status --porcelain | Measure-Object).Count)"
} else {
  Bad "这里没有 .git —— 说明脚本从来没在这个目录成功执行过 git init"
}

# -------------------------------------------------------- 3. 网络与登录
Head "3) 能不能连上 GitHub（这一步最容易出问题）"
Write-Host "  正在测试 https 连接，最多等 60 秒..." -ForegroundColor Yellow
$env:GIT_TERMINAL_PROMPT = "0"
$env:GCM_INTERACTIVE    = "never"

$out = git ls-remote $RepoUrl 2>&1 | Out-String
$code = $LASTEXITCODE
$env:GIT_TERMINAL_PROMPT = "1"
$env:GCM_INTERACTIVE    = "auto"

if ($code -eq 0) {
  Good "git 可以连上 GitHub，认证也正常"
  if ($out.Trim()) { Info "远程已有内容（说明之前其实推成功了一部分）" }
  else { Info "远程仓库是空的，需要推送" }
} else {
  Bad "git 连接 GitHub 失败（退出码 $code）"
  Write-Host ""
  Write-Host "  原始错误信息：" -ForegroundColor Yellow
  $out.Trim().Split("`n") | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkYellow }
  Write-Host ""
  Write-Host "  对照下面的错误找原因：" -ForegroundColor White
  Write-Host "   - schannel / AcquireCredentialsHandle / SEC_E_NO_CREDENTIALS" -ForegroundColor Gray
  Write-Host "       → Windows TLS 凭据出问题，换用 Git Bash 试（见下方方案）" -ForegroundColor Gray
  Write-Host "   - could not resolve host / Failed to connect / timeout" -ForegroundColor Gray
  Write-Host "       → 网络或代理问题" -ForegroundColor Gray
  Write-Host "   - Authentication failed / 403 / could not read Username" -ForegroundColor Gray
  Write-Host "       → 没登录成功，需要重新授权" -ForegroundColor Gray
  Write-Host "   - 仓库不存在 / 404" -ForegroundColor Gray
  Write-Host "       → 仓库没建成，或名字拼错" -ForegroundColor Gray
}

# ------------------------------------------------- 4. 网页端能不能访问
Head "4) 网页端访问测试"
try {
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $r = Invoke-WebRequest -Uri "https://api.github.com/repos/Zitongtt/xiaocheng-world" -UseBasicParsing -TimeoutSec 20
  Good "仓库 API 可访问（HTTP $($r.StatusCode)）"
  try {
    $j = $r.Content | ConvertFrom-Json
    Info "仓库大小: $($j.size) KB  默认分支: $($j.default_branch)  最后推送: $($j.pushed_at)"
    if ($j.size -eq 0) { Bad "仓库是空的 —— 代码确实没传上去" } else { Good "仓库里已经有内容了" }
  } catch { }
} catch {
  Bad "访问 GitHub API 失败: $($_.Exception.Message)"
}

# ------------------------------------------------------------ 5. 总结
Head "诊断结束"
Write-Host "  请把上面从「1) git 是否可用」到这里的全部内容截图或复制发给我。" -ForegroundColor Yellow
Write-Host ""
Read-Host "按回车键关闭窗口"
