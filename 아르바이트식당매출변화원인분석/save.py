# save.py

import pandas as pd
from Crowling import crawl_reviews  # 함수 import

# 크롤링 수행
reviews = crawl_reviews()

# pandas DataFrame으로 변환
df = pd.DataFrame(reviews)

# 엑셀 저장
df.to_excel('naver_reviews.xlsx', index=False)
print("✔ 리뷰 데이터 저장 완료: naver_reviews.xlsx")
