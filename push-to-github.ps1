# =====================================================================
#  小程的世界 · 一键推送到 GitHub
#  目标仓库：https://github.com/Zitongtt/xiaocheng-world
#  用法：双击同目录下的 push-to-github.cmd
# =====================================================================

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoUrl  = "https://github.com/Zitongtt/xiaocheng-world.git"
$RepoWeb  = "https://github.com/Zitongtt/xiaocheng-world"
$SiteUrl  = "https://zitongtt.github.io/xiaocheng-world/"

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Ok($msg)   { Write-Host "    $msg" -ForegroundColor Green }
function Warn($msg) { Write-Host "    $msg" -ForegroundColor Yellow }
function Bad($msg)  { Write-Host "    $msg" -ForegroundColor Red }

Set-Location $RepoRoot
Write-Host "项目目录: $RepoRoot" -ForegroundColor DarkGray

# ------------------------------------------------------------------- git
Step "检查 git"
$gitVersion = $null
try { $gitVersion = (git --version) } catch { }
if (-not $gitVersion) {
  Bad "没有找到 git，请先安装：https://git-scm.com/download/win"
  Read-Host "按回车键关闭窗口"
  exit 1
}
Ok $gitVersion

# ------------------------------------------------- 检查远程仓库是否存在
# 注意：不要往 HFT-Hunan-Uniiversity/HypoWeaver-Qwen 推任何东西！
Step "检查目标仓库是否已创建"
$repoState = "unknown"   # yes / no / unknown
try {
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $null = Invoke-WebRequest -Uri $RepoWeb -UseBasicParsing -TimeoutSec 25 -ErrorAction Stop
  $repoState = "yes"
} catch {
  $code = $null
  try { $code = $_.Exception.Response.StatusCode.value__ } catch { }
  if ($code -eq 404) { $repoState = "no" }
}

if ($repoState -eq "no") {
  Warn "GitHub 上还没有 xiaocheng-world 这个仓库，push 会失败。"
  Write-Host ""
  Write-Host "  请先创建（约 30 秒，不需要 token）：" -ForegroundColor Yellow
  Write-Host "   1. 打开  https://github.com/new" -ForegroundColor White
  Write-Host "   2. Repository name 填:  xiaocheng-world" -ForegroundColor White
  Write-Host "   3. 选择  Public" -ForegroundColor White
  Write-Host "   4. 下面的 Add README / .gitignore / license 全部【不要勾】" -ForegroundColor White
  Write-Host "   5. 点绿色的  Create repository" -ForegroundColor White
  Write-Host ""
  Write-Host "  建好之后回到这个窗口按回车，我会自动重试。" -ForegroundColor Yellow
  Write-Host ""
  Start-Process "https://github.com/new"
  Read-Host "  按回车继续"
} elseif ($repoState -eq "yes") {
  Ok "仓库已存在，可以直接推送"
} else {
  Warn "无法确认仓库状态（网络问题），继续尝试推送"
}

# ---------------------------------------------------------------- git user
# 说明：这里不写学校邮箱，避免把邮箱永久烙进每条提交记录。
# 想让提交关联到你的 GitHub 账号，把下面的用户名改成你的 GitHub 用户名即可。
if (-not (git config user.email)) {
  git config user.email "Zitongtt@users.noreply.github.com"
  git config user.name  "Zitong Cheng"
  Ok "已设置提交身份: Zitong Cheng <Zitongtt@users.noreply.github.com>"
} else {
  Ok "提交身份: $(git config user.name) <$(git config user.email)>"
}

# ------------------------------------------------------------ init / commit
if (-not (Test-Path (Join-Path $RepoRoot ".git"))) {
  Step "初始化本地仓库"
  git init | Out-Null
  Ok "git init 完成"
} else {
  Step "本地仓库已存在，跳过初始化"
}
git branch -M main

Step "暂存文件并提交（不会包含 node_modules / dist）"
git add -A
$changes = git status --porcelain
if ($changes) {
  git commit -m "小程的世界：个人网站首版（色环导航 + 简历 + 旅行地图）" | Out-Null
  Ok "已创建提交"
} else {
  Warn "没有新的改动，跳过提交"
}

# --------------------------------------------------------------- credential
Step "配置 GitHub 登录"
git config credential.helper manager
Ok "已启用 Windows 凭据管理器（首次推送会弹浏览器登录）"

# ------------------------------------------------------------------- remote
$existing = git remote get-url origin 2>$null
if ($existing) {
  if ($existing -ne $RepoUrl) {
    git remote set-url origin $RepoUrl
    Ok "已修正 origin -> $RepoUrl"
  } else {
    Ok "origin = $RepoUrl"
  }
} else {
  git remote add origin $RepoUrl
  Ok "已添加 origin = $RepoUrl"
}

# --------------------------------------------------------------------- push
Step "推送到 GitHub"
Write-Host "    如果弹出 GitHub 登录窗口，点「Sign in with your browser」授权一次即可。" -ForegroundColor Yellow
Write-Host ""

$pushed = $true
try {
  git push -u origin main
} catch {
  $pushed = $false
  Bad "推送失败：$($_.Exception.Message)"
}

Write-Host ""
if ($pushed) {
  Write-Host "================================================================" -ForegroundColor Green
  Write-Host " 代码已上传成功！" -ForegroundColor Green
  Write-Host "================================================================" -ForegroundColor Green
} else {
  Write-Host "================================================================" -ForegroundColor Red
  Write-Host " 没有推送成功，请把上面的报错发给我" -ForegroundColor Red
  Write-Host "================================================================" -ForegroundColor Red
}

Write-Host ""
Write-Host " 最后一步：开启 GitHub Pages（只需做一次）" -ForegroundColor White
Write-Host "   打开  $RepoWeb/settings/pages"
Write-Host "   Build and deployment -> Source 选择  [GitHub Actions]"
Write-Host ""
Write-Host " 等 1-2 分钟，网站就上线了：" -ForegroundColor White
Write-Host "   $SiteUrl" -ForegroundColor Cyan
Write-Host ""
Write-Host " 构建进度：" -ForegroundColor DarkGray
Write-Host "   $RepoWeb/actions" -ForegroundColor DarkGray
Write-Host ""
Read-Host "按回车键关闭窗口"
