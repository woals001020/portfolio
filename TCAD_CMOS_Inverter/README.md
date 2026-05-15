# 💻 TCAD CMOS Inverter 시뮬레이션

> TCAD Sentaurus를 활용하여 CMOS Inverter의 전 공정을 시뮬레이션하고, n-well 도핑 농도 최적화를 통해 NMOS/PMOS 대칭 동작 및 정상적인 VTC(Voltage Transfer Characteristic)를 검증한 프로젝트

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|:---:|:---|
| **과목** | 반도체공정설계 |
| **기간** | 2024년 |
| **담당 역할** | 공정 시뮬레이션 설계, 파라미터 최적화, I-V/VTC 분석 |

### 연구 목적
TCAD Sentaurus의 Process Editor를 사용하여 CMOS Inverter의 전 공정 플로우(산화, 이온주입, 식각, 금속배선 등)를 시뮬레이션하고, 공정 파라미터가 소자 특성에 미치는 영향을 정량적으로 분석합니다.

---

## 🛠 기술 스택

![TCAD](https://img.shields.io/badge/TCAD_Sentaurus-003B57?style=for-the-badge)

- **시뮬레이션**: Synopsys TCAD Sentaurus (Process + Device 시뮬레이션)
- **분석 항목**: I-V 특성, VTC(Voltage Transfer Characteristic), 도핑 프로파일
- **설계 대상**: CMOS Inverter (NMOS + PMOS)

---

## 📸 프로젝트 사진

### TCAD 공정 시뮬레이션 뷰
<img src="./images/tcad_simulation.png" width="700"/>

> TCAD Sentaurus에서 CMOS Inverter 공정을 시뮬레이션한 소자 단면도

### 공정 흐름도
<img src="./images/tcad_p2.png" width="700"/>

> CMOS Inverter 제작을 위한 전체 공정 플로우 설계

### I-V 특성 그래프
<img src="./images/tcad_p5.png" width="700"/>

> NMOS 및 PMOS 트랜지스터의 I-V 특성 곡선 — Vth 및 동작 영역 확인

### 도핑 프로파일
<img src="./images/tcad_p10.png" width="700"/>

> n-well 및 source/drain 이온주입 후 도핑 농도 프로파일

### VTC (Voltage Transfer Characteristic) 분석
<img src="./images/tcad_p15.png" width="700"/>

> CMOS Inverter의 VTC 곡선 — 전환 전압(Vm)이 VDD/2에 근접하여 대칭 동작 확인

### 추가 분석 데이터
<img src="./images/tcad_p20.png" width="700"/>

> 공정 파라미터 변경에 따른 소자 특성 변화 분석

### 최적화 결과 비교
<img src="./images/tcad_p35.png" width="700"/>

> n-well 도핑 최적화 전후 비교 결과

---

## ⚠️ 문제 상황

1. **PMOS Vth 이상**: 초기 시뮬레이션에서 **n-well 도핑 농도가 부적절**하여 PMOS 트랜지스터의 Vth가 설계 사양을 벗어남
2. **NMOS/PMOS 비대칭**: NMOS와 PMOS의 전류 구동 능력이 불균형하여 Inverter의 전환 전압(Vm)이 VDD/2에서 크게 벗어남
3. **VTC 불량**: 전환 전압 편차로 인해 노이즈 마진이 부족하여 정상적인 디지털 동작 보장 불가

---

## ✅ 해결 과정

### 1. Sentaurus Process Editor로 전 공정 구현
CMOS Inverter 제작에 필요한 전체 공정을 순서대로 시뮬레이션:

| 순서 | 공정 | 상세 |
|:---:|:---|:---|
| 1 | 초기 산화 | 실리콘 기판 위 SiO₂ 보호막 형성 |
| 2 | n-well 이온주입 | PMOS 영역에 n형 도핑 |
| 3 | 게이트 산화 | 얇은 게이트 산화막 형성 |
| 4 | 폴리실리콘 게이트 | 게이트 전극 패터닝 |
| 5 | S/D 이온주입 | NMOS(n+), PMOS(p+) source/drain 형성 |
| 6 | 금속 배선 | Al 배선 및 Contact 형성 |

### 2. n-well 도핑 최적화
- n-well **이온주입 에너지**와 **도즈량(Dose)**을 체계적으로 조정
- 에너지를 높이면 → well 깊이 증가 → PMOS 채널 특성 변화
- 도즈량을 조절하여 → PMOS Vth를 목표 범위 내로 튜닝

### 3. VTC 분석으로 대칭 동작 검증
- 최적화된 n-well 파라미터로 시뮬레이션 재수행
- VTC 곡선에서 **전환 전압(Vm) ≈ VDD/2** 달성
- NMOS/PMOS 대칭 동작으로 적절한 노이즈 마진 확보

### 4. 도핑 프로파일 정밀 분석
- 깊이 방향 도핑 농도 프로파일을 추출하여 junction 위치 확인
- channel doping, S/D doping이 설계 사양에 부합하는지 검증

---

## 📊 결과

| 항목 | 성과 |
|:---:|:---|
| **CMOS Inverter** | 정상 동작하는 CMOS Inverter 시뮬레이션 완성 |
| **VTC 검증** | 전환 전압(Vm) ≈ VDD/2 달성, 대칭 동작 확인 |
| **핵심 학습** | 공정 파라미터(도핑 에너지, 도즈량)가 소자 특성(Vth, VTC)에 미치는 영향을 정량적으로 이해 |
| **도구 숙련** | TCAD Sentaurus Process/Device 시뮬레이션 전 과정 수행 역량 확보 |

---

## 🔑 핵심 역량 키워드

- **TCAD 시뮬레이션**: Sentaurus Process + Device 시뮬레이션 전 과정 수행
- **공정-소자 연계 분석**: 공정 파라미터 변경 → 소자 특성 변화 정량적 분석
- **반도체 공정 이해**: 이온주입, 산화, 식각 등 8대 공정에 대한 심화 이해

[← 메인 포트폴리오로 돌아가기](../README.md)
