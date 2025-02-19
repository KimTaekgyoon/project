import os
from dotenv import load_dotenv
import yfinance as yf
import mysql.connector
from mysql.connector import Error
import multiprocessing
import schedule
import time
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from datetime import datetime

# .env 파일 로드
load_dotenv()

# 환경 변수 사용
SLACK_TOKEN = os.getenv("SLACK_TOKEN")
CHANNEL_ID = os.getenv("CHANNEL_ID")
client = WebClient(token=SLACK_TOKEN)

# 🔹 MySQL 연결 설정
def create_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="kimtaekgyoon3210",
            database="finance"
        )
        if conn.is_connected():
            print("✅ MySQL 연결 성공")
        return conn
    except Error as e:
        print(f"❌ MySQL 연결 실패: {e}")
        return None

# 🔹 Slack 알림 전송 함수
def send_slack_message(message):
    try:
        client.chat_postMessage(channel=CHANNEL_ID, text=message)
        print("✅ Slack 알림 전송 완료")
    except SlackApiError as e:
        print(f"❌ Slack 알림 실패: {e.response['error']}")

# 🔹 주식 데이터 저장 함수 (MySQL)
def save_to_db(table_name, data):
    conn = create_connection()
    if conn is None:
        return
    
    cursor = conn.cursor()
    for index, row in data.iterrows():
        sql = f"""
        INSERT INTO {table_name} (date, open, high, low, close, volume)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE open=VALUES(open), high=VALUES(high), low=VALUES(low), close=VALUES(close), volume=VALUES(volume);
        """
        values = (index, row["Open"], row["High"], row["Low"], row["Close"], row["Volume"])
        cursor.execute(sql, values)

    conn.commit()
    cursor.close()
    conn.close()
    print(f"✅ {table_name} 데이터 저장 완료")

# 🔹 엔비디아(NVDA) 주가 크롤링 (1D 데이터)
def fetch_daily_data():
    print("📢 [1D 데이터 수집 시작]")
    send_slack_message("🚀 NVDA 1D 데이터 수집을 시작합니다.")
    
    ticker = yf.Ticker("NVDA")
    df = ticker.history(period="1y", interval="1d")  # 1년치 일봉 데이터 가져오기

    save_to_db("nvda_daily", df)
    send_slack_message("✅ NVDA 1D 데이터 수집 완료.")

# 🔹 엔비디아(NVDA) 분당 데이터 크롤링 (1M 데이터)
def fetch_minutely_data():
    print("📢 [1M 데이터 수집 시작]")
    send_slack_message("🚀 NVDA 1M 데이터 수집을 시작합니다.")
    
    ticker = yf.Ticker("NVDA")
    df = ticker.history(period="7d", interval="1m")  # 최근 7일치 1분봉 데이터 가져오기

    save_to_db("nvda_minutely", df)
    send_slack_message("✅ NVDA 1M 데이터 수집 완료.")

# 🔹 병렬 처리 실행 (멀티코어 활용)
def run_parallel_tasks():
    p1 = multiprocessing.Process(target=fetch_daily_data)   # 1코어에서 1D 데이터 수집
    p2 = multiprocessing.Process(target=fetch_minutely_data)  # 다른 1코어에서 1M 데이터 수집
    
    p1.start()
    p2.start()

    p1.join()
    p2.join()

    print("✅ 모든 작업 완료!")

# 🔹 장 마감 후 실행 스케줄 (미국 장 종료: 16:00 EST → 한국 시간 기준 익일 06:00)
def schedule_tasks():
    schedule.every().day.at("20:55").do(run_parallel_tasks)  # 한국 시간 기준 06:05에 실행 (미국장 종료 후 5분 뒤)
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # 1분 단위로 실행 확인

# 🔹 메인 실행
if __name__ == "__main__":
    send_slack_message("📢 NVDA 주가 수집 시스템 시작")
    schedule_tasks()  # 장 마감 후 자동 실행
