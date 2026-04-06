const state = {
  baseGauge: 0,
  interval: 0,
  kiryaku: 0,
  shinsan: 0,
  kanpa: 0,
  jinsoku: 0,
  sairyaku: 0,
  reiken: 0,
  ichinen: 0,
  buretsu: 0,
  fubu: 0,
  kanata: 0,
  sokkou: 0,
  kenbatsu: 0,
  sensokukashin: 0,
  statusUp: 0,
  statusDown: 0,
  statusDuration: 0,
  bouga: 0,
  kongo: 0,
  boiTaisho: 0,
  boiFukusho: 0,
  building: 0,
  shinki: 0
};

const orderedKeys = [
  "baseGauge", "interval", "kiryaku", "shinsan", "kanpa", "jinsoku", "sairyaku", "reiken",
  "ichinen", "buretsu", "fubu", "kanata", "sokkou", "kenbatsu", "sensokukashin",
  "statusUp", "statusDown", "statusDuration", "bouga", "kongo", "boiTaisho", "boiFukusho",
  "building", "shinki"
];

const formulaText = "((interval*(100-(baseGauge+boiTaisho+boiFukusho+kongo+bouga+building+shinki))/100)-(statusDuration*(100+baseSpeed+statusSpeed)/100))/((100+baseSpeed)/100)+statusDuration";
const minimumDisplayedTestCaseSeconds = 19;

const presets = {
  default: { baseGauge: 0, interval: 35, kiryaku: 0, shinsan: 0, kanpa: 0, jinsoku: 0, sairyaku: 0, reiken: 0, ichinen: 0, buretsu: 0, fubu: 0, kanata: 0, sokkou: 0, kenbatsu: 0, sensokukashin: 0, statusUp: 0, statusDown: 0, statusDuration: 0, bouga: 0, kongo: 0, boiTaisho: 0, boiFukusho: 0, building: 0, shinki: 0 }
};

