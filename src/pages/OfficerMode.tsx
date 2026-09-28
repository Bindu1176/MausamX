import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, AlertTriangle, ArrowRight, Download } from 'lucide-react';
import { locations, getLocationsByType } from '../data/locations';
import { useApp } from '../hooks/useApp';

export default function OfficerMode() {
  const { setSelectedLocationId } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'moderate' | 'low'>('all');

  const blocks = getLocationsByType('block');
  
  const highRiskCount = blocks.filter(b => b.riskLevel === 'high').length;
  const moderateRiskCount = blocks.filter(b => b.riskLevel === 'moderate').length;
  const favorableCount = blocks.filter(b => b.riskLevel === 'low').length;

  const filteredBlocks = blocks.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'all' || b.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      <div className="bg-card p-6 rounded-2xl border border-[var(--border-theme)] shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h2 className="text-[24px] font-bold text-[var(--text-primary)] uppercase tracking-tight flex items-center gap-2">
            <ShieldCheck size={24} className="text-[#159A9C]" />
            Agricultural Officer Dashboard
          </h2>
          <p className="text-[var(--text-muted)] text-[14px] mt-1">Regional risk monitoring and intervention planning</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-card border border-[var(--border-theme)] px-4 py-2 rounded-xl text-center min-w-[90px]">
            <div className="text-[20px] font-bold text-[#E45757]">{highRiskCount}</div>
            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">High Risk</div>
          </div>
          <div className="bg-card border border-[var(--border-theme)] px-4 py-2 rounded-xl text-center min-w-[90px]">
            <div className="text-[20px] font-bold text-[#F2B84B]">{moderateRiskCount}</div>
            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Moderate</div>
          </div>
          <div className="bg-card border border-[var(--border-theme)] px-4 py-2 rounded-xl text-center min-w-[90px]">
            <div className="text-[20px] font-bold text-[#2E9B63]">{favorableCount}</div>
            <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Favorable</div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-[var(--border-theme)] shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[var(--border-theme)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-[16px] font-bold text-[var(--text-primary)]">Regional Risk Overview</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="Search blocks..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[var(--card-elevated)] border border-[var(--border-theme)] rounded-lg text-[13px] outline-none focus:border-[#159A9C] w-full sm:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <select 
                value={filterRisk}
                onChange={e => setFilterRisk(e.target.value as any)}
                className="pl-9 pr-8 py-2 bg-[var(--card-elevated)] border border-[var(--border-theme)] rounded-lg text-[13px] font-medium outline-none focus:border-[#159A9C] appearance-none"
              >
                <option value="all">All Risks</option>
                <option value="high">High Risk</option>
                <option value="moderate">Moderate Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-[#159A9C] hover:bg-[#128183] text-white rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 transition-colors">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--card-elevated)] text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-theme)]">
                <th className="px-6 py-4">Location (Block)</th>
                <th className="px-6 py-4">Onset Prob.</th>
                <th className="px-6 py-4">Dry Spell</th>
                <th className="px-6 py-4">Heavy Rain</th>
                <th className="px-6 py-4">Overall Risk</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[var(--text-primary)]">
              {filteredBlocks.map(block => (
                <tr key={block.id} className="border-b border-[var(--border-theme)] hover:bg-[var(--card-elevated)] transition-colors group">
                  <td className="px-6 py-4 font-bold">{block.name}</td>
                  
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${block.onsetProbability >= 70 ? 'text-[#2E9B63]' : 'text-[#F2B84B]'}`}>{block.onsetProbability}%</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${block.drySpellProbability > 30 ? 'text-[#F2B84B]' : 'text-[#2E9B63]'}`}>{block.drySpellProbability}%</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${block.heavyRainProbability > 30 ? 'text-[#E45757]' : 'text-[#2E9B63]'}`}>{block.heavyRainProbability}%</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                      block.riskLevel === 'high' ? 'bg-danger/10 text-[#E45757]' :
                      block.riskLevel === 'moderate' ? 'bg-warning/10 text-[#F2B84B]' :
                      'bg-success/10 text-[#2E9B63]'
                    }`}>
                      {block.riskLevel === 'high' && <AlertTriangle size={12} />}
                      {block.riskLevel}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedLocationId(block.id)}
                      className="text-[#159A9C] font-bold flex items-center gap-1 justify-end hover:underline opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                    >
                      View <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredBlocks.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)]">
                    No blocks found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
