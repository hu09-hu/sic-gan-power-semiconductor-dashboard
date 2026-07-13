#!/usr/bin/env python3
"""Refresh daily metadata without inventing market scores."""

from __future__ import annotations
import datetime as dt
import json
import re
import urllib.error
import urllib.request
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
REPORT = ROOT / "daily-update.json"
SOURCES = {
    "Infineon": "https://www.infineon.com/about/company",
    "STMicroelectronics": "https://newsroom.st.com/media-center/press-item.html/c3283.html",
    "Wolfspeed": "https://www.wolfspeed.com/company/news-events/news/wolfspeed-announces-the-commercial-launch-of-200mm-silicon-carbide-materials-portfolio-unlocking-the-industrys-ability-to-manufacture-at-scale/",
    "onsemi": "https://www.onsemi.com/company/newsroom/news-and-insights/onsemi-launches-new-cooling-packaging-technology-to-drive-efficiency-in-power-hungry-applications",
    "Navitas": "https://navitassemi.com/navitas-unveils-5th-generation-sic-trench-assisted-planar-tap-technology/",
}

def check_source(url: str) -> dict[str, object]:
    request = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "SiC-GaN-Dashboard/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            return {"ok": 200 <= response.status < 400, "status": response.status}
    except urllib.error.HTTPError as exc:
        if exc.code in (403, 405):
            return {"ok": True, "status": exc.code, "note": "HEAD restricted"}
        return {"ok": False, "status": exc.code}
    except Exception as exc:
        return {"ok": False, "status": None, "error": type(exc).__name__}

def main() -> None:
    now = dt.datetime.now(ZoneInfo("Asia/Taipei"))
    html = INDEX.read_text(encoding="utf-8")
    html, count = re.subn(
        r"(<div class=\"asof\"><span>更新日</span><strong>)[^<]+(</strong>)",
        rf"\g<1>{now.strftime('%Y / %m / %d')}\g<2>", html, count=1)
    if count != 1:
        raise RuntimeError("Could not locate dashboard update date")
    html = re.sub(r"(<em id=\"cloudStatus\">)[^<]*(</em>)",
                  rf"\g<1>GitHub 雲端更新：{now.strftime('%H:%M')}\g<2>", html, count=1)
    INDEX.write_text(html, encoding="utf-8")
    report = {
        "updated_at": now.isoformat(timespec="seconds"),
        "timezone": "Asia/Taipei",
        "source_checks": {name: check_source(url) for name, url in SOURCES.items()},
        "note": "Editorial analysis scores are not automatically overwritten.",
    }
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))

if __name__ == "__main__":
    main()

