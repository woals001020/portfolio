# 🤖 AIoT 반려동물 자동 급식기

> PIR 센서로 움직임을 감지하면 카메라가 반려동물 종류(강아지/고양이)를 인식하고, 맞춤 사료를 자동으로 지급하는 IoT 스마트 급식기 시스템

🏆 **IoT Invent-on 경진대회 장려상 수상**

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|:---:|:---|
| **프로그램** | AIoT 스마트 디바이스 설계 프로젝트 (IoT Invent-on) |
| **기간** | 2024년 |
| **팀 구성** | 2인 (김수호, 추민영) |
| **담당 역할** | AI 모델 학습 및 튜닝, 시스템 설계, 라즈베리파이-아두이노 통신 구현, 하드웨어 통합 |

### 시스템 동작 흐름
1. **PIR 센서**가 움직임 감지 → 카메라 활성화
2. **라즈베리파이 카메라**가 3초간 촬영
3. **YOLOv11 ONNX 모델**로 반려동물 종류(강아지/고양이) 인식
4. 인식 결과를 **UART 통신**으로 아두이노에 전송
5. **MG996R 서보모터**가 해당 사료통 방향으로 회전하여 사료 지급
6. **초음파 센서**로 사료량 30% 이하 감지 시 LED 알림

---

## 🛠 기술 스택

