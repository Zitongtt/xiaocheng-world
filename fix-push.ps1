# =====================================================================
#  修复推送：逐个测试可用的上传通道，并自动把代码推上去
#  用法：双击同目录下的 fix-push.cmd
# =====================================================================

$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoUrl  = "https://github.com/Zitongtt/xiaocheng-world.git"
$RepoSlug = "Zitongtt/xiaocheng-world"

function Head($m){ Write-Host "`n========== $m ==========" -ForegroundColor Cyan }
function Good($m){ Write-Host "  [OK]   $m" -ForegroundColor Green }
function Bad($m) { Write-Host "  [FAIL] $m" -ForegroundColor Red }
function Info($m){ Write-Host "  [INFO] $m" -ForegroundColor Gray }

Set-Location $RepoRoot

# ================================================== 准备本地提交
Head "第 1 步：准备本地仓库与提交"
if (-not (Test-Path (Join-Path $RepoRoot ".git"))) {
  git init | Out-Null
  Info "已执行 git init"
}
git branch -M main 2>&1 | Out-Null
if (-not (git config user.email)) {
  git config user.email "Zitongtt@users.noreply.github.com"
  git config user.name  "Zitong Cheng"
}
git add -A 2>&1 | Out-Null
if (git status --porcelain) {
  git commit -m "小程的世界：个人网站首版（色环导航 + 简历 + 旅行地图）" 2>&1 | Out-Null
  Good "已创建本地提交"
} else {
  Info "没有新改动需要提交"
}
$localCommits = git rev-list --count HEAD 2>&1
Info "本地提交总数: $localCommits"

if ((git remote get-url origin 2>&1) -ne $RepoUrl) {
  git remote remove origin 2>&1 | Out-Null
  git remote add origin $RepoUrl
}
Info "origin = $RepoUrl"

# ================================================== 逐个测试上传通道
function Test-Push($label, $extraArgs) {
  Head "尝试：$label"
  $env:GIT_TERMINAL_PROMPT = "1"   # 允许弹出登录窗口
  $args = @('-c','credential.helper=manager') + $extraArgs + @('push','-u','origin','main')
  $out = & git @args 2>&1 | Out-String
  $code = $LASTEXITCODE
  if ($code -eq 0) {
    Good "$label 推送成功！"
    return $true
  }
  Bad "$label 失败（退出码 $code）"
  $out.Trim().Split("`n") | Select-Object -First 6 | ForEach-Object { Write-Host "      $_" -ForegroundColor DarkYellow }
  return $false
}

$ok = $false

# 通道 1：默认（schannel）
$ok = Test-Push "通道1 · 默认 TLS" @()
if (-not $ok) {
  Write-Host "      提示：若上面出现 schannel / SEC_E_NO_CREDENTIALS，继续试通道2。" -ForegroundColor Gray
}

# 通道 2：OpenSSL 后端 + 不检查吊销
if (-not $ok) {
  $ok = Test-Push "通道2 · OpenSSL 后端" @('-c','http.sslBackend=openssl','-c','http.schannelCheckRevoke=false')
}

# ================================================== 结果
Head "结果"
if ($ok) {
  Write-Host "  代码已上传成功！" -ForegroundColor Green
  Write-Host ""
  Write-Host "  还剩最后一步（只需做一次）：开启 GitHub Pages" -ForegroundColor White
  Write-Host "   打开  https://github.com/$RepoSlug/settings/pages"
  Write-Host "   Build and deployment -> Source 选择 [GitHub Actions]"
  Write-Host ""
  Write-Host "  等 1-2 分钟访问: https://zitongtt.github.io/xiaocheng-world/" -ForegroundColor Cyan
  Start-Process "https://github.com/$RepoSlug/settings/pages"
} else {
  Write-Host "  两条通道都没成功。" -ForegroundColor Red
  Write-Host ""
  Write-Host "  不要紧，用网页上传，完全不经过 git：" -ForegroundColor Yellow
  Write-Host "   1. 打开  https://github.com/$RepoSlug/upload/main"
  Write-Host "   2. 打开文件夹  $RepoRoot"
  Write-Host "   3. 把里面的  .github  frontend  docs  README.md  .gitattributes"
  Write-Host "      全部选中拖进浏览器页面"
  Write-Host "   4. 页面下方点绿色  Commit changes"
  Write-Host ""
  Write-Host "  注意：网页上传不支持 .github 文件夹，稍后需要手动补一个文件（我会给步骤）。" -ForegroundColor Yellow
  Start-Process "https://github.com/$RepoSlug/upload/main"
  Start-Process $RepoRoot
}

Write-Host ""
Read-Host "按回车键关闭窗口"