const testCases = [
  { id: "T01", label: "初期状態", values: { baseGauge: 0, interval: 35, kiryaku: 0, shinsan: 0, kanpa: 0, jinsoku: 0, sairyaku: 0, reiken: 0, ichinen: 0, buretsu: 0, fubu: 0, kanata: 0, sokkou: 0, kenbatsu: 0, sensokukashin: 0, statusUp: 0, statusDown: 0, statusDuration: 0, bouga: 0, kongo: 0, boiTaisho: 0, boiFukusho: 0, building: 0, shinki: 0 } },
  { id: "T02", label: "母衣30のみ", values: { baseGauge: 30, interval: 35, kiryaku: 0, shinsan: 0, kanpa: 0, jinsoku: 0, sairyaku: 0, reiken: 0, ichinen: 0, buretsu: 0, fubu: 0, kanata: 0, sokkou: 0, kenbatsu: 0, sensokukashin: 0, statusUp: 0, statusDown: 0, statusDuration: 0, bouga: 0, kongo: 0, boiTaisho: 0, boiFukusho: 0, building: 0, shinki: 0 } },
  { id: "T03", label: "25秒 常時速度盛り", values: { baseGauge: 0, interval: 25, kiryaku: 15, shinsan: 20, kanpa: 10, jinsoku: 10, sairyaku: 10, reiken: 15, ichinen: 10, buretsu: 10, fubu: 5, kanata: 10, sokkou: 10, kenbatsu: 10, sensokukashin: 10, statusUp: 0, statusDown: 0, statusDuration: 0, bouga: 0, kongo: 0, boiTaisho: 0, boiFukusho: 0, building: 0, shinki: 0 } },
  { id: "T04", label: "30秒 ゲージ極振り", values: { baseGauge: 0, interval: 30, kiryaku: 0, shinsan: 0, kanpa: 0, jinsoku: 0, sairyaku: 0, reiken: 0, ichinen: 0, buretsu: 0, fubu: 0, kanata: 0, sokkou: 0, kenbatsu: 0, sensokukashin: 0, statusUp: 0, statusDown: 0, statusDuration: 0, bouga: 20, kongo: 15, boiTaisho: 21, boiFukusho: 7, building: 20, shinki: 20 } },
  { id: "T05", label: "30秒 バランス型", values: { baseGauge: 10, interval: 30, kiryaku: 8, shinsan: 0, kanpa: 10, jinsoku: 0, sairyaku: 10, reiken: 0, ichinen: 10, buretsu: 0, fubu: 5, kanata: 0, sokkou: 6, kenbatsu: 10, sensokukashin: 0, statusUp: 10, statusDown: 0, statusDuration: 8, bouga: 0, kongo: 9, boiTaisho: 9, boiFukusho: 3, building: 10, shinki: 20 } },
  { id: "T06", label: "35秒 デバフ混在", values: { baseGauge: 5, interval: 35, kiryaku: 5, shinsan: 20, kanpa: 0, jinsoku: 10, sairyaku: 0, reiken: 15, ichinen: 0, buretsu: 10, fubu: 0, kanata: 10, sokkou: 3, kenbatsu: 0, sensokukashin: 10, statusUp: 20, statusDown: 0, statusDuration: 12, bouga: 20, kongo: 3, boiTaisho: 12, boiFukusho: 4, building: 15, shinki: 0 } },
  { id: "T07", label: "30秒 弱化のみ", values: { baseGauge: 0, interval: 30, kiryaku: 0, shinsan: 0, kanpa: 0, jinsoku: 0, sairyaku: 0, reiken: 0, ichinen: 0, buretsu: 0, fubu: 0, kanata: 0, sokkou: 0, kenbatsu: 0, sensokukashin: 0, statusUp: 0, statusDown: -10, statusDuration: 10, bouga: 0, kongo: 0, boiTaisho: 0, boiFukusho: 0, building: 0, shinki: 0 } },
  { id: "T08", label: "25秒 強化弱化混在", values: { baseGauge: 15, interval: 25, kiryaku: 15, shinsan: 20, kanpa: 10, jinsoku: 10, sairyaku: 10, reiken: 0, ichinen: 0, buretsu: 0, fubu: 0, kanata: 0, sokkou: 10, kenbatsu: 10, sensokukashin: 10, statusUp: 0, statusDown: -20, statusDuration: 5, bouga: 0, kongo: 9, boiTaisho: 6, boiFukusho: 2, building: 0, shinki: 0 } }
];

function getRadioValue(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? Number(checked.value) : 0;
}

function getCheckboxValue(key) {
  const input = document.querySelector(`input[data-key="${key}"]`);
  return input && input.checked ? Number(input.value) : 0;
}

function setRadioValue(name, value) {
  const target = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (target) {
    target.checked = true;
  }
}

function setCheckboxValue(key, value) {
  const input = document.querySelector(`input[data-key="${key}"]`);
  if (input) {
    input.checked = Number(value) > 0;
  }
}

function updateState() {
  state.baseGauge = Number(document.getElementById("baseGauge").value);
  state.statusDuration = Number(document.getElementById("statusDuration").value);

  ["interval", "kiryaku", "sokkou", "statusUp", "statusDown", "bouga", "kongo", "boiTaisho", "boiFukusho", "building", "shinki"].forEach((key) => {
    state[key] = getRadioValue(key);
  });

  ["shinsan", "kanpa", "jinsoku", "sairyaku", "reiken", "ichinen", "buretsu", "fubu", "kanata", "kenbatsu", "sensokukashin"].forEach((key) => {
    state[key] = getCheckboxValue(key);
  });
}