![YOLOv11](https://img.shields.io/badge/YOLOv11-412991?style=for-the-badge&logo=python&logoColor=white)
![RaspberryPi](https://img.shields.io/badge/Raspberry_Pi_4-C51A4A?style=for-the-badge&logo=raspberrypi&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino_Uno-00979D?style=for-the-badge&logo=arduino&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![ONNX](https://img.shields.io/badge/ONNX-005CED?style=for-the-badge&logo=onnx&logoColor=white)

- **AI**: YOLOv11n, Ultralytics, ONNX Runtime, Labelimg
- **하드웨어**: Raspberry Pi 4, Arduino Uno, PIR 센서, 초음파 센서, MG996R 서보모터
- **통신**: UART 시리얼 (10kΩ 전압 분배 회로 적용)
- **설계**: 3D 프린팅 (Fusion 360)

---

## 📸 프로젝트 사진

### 시스템 구성도
<img src="./images/aiot_p5.png" width="700"/>

> 전체 시스템 아키텍처: PIR → 카메라 → YOLO 추론 → UART → 서보모터

### 시스템 흐름도
<img src="./images/aiot_system.png" width="700"/>

### YOLOv11 학습 데이터
<img src="./images/aiot_p10.png" width="700"/>

> 강아지 학습 40장 + 고양이 학습 40장 + 검증 데이터 각 10장 = 총 100장

### 데이터 라벨링 (Labelimg)
<img src="./images/aiot_p14.png" width="700"/>

> Labelimg를 활용한 바운딩 박스 라벨링 작업

### YOLO 학습 결과
<img src="./images/aiot_result.png" width="700"/>

> Confusion Matrix 및 학습 결과 — 100 epoch, 640×640, batch 16

### 하드웨어 통합
<img src="./images/aiot_p20.png" width="700"/>

> 라즈베리파이 + 아두이노 + 서보모터 + 센서 통합 배선

### 최종 완성품
<img src="./images/aiot_p22.png" width="700"/>

> 3D 프린팅으로 제작한 최종 급식기 외관

### 프로젝트 전체 개요
<img src="./images/aiot_overview.png" width="700"/>

---

## ⚠️ 문제 상황

1. **팀원 부재**: 3인 팀에서 1명이 중도 불참하면서, AI 학습 + 하드웨어 통합 + 3D 모델링을 **2인으로 완수**해야 하는 상황 발생
2. **UART 통신 장애**: Raspberry Pi(3.3V 로직)와 Arduino(5V 로직) 간 **전압 차이**로 시리얼 통신이 불안정
3. **서보모터 토크 부족**: 초기 사용한 SG90 서보모터로는 사료 배출 구조물을 움직이기 어려움

---

## ✅ 해결 과정

### 1. AI 모델 학습 (YOLOv11)
- Anaconda 가상환경(`yolov11_env`)에서 YOLOv11n 모델 학습
- **100 epoch, 640×640, batch 16** 설정으로 학습 진행
- `best.pt` → **ONNX 변환**하여 Raspberry Pi에서 경량 추론 가능하도록 최적화

```yaml
# dataset.yaml
train: pet_dataset/train
val: pet_dataset/val
nc: 2
names: ['cat', 'dog']
```

```python
# train_yolov11.py
from ultralytics import YOLO

model = YOLO('yolov11n.pt')
results = model.train(
    data='pet_dataset/dataset.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    name='custom_pet_yolov11'
)
```

### 2. UART 전압 분배 회로
- **10kΩ 저항 2개**로 전압 분배 회로 구성
- Arduino TX(5V) → 저항 분배 → Raspberry Pi RX(3.3V)로 안정적 변환
- 이 방식으로 UART 통신 오류율 0%를 달성

### 3. 서보모터 업그레이드
- SG90(토크 1.8kg·cm) → **MG996R(토크 11kg·cm)** 로 변경
- 타 조 대비 확실하게 사료 배출 메커니즘 동작

### 4. 3D 모델링 최적화
- 서보모터 치수를 정밀 반영하여 모터 장착 홀 설계
- 사료 경사도 45° 설계로 사료 막힘 방지

---

## 💻 핵심 코드

### Arduino - 서보모터 제어 (UART 명령 수신)

```cpp
// servo_control.ino
// 시리얼 명령 수신 (강아지/고양이)
if (Serial.available() > 0) {
  char cmd = Serial.read();
  if (cmd == 'D' && !isServoMoving) {
    Serial.println("Command: Dog -> 0°");
    myServo.write(0);      // 강아지 사료 방향
    servoStart = millis();
    isServoMoving = true;
  } else if (cmd == 'C' && !isServoMoving) {
    Serial.println("Command: Cat -> 180°");
    myServo.write(180);    // 고양이 사료 방향
    servoStart = millis();
    isServoMoving = true;
  }
}
```

### Python - YOLO ONNX 추론 → 아두이노 명령 전송

```python
# yolo_inference.py
# YOLO ONNX 모델 추론 후 아두이노로 명령 전송
onnx_outputs = session.run(output_names,
    {input_name: input_tensor})

detections = postprocess_yolo_output(
    onnx_outputs, 640, 640,
    CONF_THRESHOLD, NMS_THRESHOLD)

for det in detections:
    if det['class_id'] == DOG_CLASS_ID:
        ser.write(b'D')  # 강아지 → 서보 0°
    elif det['class_id'] == CAT_CLASS_ID:
        ser.write(b'C')  # 고양이 → 서보 180°
```

---

## 📊 결과

| 항목 | 성과 |
|:---:|:---|
| **대회 결과** | IoT Invent-on 경진대회 **장려상 수상** |
| **AI 모델** | YOLOv11 기반 강아지/고양이 분류 모델 학습 완료 |
| **통신 안정성** | 10kΩ 전압 분배 회로로 UART 오류율 0% 달성 |
| **핵심 학습** | 팀원 부재 위기를 우선순위 재설정으로 극복, 완성도 높은 결과물 도출 |

---

## 🔑 핵심 역량 키워드

- **AI/ML**: YOLOv11 모델 학습, ONNX 변환, 추론 파이프라인 구축
- **하드웨어**: Raspberry Pi-Arduino UART 통신, 전압 분배 회로 설계
- **문제 해결**: 팀 위기 관리, 측정 기반 디버깅, 하드웨어-소프트웨어 통합 테스트

[← 메인 포트폴리오로 돌아가기](../README.md)
