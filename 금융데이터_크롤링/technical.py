import pandas as pd
import mysql.connector
from mysql.connector import Error
from sqlalchemy import create_engine

# 🔹 SQLAlchemy 엔진 (pandas.read_sql() 용)
DB_URI = "mysql+mysqlconnector://root:kimtaekgyoon3210@localhost/finance"
engine = create_engine(DB_URI)

def create_connection():
    """ MySQL Connection 객체 반환 (cursor() 사용 가능) """
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="kimtaekgyoon3210",
            database="finance"
        )
        return conn
    except Error as e:
        print(f"❌ MySQL 연결 실패: {e}")
        return None

def get_nvda_daily():
    """ nvda_daily 테이블에서 데이터 가져오기 """
    query = "SELECT * FROM nvda_daily ORDER BY date ASC"
    df = pd.read_sql(query, engine)
    print("✅ 데이터 로드 완료")
    print(df.head())  # 데이터 확인
    print(df.columns)  # 컬럼명 확인

    return df


def get_technical_data():
    """ 기술적 지표를 포함한 데이터프레임 반환 """
    df = get_nvda_daily()

    correct_close_column = "close"  # 컬럼명 확인 후 수정

    # 🔹 이동평균선 (Trend Indicator)
    df['SMA_50'] = df[correct_close_column].rolling(window=50).mean()
    df['SMA_200'] = df[correct_close_column].rolling(window=200).mean()

    # 🔹 MACD 계산 (Trend Indicator)
    df['EMA_12'] = df[correct_close_column].ewm(span=12, adjust=False).mean()
    df['EMA_26'] = df[correct_close_column].ewm(span=26, adjust=False).mean()
    df['MACD'] = df['EMA_12'] - df['EMA_26']
    df['Signal'] = df['MACD'].ewm(span=9, adjust=False).mean()

    # 🔹 RSI 계산 (Momentum Indicator)
    delta = df[correct_close_column].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))

    # 🔹 ADX (Trend Indicator)
    df['TR'] = df['high'] - df['low']
    df['DM_plus'] = df['high'].diff()
    df['DM_minus'] = -df['low'].diff()
    df['DM_plus'] = df['DM_plus'].where(df['DM_plus'] > df['DM_minus'], 0)
    df['DM_minus'] = df['DM_minus'].where(df['DM_minus'] > df['DM_plus'], 0)
    df['ADX'] = (df['DM_plus'] - df['DM_minus']).abs().rolling(14).mean()

    # 🔹 ROC (Momentum Indicator)
    df['ROC'] = df[correct_close_column].pct_change(periods=10) * 100

    # ✅ NaN 값을 NULL로 변경 (MySQL에서 NULL 허용)
    df = df.fillna(None)  # MySQL에서 NULL 값을 허용

    print("✅ 기술적 지표 계산 완료")
    return df


# 🔹 `technical.py`를 직접 실행할 때만 실행되도록 함
if __name__ == "__main__":
    df = get_technical_data()
    print(df.tail())
