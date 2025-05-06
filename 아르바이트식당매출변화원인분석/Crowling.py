from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import pandas as pd

# 셀레니움 설정
options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

# 네이버 플레이스 리뷰 페이지 접속
url = "url_address" # 원하는 페이지의 주소 넣기
driver.get(url)
time.sleep(5)

# iframe 전환
driver.switch_to.frame("entryIframe")
time.sleep(2)

# ✅ 더보기 버튼 클릭 반복
while True:
    try:
        more_button = driver.find_element(By.CLASS_NAME, 'fvwqf')
        driver.execute_script("arguments[0].click();", more_button)
        print("[클릭] 더보기")
        time.sleep(1.5)
    except:
        print("[종료] 더보기 버튼 없음")
        break

# ✅ 리뷰 수집
review_cards = driver.find_elements(By.CSS_SELECTOR, "li.place_apply_pui")
print(f"[리뷰 수집] 총 {len(review_cards)}개")

data = []

for card in review_cards:
    try:
        profile_link = card.find_element(By.CSS_SELECTOR, 'a[data-pui-click-code="profile"]').get_attribute("href")
        user_id = profile_link.split("/my/")[1].split("/")[0]

        review_text = card.find_element(By.CSS_SELECTOR, "div.pui__vn15t2 > a").text.strip()

        # ✅ 날짜 처리 개선
        try:
            date_raw = card.find_element(By.TAG_NAME, "time").text.strip()
            date_parts = date_raw.split(".")
            if len(date_parts) == 4:
                # 예: 24.12.4.수 → 연도.월.일.요일
                year = f"20{date_parts[0].zfill(2)}"
                month = date_parts[1]
                day = date_parts[2]
                weekday = date_parts[3]
            elif len(date_parts) == 3:
                # 예: 3.19.수 → 월.일.요일
                year = "2025"
                month = date_parts[0]
                day = date_parts[1]
                weekday = date_parts[2]
            else:
                raise ValueError("날짜 형식 이상")
            full_date = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
        except:
            full_date = None
            weekday = None

        # 방문 횟수
        visit_info = card.find_elements(By.CSS_SELECTOR, "span.pui__gfuUIT")
        visit_count = [v.text for v in visit_info if "번째 방문" in v.text]
        visit_count = visit_count[0] if visit_count else "1번째 방문"

        # ✅ 방문 태그 추출
        badges = card.find_elements(By.CSS_SELECTOR, "span.pui__V8F9nN em")
        badge_texts = [badge.text.strip() for badge in badges]
        badge_combined = ", ".join(badge_texts)

        data.append({
            "user_id": user_id,
            "date": full_date,
            "weekday": weekday,
            "visit_count": visit_count,
            "visit_tags": badge_combined,
            "review_text": review_text
        })

    except Exception as e:
        print("에러:", e)
        continue

driver.quit()

# ✅ DataFrame + 날짜 포맷 정리
df = pd.DataFrame(data)
df["date"] = pd.to_datetime(df["date"], errors="coerce")  # 오류난 날짜는 NaT 처리

df.to_csv("naver_reviews_2.csv", index=False, encoding="utf-8-sig")
print(f"[완료] 총 {len(df)}개 리뷰 저장 완료")

