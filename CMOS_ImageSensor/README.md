# 📷 CMOS 이미지센서 광학 시뮬레이션

> Ansys Lumerical FDTD를 활용하여 CMOS 이미지센서의 DTI(Deep Trench Isolation) 구조를 최적화하고, 광효율(QE) 0.374 → 0.425 (13.6% 향상)을 달성한 캡스톤 디자인 연구

🏆 **캡스톤 디자인 장려상 수상**

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|:---:|:---|
| **과목** | 캡스톤 디자인 (졸업작품) |
| **기간** | 2024~2025년 |
| **담당 역할** | FDTD 시뮬레이션 설계, DTI 구조 모델링, 데이터 수집 및 분석, Semicon Korea 현장 데이터 확보 |

### 연구 배경
CMOS 이미지센서(CIS) 픽셀 미세화가 진행됨에 따라, 인접 픽셀 간 **Crosstalk**(광간섭) 문제가 심화되고 있습니다. 이를 해결하기 위해 **DTI(Deep Trench Isolation)** 구조의 소재와 두께를 최적화하여 광효율을 향상시키는 연구를 수행했습니다.

---

## 🛠 기술 스택

![Lumerical](https://img.shields.io/badge/Ansys_Lumerical_FDTD-FFB71B?style=for-the-badge&logoColor=black)
![MATLAB](https://img.shields.io/badge/Data_Analysis-0076A8?style=for-the-badge)

- **시뮬레이션**: Ansys Lumerical FDTD (Finite-Difference Time-Domain)
- **분석 대상**: BSI(Back-Side Illumination) CMOS 이미지센서
- **핵심 구조**: DTI (Deep Trench Isolation), ARC (Anti-Reflection Coating)
- **분석 소재**: SiO₂, HfO₂, BlackDiamond (Low-k)

---

## 📸 프로젝트 사진

### FDTD 시뮬레이션 셋업
<img src="./images/cmos_simulation.png" width="700"/>

> Lumerical FDTD 시뮬레이션 환경 구성

### 픽셀 구조 단면도
<img src="./images/cmos_p20.png" width="700"/>

> BSI CMOS 이미지센서 픽셀 구조 단면 설계

### DTI 구조 설계
<img src="./images/cmos_p25.png" width="700"/>

> DTI(Deep Trench Isolation) 구조 모델링 — SiO₂, HfO₂, BlackDiamond 소재 비교

### E/H Field 분석
<img src="./images/cmos_p35.png" width="700"/>

> FDTD 시뮬레이션을 통한 전자기장(E/H Field) 분포 분석
> DTI 유무에 따른 광 전파 경로 차이를 시각화

### DTI 소재별 비교
<img src="./images/cmos_p40.png" width="700"/>

> SiO₂, HfO₂, BlackDiamond 소재별 Crosstalk 억제 효과 비교 분석

### ARC 두께 최적화
<img src="./images/cmos_p50.png" width="700"/>

> ARC(Anti-Reflection Coating) Single/Double Layer 두께 최적화 시뮬레이션 결과

### QE 향상 결과
<img src="./images/cmos_result.png" width="700"/>

> 최종 QE(Quantum Efficiency) 향상 결과: **0.374 → 0.425 (13.6% 향상)**

---

## ⚠️ 문제 상황

1. **Crosstalk 문제**: 픽셀 미세화에 따라 인접 픽셀로 빛이 누설되는 Crosstalk 현상이 심각
2. **Low-k 물질 데이터 부족**: DTI 소재로 유망한 BlackDiamond(Low-k) 물질의 **광학 특성 데이터**가 기존 논문에서 부족
3. **ARC 최적화 복잡성**: Anti-Reflection Coating의 최적 두께가 파장대별로 다르며, Single/Double Layer 조합이 복잡

---

## ✅ 해결 과정

### 1. Semicon Korea 현장 데이터 확보
- **Semicon Korea 전시회에 직접 참관**하여 Applied Materials 부스에서 **BlackDiamond(Low-k)** 물질 데이터 확보
- 논문에 공개되지 않은 굴절률(n), 소광계수(k) 데이터를 현장에서 직접 수집
- 이 데이터를 FDTD 시뮬레이션에 직접 입력하여 신뢰성 있는 결과 도출

### 2. DTI 구조 Crosstalk 억제 효과 검증
- **BSI 구조**(DTI 없음) vs **DTI 구조** 비교 시뮬레이션
- FDTD로 E/H Field 분포를 분석하여 DTI가 인접 픽셀로의 광 누설을 효과적으로 차단함을 확인

### 3. DTI 소재별 비교 분석
| 소재 | 굴절률 (n) | 특성 |
|:---:|:---:|:---|
| SiO₂ | 1.46 | 기존 표준 소재 |
| HfO₂ | 2.10 | High-k, 높은 굴절률 |
| BlackDiamond | ~1.30 | Low-k, 낮은 굴절률로 전반사 효과 극대화 |

### 4. ARC 두께 최적화
- **Single Layer ARC**: 최적 두께에서 반사율 최소화
- **Double Layer ARC**: 두 층의 굴절률 매칭으로 광대역 반사 방지
- 파장 550nm 기준 최적 두께 계산 및 시뮬레이션 검증

### 5. 최종 구조 QE 측정
- 직접 설계한 DTI + ARC 최적 구조에서 **QE 0.374 → 0.425** 달성
- **13.6% 광효율 향상** 확인

---

## 📊 결과

| 항목 | 성과 |
|:---:|:---|
| **QE 향상** | 0.374 → 0.425 **(+13.6%)** |
| **수상** | 캡스톤 디자인 **장려상** |
| **데이터 확보** | Semicon Korea에서 BlackDiamond Low-k 물질 데이터 직접 수집 |
| **시뮬레이션** | 3종 DTI 소재(SiO₂, HfO₂, BlackDiamond) E/H Field 비교 분석 완료 |
| **ARC 최적화** | Single/Double Layer ARC 최적 두께 도출 |

---

## 🔑 핵심 역량 키워드

- **광학 시뮬레이션**: Ansys Lumerical FDTD를 활용한 CIS 구조 최적화
- **데이터 수집 능력**: Semicon Korea 현장에서 미공개 물질 데이터 직접 확보
- **반도체 공정 이해**: DTI, ARC, BSI 등 CIS 핵심 구조에 대한 깊은 이해
- **정량적 분석**: QE, Crosstalk 등 성능 지표를 기반으로 한 설계 최적화

[← 메인 포트폴리오로 돌아가기](../README.md)
