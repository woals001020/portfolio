# 🛸 F450 쿼드콥터 드론 제작

> OSD 동아리 활동으로 F450 프레임 기반 쿼드콥터 드론을 설계·제작하고, 오실로스코프를 활용한 체계적 트러블슈팅으로 GND 루프 문제를 진단·해결하여 안정적 비행을 달성한 프로젝트

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|:---:|:---|
| **활동** | OSD 동아리 (드론 제작) |
| **기간** | 2023년 |
| **담당 역할** | 하드웨어 설계, 회로 배선, 측정 기반 트러블슈팅, PID 제어 튜닝 |

### 핵심 키워드
**"감이 아닌 측정 데이터로 문제를 진단한다"** — 이 프로젝트에서 체득한 엔지니어링 원칙

---

## 🛠 기술 스택

![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)

- **프레임**: F450 쿼드콥터 프레임
- **제어**: Arduino, MPU6050(6축 자이로/가속도 센서), PID 제어
- **모터**: BLDC 모터 4개, ESC(전자변속기) 4개
- **측정 장비**: 오실로스코프, 멀티미터
- **기타**: 납땜, AWG 전선 규격 계산

---

## 📸 프로젝트 사진

### 드론 설계 구조
<img src="./images/drone_p5.png" width="700"/>

> F450 프레임 기반 쿼드콥터 설계 구조도

### 회로 배선도
<img src="./images/drone_p10.png" width="700"/>

> ESC-모터-배터리-FC 간 전체 배선 설계

### 상세 배선 작업
<img src="./images/drone_p15.png" width="700"/>

> 실제 배선 및 납땜 작업 과정

### 드론 완성품
<img src="./images/drone_p20.png" width="700"/>

> 조립 완료된 F450 쿼드콥터 드론

### PID 제어 구조
<img src="./images/drone_p30.png" width="700"/>

> Outer P Control(각도) + Inner PID Control(각속도) 이중 루프 구조

### 비행 테스트
<img src="./images/drone_p40.png" width="700"/>

> PID 파라미터 튜닝 후 안정 비행 테스트

---

## ⚠️ 문제 상황

드론 조립 완료 후 **모터가 비정상적으로 동작**하며 원인 불명의 오동작이 반복 발생:
- 특정 모터만 간헐적으로 출력이 떨어짐
- PWM 신호를 정상적으로 보내도 모터 반응이 불안정
- 소프트웨어 로직에는 문제가 없는 상황

---

## ✅ 해결 과정

### 1. 오실로스코프 파형 분석
- PWM 신호 라인과 전원 라인의 파형을 오실로스코프로 동시 측정
- **전원 라인에서 비정상적인 노이즈 패턴** 발견
- 노이즈 패턴이 모터 동작 시에만 나타나는 것을 확인

### 2. GND 루프 진단
- 노이즈 패턴 분석 결과, **GND 루프(Ground Loop)** 가 원인임을 파악
- 여러 ESC의 GND가 서로 다른 경로로 배터리에 연결되면서 **접지 전위차** 발생
- 이 전위차가 PWM 신호에 노이즈로 작용하여 모터 오동작을 유발

### 3. 접지 배선 재설계
- 모든 ESC의 GND를 **단일 접지점(Star Ground)** 방식으로 재배선
- 기존 배선을 제거하고 **새로 납땜** 작업 수행
- GND 루프 제거 후 오실로스코프로 노이즈 소멸 확인

### 4. AWG 전선 규격 최적화
- 모터별 최대 전류 소비를 계산하여 **적정 AWG 규격** 선정
- 전선 저항에 의한 전압 강하를 최소화하여 모터 출력 안정화

### 5. PID 제어 파라미터 튜닝
- MPU6050 자이로 센서 데이터를 기반으로 PID 파라미터 체계적 조정
- **Outer P Control**(각도 제어) + **Inner PID Control**(각속도 제어) 이중 루프 구조

---

## 💻 핵심 코드

### MPU6050 기반 PID 자세 제어

```cpp
// PID_Control.ino
// MPU6050 기반 PID 자세 제어 핵심부

// Outer P control (각도 제어)
Pitch_Err = mPitch - PID_Pitch_Setpoint;
Roll_Err  = mRoll  - PID_Roll_Setpoint;
Pitch_P = Pitch_Err * P_Gain;
Roll_P  = Roll_Err  * P_Gain;

// Inner PID control (각속도 제어)
Pitch_Rate_Err = Pitch_P + Gyro_Pitch_Input;
Roll_Rate_Err  = Roll_P  + Gyro_Roll_Input;

// PID 각 요소 계산
Pitch_Rate_P = Pitch_Rate_Err * Rate_P_Gain;
Pitch_Rate_I += Pitch_Rate_Err * Rate_I_Gain * dt;
Pitch_Rate_D = (Pitch_Rate_Err - Prev_Pitch_Rate_Err) / dt * Rate_D_Gain;

Pitch_Rate_PID = Pitch_Rate_P + Pitch_Rate_I + Pitch_Rate_D;

// 모터 속도 = 스로틀 + PID 출력 (X 배열)
nMotorSpeed01 = nThrottle + (Pitch_Rate_PID + Roll_Rate_PID);   // 전방 우측
nMotorSpeed02 = nThrottle + (-Pitch_Rate_PID + Roll_Rate_PID);  // 후방 우측
nMotorSpeed03 = nThrottle + (-Pitch_Rate_PID - Roll_Rate_PID);  // 후방 좌측
nMotorSpeed04 = nThrottle + (Pitch_Rate_PID - Roll_Rate_PID);   // 전방 좌측
```

---

## 📊 결과

| 항목 | 성과 |
|:---:|:---|
| **비행** | GND 루프 해결 후 안정적 호버링 및 비행 달성 |
| **진단 방법** | 오실로스코프 파형 분석으로 하드웨어 문제 원인 규명 |
| **핵심 학습** | "감이 아닌 측정 데이터로 문제를 진단한다"는 엔지니어링 원칙 체득 |

---

## 🔑 핵심 역량 키워드

- **측정 기반 디버깅**: 오실로스코프를 활용한 전기적 문제 분석
- **하드웨어 트러블슈팅**: GND 루프 진단 → 접지 재설계 → 납땜으로 해결
- **제어 공학**: PID 제어 파라미터 튜닝, 이중 루프 제어 구조 이해

[← 메인 포트폴리오로 돌아가기](../README.md)
