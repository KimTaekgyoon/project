import pandas as pd
from technical import get_technical_data, create_connection

def create_tech_table():
    conn = create_connection()
    if conn is None:
        return
    
    cursor = conn.cursor()
    create_table_query = """
    CREATE TABLE IF NOT EXISTS nvda_tech (
        date DATETIME PRIMARY KEY,
        sma_50 FLOAT NULL,
        sma_200 FLOAT NULL,
        macd FLOAT NULL,
        signal_line FLOAT NULL,
        rsi FLOAT NULL,
        adx FLOAT NULL,
        roc FLOAT NULL
    );
    """
    cursor.execute(create_table_query)
    conn.commit()
    cursor.close()
    conn.close()
    print("✅ nvda_tech 테이블 생성 완료!")


def save_tech_to_db(data):
    conn = create_connection()
    if conn is None:
        return

    cursor = conn.cursor()
    for index, row in data.iterrows():
        sql = f"""
        INSERT INTO nvda_tech (date, sma_50, sma_200, macd, signal_line, rsi, adx, roc)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE 
        sma_50=VALUES(sma_50), 
        sma_200=VALUES(sma_200),
        macd=VALUES(macd), 
        signal_line=VALUES(signal_line), 
        rsi=VALUES(rsi), 
        adx=VALUES(adx), 
        roc=VALUES(roc);
        """

        # ✅ NaN 값을 None으로 변환
        values = tuple(None if pd.isna(x) else x for x in [
            row["date"], row["SMA_50"], row["SMA_200"], row["MACD"], row["Signal"], row["RSI"], row["ADX"], row["ROC"]
        ])

        cursor.execute(sql, values)

    conn.commit()
    cursor.close()
    conn.close()
    print("✅ 기술적 지표 저장 완료!")


# 🔹 기술적 지표 데이터 가져오기
df = get_technical_data()

# 🔹 테이블 생성 & 데이터 저장 실행
create_tech_table()
save_tech_to_db(df)