function calculateActivationTime(inputState = state) {
  const gaugeTotal = inputState.baseGauge + inputState.boiTaisho + inputState.boiFukusho + inputState.kongo + inputState.bouga + inputState.building + inputState.shinki;
  const baseSpeedTotal = inputState.kiryaku + inputState.shinsan + inputState.kanpa + inputState.jinsoku + inputState.sairyaku + inputState.reiken + inputState.ichinen + inputState.buretsu + inputState.fubu + inputState.kanata + inputState.sokkou + inputState.kenbatsu + inputState.sensokukashin;
  const statusSpeedTotal = inputState.statusUp + inputState.statusDown;
  const remainingGaugeTime = inputState.interval * (100 - gaugeTotal) / 100;
  const baseMultiplier = (100 + baseSpeedTotal) / 100;
  const statusMultiplier = (100 + baseSpeedTotal + statusSpeedTotal) / 100;
  const buffedSegment = inputState.statusDuration * statusMultiplier;
  const adjustedRemaining = remainingGaugeTime - buffedSegment;
  const result = adjustedRemaining / baseMultiplier + inputState.statusDuration;

  return {
    result,
    gaugeTotal,
    baseSpeedTotal,
    statusSpeedTotal,
    remainingGaugeTime,
    buffedSegment,
    baseMultiplier,
    statusMultiplier,
    adjustedRemaining
  };
}

function serializeStateToUrl() {
  const params = new URLSearchParams();
  orderedKeys.forEach((key) => {
    const value = state[key];
    if (Number(value) !== 0) {
      params.set(key, String(value));
    }
  });

  const query = params.toString();
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
  history.replaceState(null, "", nextUrl);
  document.getElementById("shareUrlText").textContent = window.location.href;
}

function applyState(values, presetName = null) {
  document.getElementById("baseGauge").value = values.baseGauge ?? 0;
  document.getElementById("statusDuration").value = values.statusDuration ?? 0;

  ["interval", "kiryaku", "sokkou", "statusUp", "statusDown", "bouga", "kongo", "boiTaisho", "boiFukusho", "building", "shinki"].forEach((key) => {
    setRadioValue(key, values[key] ?? 0);
  });

  ["shinsan", "kanpa", "jinsoku", "sairyaku", "reiken", "ichinen", "buretsu", "fubu", "kanata", "kenbatsu", "sensokukashin"].forEach((key) => {
    setCheckboxValue(key, values[key] ?? 0);
  });

  document.querySelectorAll(".preset-button").forEach((button) => {
    button.classList.toggle("is-active", Boolean(presetName) && button.dataset.preset === presetName);
  });

  render();
}

function applyPreset(name) {
  const preset = presets[name];
  if (!preset) {
    return;
  }
  applyState(preset, name);
}

function parseStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const parsed = {};
  let hasAny = false;

  orderedKeys.forEach((key) => {
    if (params.has(key)) {
      parsed[key] = Number(params.get(key));
      hasAny = true;
    }
  });

  return hasAny ? { ...presets.default, ...parsed } : null;
}

function renderTestCases() {
  const body = document.getElementById("testCaseTableBody");
  const visibleTestCases = testCases.filter((testCase) => calculateActivationTime(testCase.values).result >= minimumDisplayedTestCaseSeconds);

  body.innerHTML = visibleTestCases.map((testCase) => {
    const metrics = calculateActivationTime(testCase.values);
    return `
      <tr>
        <td data-label="ケース">${testCase.id}</td>
        <td data-label="概要"><strong>${testCase.label}</strong><span class="case-summary">間隔${testCase.values.interval}秒 / ゲージ${metrics.gaugeTotal}% / 常時${metrics.baseSpeedTotal}%</span></td>
        <td data-label="結果">${metrics.result.toFixed(2)}秒</td>
        <td data-label="操作"><button type="button" class="case-button" data-case-id="${testCase.id}">反映</button></td>
      </tr>
    `;
  }).join("");

  body.querySelectorAll(".case-button").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = visibleTestCases.find((testCase) => testCase.id === button.dataset.caseId);
      if (selected) {
        applyState(selected.values);
      }
    });
  });
}

function updateResultTone(statusSpeedTotal) {
  const card = document.getElementById("resultCard");
  card.classList.remove("state-boost", "state-debuff");

  if (statusSpeedTotal > 0) {
    card.classList.add("state-boost");
  } else if (statusSpeedTotal < 0) {
    card.classList.add("state-debuff");
  }
}

