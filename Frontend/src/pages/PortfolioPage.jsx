import React, { useState } from 'react';
import { 
  PieChart, Upload, FileText, CheckCircle2, AlertTriangle, 
  ArrowRight, ShieldCheck, TrendingUp, Layers, RefreshCw 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function PortfolioPage() {
  const { currentUser } = useUser();
  const [selectedTab, setSelectedTab] = useState('holdings');
  const [casPassword, setCasPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const sampleFunds = [
    { name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', invested: 350000, current: 440000, xirr: 18.2, ter: '0.72% Direct', plan: 'DIRECT' },
    { name: 'HDFC Top 100 Large Cap', category: 'Large Cap', invested: 250000, current: 295000, xirr: 13.5, ter: '1.82% Regular', plan: 'REGULAR' },
    { name: 'Mirae Asset Large & Midcap', category: 'Large & Midcap', invested: 200000, current: 245000, xirr: 15.1, ter: '0.64% Direct', plan: 'DIRECT' },
    { name: 'Nippon India Small Cap', category: 'Small Cap', invested: 150000, current: 210000, xirr: 22.4, ter: '0.85% Direct', plan: 'DIRECT' },
  ];

  const overlapPairs = [
    { pair: 'Parag Parikh Flexi Cap ↔ HDFC Top 100', overlap: '34.2%', severity: 'HIGH', stocks: 'HDFC Bank, ICICI Bank, Infosys, ITC' },
    { pair: 'Mirae Large & Midcap ↔ HDFC Top 100', overlap: '28.5%', severity: 'MEDIUM', stocks: 'Reliance, L&T, Axis Bank' },
    { pair: 'Nippon Small Cap ↔ Parag Parikh Flexi', overlap: '4.1%', severity: 'LOW', stocks: 'Minimal overlap (Good diversification)' },
  ];

  const handleSimulateCasUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-2">
            <PieChart className="h-3.5 w-3.5" />
            <span>PORTFOLIO X-RAY & COSINE OVERLAP ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Mutual Fund Overlap & Fee Drag Analyzer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Detect hidden stock duplicate holdings across AMCs and eliminate distributor commission drag.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-slate-900 border border-white/10">
          <button
            onClick={() => setSelectedTab('holdings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              selectedTab === 'holdings' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Holdings & Returns
          </button>
          <button
            onClick={() => setSelectedTab('overlap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              selectedTab === 'overlap' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overlap Matrix
          </button>
          <button
            onClick={() => setSelectedTab('upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              selectedTab === 'upload' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Upload CAS PDF
          </button>
        </div>
      </div>

      {/* CAS Upload Box */}
      {selectedTab === 'upload' && (
        <div className="p-8 rounded-2xl bg-[#0E131F] border border-white/10 max-w-2xl mx-auto space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Upload className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Upload CAMS / KFintech CAS PDF</h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Automated deterministic parser extracts all mutual fund folios, NAVs, and holding periods directly into Sthira OS.
            </p>
          </div>

          <form onSubmit={handleSimulateCasUpload} className="space-y-4">
            <div className="border-2 border-dashed border-white/15 rounded-xl p-6 text-center hover:border-emerald-500/50 transition cursor-pointer bg-slate-900/40">
              <FileText className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-200">
                Click to browse or drop your CAS PDF statement
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Supports CAMS and KFintech consolidated statements
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1">
                PDF Password (usually your PAN in capital letters or DOB)
              </label>
              <input
                type="password"
                required
                value={casPassword}
                onChange={(e) => setCasPassword(e.target.value)}
                placeholder="e.g. ABCPS1234F"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95 transition cursor-pointer"
            >
              {isUploading ? 'Parsing CAS Statement...' : 'Ingest & Run Overlap X-Ray →'}
            </button>
          </form>

          {uploadSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>CAS Statement successfully ingested! 4 mutual funds parsed and synced to your portfolio.</span>
            </div>
          )}
        </div>
      )}

      {/* Holdings View */}
      {selectedTab === 'holdings' && (
        <div className="p-6 rounded-2xl bg-[#0E131F] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Active Fund Holdings</h2>
            <span className="text-xs font-mono text-emerald-400">Total Valuation: ₹11,90,000</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px]">
                  <th className="pb-3">FUND SCHEME</th>
                  <th className="pb-3">CATEGORY</th>
                  <th className="pb-3">INVESTED</th>
                  <th className="pb-3">CURRENT VALUE</th>
                  <th className="pb-3">XIRR</th>
                  <th className="pb-3">EXPENSE RATIO (TER)</th>
                  <th className="pb-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sampleFunds.map((f, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="py-3.5 font-semibold text-slate-100">{f.name}</td>
                    <td className="py-3.5 text-slate-400 font-mono">{f.category}</td>
                    <td className="py-3.5 font-mono text-slate-300">₹{f.invested.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 font-mono font-bold text-emerald-400">₹{f.current.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 font-mono text-emerald-300 font-semibold">+{f.xirr}%</td>
                    <td className="py-3.5 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        f.plan === 'REGULAR' ? 'bg-red-950/60 text-red-400 border border-red-500/30' : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {f.ter}
                      </span>
                    </td>
                    <td className="py-3.5">
                      {f.plan === 'REGULAR' ? (
                        <span className="text-[10px] font-mono text-amber-400 font-semibold hover:underline cursor-pointer">
                          Switch to Direct (Save ₹4.2K/yr)
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">Optimal Plan</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Overlap View */}
      {selectedTab === 'overlap' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <span>High Overlap Alert: Parag Parikh and HDFC Top 100 share 34.2% of identical underlying equities. You are paying double expense ratio for the same portfolio!</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {overlapPairs.map((pair, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-200 text-sm">{pair.pair}</div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                    pair.severity === 'HIGH' ? 'bg-red-950/80 text-red-400 border border-red-500/40' :
                    pair.severity === 'MEDIUM' ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40' :
                    'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    {pair.overlap} Overlap ({pair.severity})
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  <strong className="text-slate-300">Duplicated Underlying Stocks:</strong> {pair.stocks}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
