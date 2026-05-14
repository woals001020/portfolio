document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Project modal logic
  const modalData = {
    aiot: {
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      icon: '🤖',
      title: 'AIoT 반려동물 자동 급식기',
      role: 'AI 모델 학습 · 시스템 설계 · 하드웨어 통합',
      tags: ['YOLOv11', 'Raspberry Pi 4', 'Arduino Uno', 'Python', 'UART', 'ONNX', '3D Printing', 'MG996R'],
      images: [
        { src: 'images/aiot_overview.png', caption: '프로젝트 개요' },
        { src: 'images/aiot_p5.png', caption: '시스템 구성도' },
        { src: 'images/aiot_p10.png', caption: 'YOLO 학습 데이터' },
        { src: 'images/aiot_result.png', caption: '학습 결과 (confusion matrix)' },
        { src: 'images/aiot_p22.png', caption: '최종 완성품' }
      ],
      overview: 'PIR 센서로 움직임을 감지하면 카메라가 반려동물 종류(강아지/고양이)를 인식하고, 맞춤 사료를 자동으로 지급하는 IoT 스마트 급식기 시스템입니다.',
      problem: '팀원 1명이 중도 불참하면서 AI 학습, 하드웨어 통합, 3D 모델링을 2인으로 완수해야 했습니다. 또한 Raspberry Pi(3.3V)와 Arduino(5V) 간 전압 차이로 UART 통신 장애가 발생했습니다.',
      solution: [
        'YOLOv11으로 강아지/고양이 분류 모델 학습 (100 epoch, 640×640, best.pt → ONNX 변환)',
        '10kΩ 저항 전압 분배 회로로 5V→3.3V 변환하여 UART 안정화',
        'MG996R 서보모터 채택으로 토크 부족 문제 해결 (타 조 대비 확실한 동작)',
        '초음파 센서로 사료량 30% 이하 감지 시 LED 알림 구현',
        '3D 모델링 시 서보모터 치수 반영, 사료 경사도 설계로 막힘 방지'
      ],
      code: [
        {
          lang: 'Arduino',
          filename: 'servo_control.ino',
          code: `<span class="code-comment">// 시리얼 명령 수신 (강아지/고양이)</span>
<span class="code-keyword">if</span> (Serial.<span class="code-function">available</span>() > <span class="code-number">0</span>) {
  <span class="code-type">char</span> cmd = Serial.<span class="code-function">read</span>();
  <span class="code-keyword">if</span> (cmd == <span class="code-string">'D'</span> && !isServoMoving) {
    Serial.<span class="code-function">println</span>(<span class="code-string">"Command: Dog -> 0°"</span>);
    myServo.<span class="code-function">write</span>(<span class="code-number">0</span>);      <span class="code-comment">// 강아지 사료 방향</span>
    servoStart = <span class="code-function">millis</span>();
    isServoMoving = <span class="code-keyword">true</span>;
  } <span class="code-keyword">else if</span> (cmd == <span class="code-string">'C'</span> && !isServoMoving) {
    Serial.<span class="code-function">println</span>(<span class="code-string">"Command: Cat -> 180°"</span>);
    myServo.<span class="code-function">write</span>(<span class="code-number">180</span>);    <span class="code-comment">// 고양이 사료 방향</span>
    servoStart = <span class="code-function">millis</span>();
    isServoMoving = <span class="code-keyword">true</span>;
  }
}`
        },
        {
          lang: 'Python',
          filename: 'yolo_inference.py',
          code: `<span class="code-comment"># YOLO ONNX 모델 추론 → 아두이노 명령 전송</span>
onnx_outputs = session.<span class="code-function">run</span>(output_names,
    {input_name: input_tensor})

detections = <span class="code-function">postprocess_yolo_output</span>(
    onnx_outputs, <span class="code-number">640</span>, <span class="code-number">640</span>,
    CONF_THRESHOLD, NMS_THRESHOLD)

<span class="code-keyword">for</span> det <span class="code-keyword">in</span> detections:
    <span class="code-keyword">if</span> det[<span class="code-string">'class_id'</span>] == DOG_CLASS_ID:
        ser.<span class="code-function">write</span>(<span class="code-string">b'D'</span>)  <span class="code-comment"># 강아지 → 서보 0°</span>
    <span class="code-keyword">elif</span> det[<span class="code-string">'class_id'</span>] == CAT_CLASS_ID:
        ser.<span class="code-function">write</span>(<span class="code-string">b'C'</span>)  <span class="code-comment"># 고양이 → 서보 180°</span>`
        }
      ],
      result: 'IoT Invent-on 경진대회 장려상 수상. 팀원 부재 위기를 우선순위 재설정으로 극복하며 완성도 높은 결과물 도출.'
    },
    drone: {
      gradient: 'linear-gradient(135deg, #0ea5e9, #2dd4bf)',
      icon: '🛸',
      title: 'F450 쿼드콥터 드론 제작',
      role: '하드웨어 설계 · 측정 기반 트러블슈팅',
      tags: ['F450 Frame', 'Arduino', 'PID 제어', '오실로스코프', 'MPU6050', '납땜'],
      images: [
        { src: 'images/drone_p5.png', caption: '드론 설계 구조' },
        { src: 'images/drone_p10.png', caption: '회로 배선도' },
        { src: 'images/drone_p20.png', caption: '드론 완성품' },
        { src: 'images/drone_p30.png', caption: 'PID 제어 구조' },
        { src: 'images/drone_p40.png', caption: '비행 테스트' }
      ],
      overview: 'OSD 동아리 활동으로 F450 프레임 기반 쿼드콥터 드론을 설계·제작하고, 측정 장비를 활용한 체계적 트러블슈팅으로 안정적 비행을 달성한 프로젝트입니다.',
      problem: '드론 조립 완료 후 모터가 비정상적으로 동작하며 원인 불명의 오동작이 반복 발생했습니다.',
      solution: [
        '오실로스코프로 PWM 신호 및 전원 라인 파형 분석',
        'GND 루프(Ground Loop) 문제를 파형 노이즈 패턴으로 진단',
        '접지 배선 재설계 및 납땜으로 GND 루프 제거',
        'AWG 전선 규격 계산으로 모터별 적정 전류 용량 확보',
        'MPU6050 자이로 센서 기반 PID 제어 파라미터 튜닝'
      ],
      code: [
        {
          lang: 'Arduino',
          filename: 'PID_Control.ino',
          code: `<span class="code-comment">// MPU6050 기반 PID 자세 제어 핵심부</span>
<span class="code-comment">// Outer P control (각도 제어)</span>
Pitch_Err = mPitch - PID_Pitch_Setpoint;
Roll_Err  = mRoll  - PID_Roll_Setpoint;
Pitch_P = Pitch_Err * P_Gain;
Roll_P  = Roll_Err  * P_Gain;

<span class="code-comment">// Inner PID control (각속도 제어)</span>
Pitch_Rate_Err = Pitch_P + Gyro_Pitch_Input;
Roll_Rate_Err  = Roll_P  + Gyro_Roll_Input;

<span class="code-comment">// 모터 속도 = 스로틀 + PID 출력 (X 배열)</span>
nMotorSpeed01 = nThrottle + (Pitch_Rate_PID + Roll_Rate_PID);
nMotorSpeed02 = nThrottle + (-Pitch_Rate_PID + Roll_Rate_PID);
nMotorSpeed03 = nThrottle + (-Pitch_Rate_PID - Roll_Rate_PID);
nMotorSpeed04 = nThrottle + (Pitch_Rate_PID - Roll_Rate_PID);`
        }
      ],
      result: '안정적 비행 달성. "감이 아닌 측정 데이터로 문제를 진단한다"는 엔지니어링 원칙 체득.'
    },
    nmos: {
      gradient: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      icon: '⚡',
      title: 'NMOS 8대 공정 실습',
      role: '공정 실습 · I-V 계측 · 원인 분석',
      tags: ['RIE', 'LPCVD', '포토리소그래피', '습식식각', 'I-V Measurement', 'Probe Station'],
      images: [
        { src: 'images/nmos_iv_measurement.jpg', caption: 'Keysight I-V 측정 화면' }
      ],
      overview: '반도체공정기술교육원에서 32시간 동안 NMOS 트랜지스터 8대 공정을 직접 수행하고, 22개 Die의 I-V 특성을 측정하여 공정 편차 원인을 분석한 실습 프로젝트입니다.',
      problem: '제작된 NMOS 트랜지스터의 Die별 I-V 특성에 유의미한 편차가 관측되어, 공정 내 원인 규명이 필요했습니다.',
      solution: [
        '22개 Die에 대해 체계적으로 I-V 특성 측정 수행',
        'Probe Station을 활용한 정밀 계측으로 편차 패턴 파악',
        '습식 식각(Wet Etching) 공정에서의 오버에칭 현상을 원인으로 도출',
        '공정 파라미터(식각 시간, 온도)와 소자 특성 간 상관관계 분석'
      ],
      code: [],
      result: '공정 편차의 root cause를 오버에칭으로 규명. 반도체 8대 공정 전 과정 실습 및 계측 기반 분석 역량 확보.'
    },
    cmos: {
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      icon: '📷',
      title: 'CMOS 이미지센서 광학 시뮬레이션',
      role: 'FDTD 시뮬레이션 · 데이터 수집 · 구조 설계',
      tags: ['Ansys Lumerical FDTD', 'CMOS Image Sensor', 'DTI', 'ARC', 'BSI', 'Semicon Korea'],
      images: [
        { src: 'images/cmos_simulation.png', caption: 'FDTD 시뮬레이션 셋업' },
        { src: 'images/cmos_p25.png', caption: 'DTI 구조 설계' },
        { src: 'images/cmos_p35.png', caption: 'E/H Field 분석' },
        { src: 'images/cmos_result.png', caption: 'QE 향상 결과' },
        { src: 'images/cmos_p40.png', caption: 'DTI 소재별 비교' }
      ],
      overview: '캡스톤 디자인 프로젝트로 Ansys Lumerical FDTD를 활용하여 CMOS 이미지센서의 DTI(Deep Trench Isolation) 구조를 최적화하고 광효율을 향상시킨 연구입니다.',
      problem: '픽셀 미세화에 따른 Crosstalk 문제를 DTI 구조와 소재 변경으로 해결할 방안이 필요했습니다. Low-k 물질의 광학 특성 데이터가 논문에서 부족했습니다.',
      solution: [
        'Semicon Korea 전시회에 직접 참관하여 BlackDiamond(Low-k) 물질 데이터 확보',
        'BSI 구조 대비 DTI 구조의 Crosstalk 억제 효과를 FDTD로 시뮬레이션',
        'SiO₂, HfO₂, BlackDiamond 등 다양한 DTI 소재별 E/H field 분석',
        'ARC(Anti-Reflection Coating) single/double layer 최적 두께 계산 및 시뮬레이션',
        '직접 구성한 DTI 구조로 QE(Quantum Efficiency) 0.374 → 0.425 향상'
      ],
      code: [],
      result: '광효율 13.6% 향상 달성 (QE 0.374→0.425). 캡스톤 디자인 장려상 수상.'
    },
    tcad: {
      gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      icon: '💻',
      title: 'TCAD CMOS Inverter 시뮬레이션',
      role: '공정 시뮬레이션 설계 · 파라미터 최적화',
      tags: ['TCAD Sentaurus', 'CMOS Inverter', 'Process Simulation', 'n-well', 'VTC Analysis'],
      images: [
        { src: 'images/tcad_simulation.png', caption: 'TCAD 공정 시뮬레이션' },
        { src: 'images/tcad_p5.png', caption: 'I-V 특성 그래프' },
        { src: 'images/tcad_p10.png', caption: '도핑 프로파일' },
        { src: 'images/tcad_p15.png', caption: 'VTC 분석 결과' }
      ],
      overview: '반도체공정설계 수업에서 TCAD Sentaurus를 활용하여 CMOS Inverter의 전 공정을 시뮬레이션하고, 공정 파라미터 최적화를 통해 정상 동작을 검증한 프로젝트입니다.',
      problem: 'CMOS Inverter 시뮬레이션에서 n-well 도핑 농도가 부적절하여 PMOS 트랜지스터의 Vth가 설계 사양을 벗어나는 문제가 발생했습니다.',
      solution: [
        'Sentaurus Process Editor로 CMOS 전 공정 플로우 구현',
        'n-well 이온 주입 에너지 및 도즈량 파라미터 체계적 조정',
        'VTC(Voltage Transfer Characteristic) 분석으로 전환 전압 검증',
        'NMOS/PMOS 대칭 동작을 위한 도핑 프로파일 최적화'
      ],
      code: [],
      result: '정상 동작하는 CMOS Inverter 시뮬레이션 완성. 공정 파라미터가 소자 특성에 미치는 영향을 정량적으로 이해.'
    }
  };

  // Open modal
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const theme = card.dataset.theme;
      const data = modalData[theme];
      if (!data) return;

      const overlay = document.getElementById('projectModal');
      const modal = overlay.querySelector('.modal');

      modal.querySelector('.modal-header').style.background = data.gradient;
      modal.querySelector('.modal-header .project-icon').textContent = data.icon;
      modal.querySelector('.modal-title').textContent = data.title;
      modal.querySelector('.modal-role').textContent = data.role;
      modal.querySelector('.modal-overview').textContent = data.overview;
      modal.querySelector('.modal-problem').textContent = data.problem;

      const tagsHtml = data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
      modal.querySelector('.modal-tags').innerHTML = tagsHtml;

      const solutionHtml = data.solution.map(s => `<li>${s}</li>`).join('');
      modal.querySelector('.modal-solution').innerHTML = solutionHtml;

      modal.querySelector('.modal-result-text').textContent = data.result;

      // Render image gallery
      const gallerySection = modal.querySelector('.modal-gallery-section');
      const gallery = modal.querySelector('.modal-gallery');
      if (data.images && data.images.length > 0) {
        gallerySection.style.display = '';
        gallery.innerHTML = data.images.map(img =>
          `<div class="modal-gallery-item" data-src="${img.src}">
            <img src="${img.src}" alt="${img.caption}" loading="lazy">
            <div class="modal-gallery-caption">${img.caption}</div>
          </div>`
        ).join('');
      } else {
        gallerySection.style.display = 'none';
        gallery.innerHTML = '';
      }

      // Render code snippets
      const codeSection = modal.querySelector('.modal-code-section');
      const codeContainer = modal.querySelector('.modal-code-container');
      if (data.code && data.code.length > 0) {
        codeSection.style.display = '';
        codeContainer.innerHTML = data.code.map(c =>
          `<div class="modal-code-block">
            <div class="modal-code-header">
              <span class="modal-code-lang">${c.lang}</span>
              <span class="modal-code-filename">${c.filename}</span>
            </div>
            <pre>${c.code}</pre>
          </div>`
        ).join('');
      } else {
        codeSection.style.display = 'none';
        codeContainer.innerHTML = '';
      }

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const closeModal = () => {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
  };
  document.querySelector('.modal-close')?.addEventListener('click', closeModal);
  document.getElementById('projectModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Lightbox for image zoom
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    document.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.modal-gallery-item');
      if (galleryItem) {
        const src = galleryItem.dataset.src;
        lightbox.querySelector('img').src = src;
        lightbox.classList.add('active');
      }
    });
    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox?.classList.contains('active')) {
        lightbox.classList.remove('active');
      } else {
        closeModal();
      }
    }
  });
});
