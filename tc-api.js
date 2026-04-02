// ============================================================
// tc-api.js — Toyota Charoensri Shared API Library
// วางไฟล์นี้ไว้ในโฟลเดอร์เดียวกับไฟล์ html ทุกไฟล์
// ============================================================

const TC_API = {

  // Web App URL จาก Google Apps Script
  WEBAPP_URL: "https://script.google.com/macros/s/AKfycby9bq3FvwM8zSCLy2nTxWyoevRPYiOfZtdV6D2KR4a8YxOtI6FDm2ltgoMyBU9-Nzqo/exec",

  async post(action, data) {
    try {
      const res = await fetch(this.WEBAPP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action, ...data })
      });
      return await res.json();
    } catch (err) {
      console.error("TC_API Error:", err);
      return { success: false, error: err.toString() };
    }
  },

  async get(sheet, limit = 30) {
    try {
      const res = await fetch(`${this.WEBAPP_URL}?sheet=${sheet}&limit=${limit}`);
      return await res.json();
    } catch (err) {
      return { success: false, data: [] };
    }
  },

  async flashPL(data)       { return await this.post("flash_pl", data); },
  async cashDeposit(data)   { return await this.post("cash_deposit", data); },
  async otRequest(data)     { return await this.post("ot_request", data); },
  async leaveRequest(data)  { return await this.post("leave_request", data); },
  async gatePass(data)      { return await this.post("gate_pass", data); },
  async gateReturn(data)    { return await this.post("gate_return", data); },
  async poRequest(data)     { return await this.post("po_request", data); },
  async expenseClaim(data)  { return await this.post("expense_claim", data); },
  async approve(sheet, row, approved, approver, note = "") {
    return await this.post("approve", { sheet_name: sheet, row, approved, approver_name: approver, note });
  },
  async dailyService(data)  { return await this.post("daily_service", data); },
  async dailySales(data)    { return await this.post("daily_sales", data); },
  async warningLetter(data) { return await this.post("warning_letter", data); },

  showLoading(btn, text = "กำลังส่ง...") {
    if (!btn) return;
    btn.disabled = true;
    btn._orig = btn.textContent;
    btn.textContent = text;
  },

  hideLoading(btn) {
    if (!btn) return;
    btn.disabled = false;
    btn.textContent = btn._orig || "ส่ง";
  },

  toast(msg, ok = true) {
    let t = document.getElementById("_tc_toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "_tc_toast";
      t.style.cssText = "position:fixed;bottom:24px;right:24px;padding:12px 18px;border-radius:8px;font-size:13px;font-family:sans-serif;z-index:9999;transition:opacity .3s;max-width:300px;line-height:1.5;box-shadow:0 4px 12px rgba(0,0,0,.15)";
      document.body.appendChild(t);
    }
    t.style.background = ok ? "#166534" : "#b5000f";
    t.style.color = "#fff";
    t.style.opacity = "1";
    t.textContent = (ok ? "✅ " : "❌ ") + msg;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.style.opacity = "0", 3500);
  },

  formatBaht(n) {
    return "฿" + parseFloat(n || 0).toLocaleString("th-TH");
  }
};
