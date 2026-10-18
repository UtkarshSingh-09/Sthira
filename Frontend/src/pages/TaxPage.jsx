import React, { useState } from 'react';
import { 
  Receipt, Upload, CheckCircle2, AlertTriangle, 
  ArrowRight, ShieldCheck, FileText, Check 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function TaxPage() {
  const { currentUser } = useUser();
  const [salary, setSalary] = useState(currentUser?.annual_salary || 2400000);
  const [ded80C, setDed80C] = useState(150000);
  const [ded80D, setDed80D] = useState(25000);
  const [dedNps, setDedNps] = useState(50000);
  const [hraRent, setHraRent] = useState(300000);
  const [homeLoan24b, setHomeLoan24b] = useState(0);

  // Deterministic Indian Tax Calculations FY 2024-25 / 2025-26
  // Standard Deduction: ₹75,000 for New Regime, ₹50,000 for Old Regime
  const oldStdDed = 50000;
  const newStdDed = 75000;

  // Old Regime Taxable Income
  const oldTotalDeductions = oldStdDed + Math.min(150000, ded80C) + Math.min(25000, ded80D) + Math.min(50000, dedNps) + hraRent + Math.min(200000, homeLoan24b);
  const oldTaxableIncome = Math.max(0, salary - oldTotalDeductions);

  // Old Slabs: 0-2.5L: 0, 2.5-5L: 5%, 5-10L: 20%, >10L: 30%
  let oldTax = 0;
  if (oldTaxableIncome > 1000000) {
    oldTax = 112500 + (oldTaxableIncome - 1000000) * 0.3;
  } else if (oldTaxableIncome > 500000) {
    oldTax = 12500 + (oldTaxableIncome - 500000) * 0.2;
  } else if (oldTaxableIncome > 250000) {
    oldTax = (oldTaxableIncome - 250000) * 0.05;
  }
  const oldCess = oldTax * 0.04;
  const oldFinalTax = Math.round(oldTax + oldCess);

  // New Regime Taxable Income (Sec 115BAC)
  const newTaxableIncome = Math.max(0, salary - newStdDed);
  let newTax = 0;
  if (newTaxableIncome > 1500000) {
    newTax = 140000 + (newTaxableIncome - 1500000) * 0.3;
  } else if (newTaxableIncome > 1200000) {
    newTax = 90000 + (newTaxableIncome - 1200000) * 0.2;
  } else if (newTaxableIncome > 900000) {
    newTax = 45000 + (newTaxableIncome - 900000) * 0.15;
  } else if (newTaxableIncome > 600000) {
    newTax = 15000 + (newTaxableIncome - 600000) * 0.1;
  } else if (newTaxableIncome > 300000) {
    newTax = (newTaxableIncome - 300000) * 0.05;
  }
  const newCess = newTax * 0.04;
  const newFinalTax = Math.round(newTax + newCess);

  const optimalRegime = oldFinalTax < newFinalTax ? 'OLD REGIME' : 'NEW REGIME';
  const taxSavings = Math.abs(oldFinalTax - newFinalTax);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-2">
          <Receipt className="h-3.5 w-3.5" />
          <span>TAX ARBITRAGE & RECONCILIATION ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Old vs New Regime (Section 115BAC) Comparison
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Deterministic slab calculation with missed deduction scanner under Section 80C, 80D, 80CCD(1B), and HRA.
        </p>
      </div>

      {/* Winner Recommendation Banner */}
      <div className={`p-6 rounded-2xl border ${
        optimalRegime === 'OLD REGIME' ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-cyan-950/30 border-cyan-500/40'
      } flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl`}>
        <div className="space-y-1">
          <div className="text-xs font-mono tracking-wider uppercase text-emerald-400 font-semibold flex items-center space-x-1.5">
            <CheckCircle2 className="h-4 w-4" />
            <span>Optimal Tax Declaration for Payroll</span>
          </div>
          <div className="text-2xl font-bold text-white">
            Choose <span className="text-emerald-400 underline">{optimalRegime}</span> to save ₹{taxSavings.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-400">
            Based on your CTC of ₹{(salary/100000).toFixed(1)}L and current eligible deductions of ₹{(oldTotalDeductions/1000).toFixed(0)}k.
          </p>
        </div>

        <div className="px-5 py-3 rounded-xl bg-slate-900 border border-white/10 text-right">
          <div className="text-[10px] font-mono text-slate-400">NET ANNUAL SAVING</div>
          <div className="text-2xl font-mono font-extrabold text-emerald-400">
            ₹{taxSavings.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Regime Card */}
        <div className="p-6 rounded-2xl bg-[#0E131F] border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="font-bold text-lg text-white">Old Tax Regime</div>
            <span className="text-xs font-mono text-slate-400">Standard Ded: ₹50,000</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Gross Income:</span>
              <span className="font-mono text-slate-200">₹{salary.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Total Deductions Claimed:</span>
              <span className="font-mono text-emerald-400 font-semibold">-₹{oldTotalDeductions.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Net Taxable Income:</span>
              <span className="font-mono text-slate-200">₹{oldTaxableIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Tax Before Cess:</span>
              <span className="font-mono text-slate-200">₹{Math.round(oldTax).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Health & Edu Cess (4%):</span>
              <span className="font-mono text-slate-200">₹{Math.round(oldCess).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between pt-2 text-sm font-bold">
              <span className="text-white">Total Tax Payable:</span>
              <span className="font-mono text-white text-base">₹{oldFinalTax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* New Regime Card */}
        <div className="p-6 rounded-2xl bg-[#0E131F] border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="font-bold text-lg text-white">New Tax Regime (115BAC)</div>
            <span className="text-xs font-mono text-emerald-400">Standard Ded: ₹75,000</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Gross Income:</span>
              <span className="font-mono text-slate-200">₹{salary.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Standard Deduction:</span>
              <span className="font-mono text-emerald-400 font-semibold">-₹75,000</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Net Taxable Income:</span>
              <span className="font-mono text-slate-200">₹{newTaxableIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Tax Before Cess:</span>
              <span className="font-mono text-slate-200">₹{Math.round(newTax).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Health & Edu Cess (4%):</span>
              <span className="font-mono text-slate-200">₹{Math.round(newCess).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between pt-2 text-sm font-bold">
              <span className="text-white">Total Tax Payable:</span>
              <span className="font-mono text-white text-base">₹{newFinalTax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