function render() {
  updateState();
  const {
    result,
    gaugeTotal,
    baseSpeedTotal,
    statusSpeedTotal,
    remainingGaugeTime,
    buffedSegment,
    baseMultiplier,
    statusMultiplier,
    adjustedRemaining
  } = calculateActivationTime();

  document.querySelector('[data-range-output="baseGauge"]').textContent = String(state.baseGauge);
  document.querySelector('[data-range-output="statusDuration"]').textContent = String(state.statusDuration);

  document.getElementById("resultValue").textContent = Number.isFinite(result) ? result.toFixed(2) : "0.00";
  document.getElementById("resultDockValue").textContent = Number.isFinite(result) ? result.toFixed(2) : "0.00";
  document.getElementById("gaugeTotal").textContent = `${gaugeTotal}%`;
  document.getElementById("resultDockGauge").textContent = `${gaugeTotal}%`;
  document.getElementById("speedTotal").textContent = `${baseSpeedTotal}%`;
  document.getElementById("resultDockSpeed").textContent = `${baseSpeedTotal}%`;
  document.getElementById("statusTotal").textContent = `${statusSpeedTotal}%`;
  document.getElementById("resultDockStatus").textContent = `${statusSpeedTotal}%`;
  document.getElementById("intervalValue").textContent = `${state.interval}秒`;

  document.getElementById("sidebarGauge").textContent = `${gaugeTotal}%`;
  document.getElementById("sidebarSpeed").textContent = `${baseSpeedTotal}%`;
  document.getElementById("sidebarStatus").textContent = `${statusSpeedTotal}%`;
  document.getElementById("formulaText").textContent = formulaText;

  document.getElementById("remainingGaugeTime").textContent = `${remainingGaugeTime.toFixed(2)}秒`;
  document.getElementById("buffedSegment").textContent = `${buffedSegment.toFixed(2)}秒`;
  document.getElementById("baseMultiplier").textContent = `${baseMultiplier.toFixed(2)}x`;
  document.getElementById("statusMultiplier").textContent = `${statusMultiplier.toFixed(2)}x`;

  document.getElementById("equationStep1").textContent = `1. 基準時間 = ${state.interval} x (100 - ${gaugeTotal}) / 100 = ${remainingGaugeTime.toFixed(2)}秒`;
  document.getElementById("equationStep2").textContent = `2. 状態変化区間 = ${state.statusDuration} x ${statusMultiplier.toFixed(2)} = ${buffedSegment.toFixed(2)}秒`;
  document.getElementById("equationStep3").textContent = `3. 発動時間 = (${remainingGaugeTime.toFixed(2)} - ${buffedSegment.toFixed(2)}) / ${baseMultiplier.toFixed(2)} + ${state.statusDuration} = ${result.toFixed(2)}秒${Math.abs(adjustedRemaining) < 0.0001 ? "（状態変化後の残り時間はほぼ0）" : ""}`;

  updateResultTone(statusSpeedTotal);
  serializeStateToUrl();
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    document.querySelectorAll(".preset-button").forEach((button) => button.classList.remove("is-active"));
    render();
  });

  input.addEventListener("change", () => {
    document.querySelectorAll(".preset-button").forEach((button) => button.classList.remove("is-active"));
    render();
  });
});

document.querySelectorAll(".preset-button").forEach((button) => {
  button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

document.getElementById("copyUrlButton").addEventListener("click", async () => {
  const text = window.location.href;
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById("copyUrlButton").textContent = "コピー済み";
    setTimeout(() => {
      document.getElementById("copyUrlButton").textContent = "URLをコピー";
    }, 1200);
  } catch {
    document.getElementById("shareUrlText").textContent = text;
  }
});

renderTestCases();
const stateFromUrl = parseStateFromUrl();
if (stateFromUrl) {
  applyState(stateFromUrl);
} else {
  applyPreset("default");
}
