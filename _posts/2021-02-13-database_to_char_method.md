---
layout: post
title:  "[dataBase] TO_CHAR() 함수 사용법"
date:   2021-02-13 00:00:00 +0700
categories: [dataBase]
---

TO_CHAR() 함수는 날짜, 숫자 등의 값을 문자열로 반환하는 함수이다.

> 날짜 포맷 변경 (YYYY-MM-DD)

```sql
SELECT TO_CHAR(SYSDATE, 'YYYYMMDD')              --20200723
     , TO_CHAR(SYSDATE, 'YYYY/MM/DD')            --2020/07/23
     , TO_CHAR(SYSDATE, 'YYYY-MM-DD')            --2020-07-23
     , TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS') --2020-07-23 11:10:52
FROM dual
```

YYYY: 년, MM: 월, DD: 일, HH24: 24시간, HH: 12시간, MI: 분, SS:초

> 소수점 변경

```sql
SELECT TO_CHAR(123.456, 'FM990.999') --123.456
     , TO_CHAR(1234.56, 'FM9990.99') --1234.56
     , TO_CHAR(0.12345, 'FM9990.99') --0.12
FROM dual
```

FM : 문자열의 공백제거

9 : 해당자리의 숫자를 의미, 값이 없을 경우 소수점 이상은 공백 소수점 이하는 0으로 표시

0 : 해당자리의 숫자를 의미, 값이 없을 경우 0으로 표시 숫자의 길이를 고정적으로 표시 할 때 사용

> 숫자 콤마 찍기

```sql
SELECT TO_CHAR(123467, 'FM999,999')        --123,467
     , TO_CHAR(123467890, 'FM999,999,999') --123,467,890
     , TO_CHAR(123467, 'FML999,999')       --￦123,467
FROM dual
```

> 날짜의 "0" 없애기

```sql
SELECT TO_CHAR(SYSDATE, 'MM/DD')   --07/03
     , TO_CHAR(SYSDATE, 'FMMM/DD') --7/3
FROM dual
```

> 임의의 구분자로 날짜 형식 만들기

```sql
SELECT TO_CHAR(SYSDATE, '""YYYY"년 "MM"월 "DD"일"') --2020년 07월 23일
     , TO_CHAR(SYSDATE, '""HH24"시 "MI"분 "SS"초"') --11시 12분 20초
FROM dual
```

> 시간의 오전, 오후 값 반환

```sql
SELECT TO_CHAR(SYSDATE, 'AM')                    --오전
     , TO_CHAR(SYSDATE, 'AM HH:MI:SS')           --오전 11:44:31
     , TO_CHAR(SYSDATE, 'YYYY-MM-DD AMHH:MI:SS') --2020-07-23 오전11:44:31
FROM dual
```

> 날짜의 요일 반환

```sql
SELECT TO_CHAR(SYSDATE, 'D')   --5 : 1(일)~7(토)
     , TO_CHAR(SYSDATE, 'DY')  --목
     , TO_CHAR(SYSDATE, 'DAY') --목요일
FROM dual
```

> 1년기준 몇일, 몇주, 분기 반환

```sql
SELECT TO_CHAR(SYSDATE, 'DDD') --365일 기준 205일
     , TO_CHAR(SYSDATE, 'WW')  --1년 기준 30주
     , TO_CHAR(SYSDATE, 'Q')   --3분기
FROM dual
```

> 간편한 날짜 변환

```sql
SELECT TO_CHAR(SYSDATE, 'MON') --7월
     , TO_CHAR(SYSDATE, 'DL')  --2020년 7월 23일 목요일
FROM dual
```
