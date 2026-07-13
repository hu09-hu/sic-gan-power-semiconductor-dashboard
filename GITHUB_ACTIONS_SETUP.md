# GitHub Actions 每日更新設定

`.github/workflows/daily-dashboard.yml` 會在每日台北時間 06:30：

1. 從 GitHub 取出儀表板。
2. 更新頁面日期與雲端執行狀態。
3. 檢查龍頭分析引用的官方來源是否仍可連線。
4. 將靜態儀表板發布到 GitHub Pages。

## 第一次啟用

1. 在 GitHub 建立一個新的 repository，不要使用原本的封測儀表板 repository。
2. 將本資料夾推送到新 repository 的 `main` 分支。
3. 到 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
4. 到 **Actions → Daily SiC-GaN Dashboard → Run workflow** 手動執行一次。

完成後，即使個人電腦關機，GitHub 的雲端 runner 仍會依排程執行。

## 自動化範圍

- 已自動化：日期、來源連線檢查、頁面發布、失敗紀錄。
- 尚未自動化：產業分數、公司財務與即時報價。可靠更新這些資料需要指定資料 API。

