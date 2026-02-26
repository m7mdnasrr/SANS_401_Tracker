import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Circle,
  BookOpen,
  FlaskConical,
  ListTodo,
  Download,
  Upload,
  Star,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

// Pre-loaded curriculum based on the 9-week SANS 401 study plan
const INITIAL_CURRICULUM = [
  {
    week: 1,
    title: 'Network Security & Cloud Essentials',
    days: [
      {
        day: 1,
        topic: 'OSI & TCP/IP Models',
        thm: 'OSI Model, Intro to LAN',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Addressing & Subnetting',
        thm: 'Intro to Networking',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Core Protocols (TCP/UDP/ICMP)',
        thm: 'Network Services',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'App Protocols (DNS/HTTP)',
        thm: 'DNS & HTTP in Detail',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'CLI Packet Analysis (tcpdump)',
        thm: 'Linux Fundamentals 1',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'Visual Analysis (Wireshark)',
        thm: 'Wireshark: The Basics',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Indexing & Review',
        thm: 'None (Review & Index)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 2,
    title: 'Defense-in-Depth & IAM',
    days: [
      {
        day: 1,
        topic: 'Security Frameworks (CIS/NIST)',
        thm: 'Principles of Security',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Access Control Models (DAC/MAC/RBAC)',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Identity & Authentication (MFA)',
        thm: 'Identity and Access Management',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Data Security & DLP',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'Mobile & Wireless Security',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'Adversary Tactics (Kill Chain/ATT&CK)',
        thm: 'Mitre ATT&CK',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Indexing & Review',
        thm: 'None (Review & Index)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 3,
    title: 'Vulnerability Management & Response',
    days: [
      {
        day: 1,
        topic: 'Vulnerability Scanning & CVSS',
        thm: 'Nessus',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Web App Security (OWASP)',
        thm: 'OWASP Top 10, Web Fundamentals',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Malware & Endpoint Threats',
        thm: 'Intro to Malware Analysis',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Log Management & SIEM',
        thm: 'Splunk: Basics',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'Incident Response (PICERL)',
        thm: 'Incident Response and Forensics',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'Digital Forensics Basics',
        thm: 'Autopsy',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Indexing & Review',
        thm: 'None (Review & Index)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 4,
    title: 'Data Security Technologies (Cryptography)',
    days: [
      {
        day: 1,
        topic: 'Symmetric vs. Asymmetric Crypto',
        thm: 'Cryptography for Beginners',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Hashing & Digital Signatures',
        thm: 'Hashing - Crypto 101',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Public Key Infrastructure (PKI)',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Network Security Devices (Firewalls)',
        thm: 'Network Security Solutions',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'IDS/IPS (Signature vs Anomaly)',
        thm: 'Snort / Zeek',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'Endpoint Security (EDR vs AV)',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Indexing & Review',
        thm: 'None (Review & Index)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 5,
    title: 'Windows & Azure Security',
    days: [
      {
        day: 1,
        topic: 'Windows Architecture & Permissions',
        thm: 'Windows Fundamentals 1, 2, 3',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Active Directory (AD) & GPOs',
        thm: 'Active Directory Basics',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Windows Auth (NTLM vs Kerberos)',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Windows Event Logging',
        thm: 'Windows Event Logs',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'Core Windows Processes',
        thm: 'Core Windows Processes',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'Azure Cloud Basics',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Indexing & Review',
        thm: 'None (Review & Index)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 6,
    title: 'Linux, Containers, & macOS',
    days: [
      {
        day: 1,
        topic: 'Linux CLI & User Management',
        thm: 'Linux Fundamentals Part 2',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Linux File Permissions (chmod)',
        thm: 'Linux Fundamentals Part 3',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Linux Hardening & Services',
        thm: 'Linux Server Hardening',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Container Security (Docker)',
        thm: 'Intro to Docker',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'AWS Cloud Fundamentals',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'macOS Security Basics',
        thm: 'N/A (Theory focus)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Indexing & Review',
        thm: 'None (Review & Index)',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 7,
    title: 'The Master Index & Test 1',
    days: [
      {
        day: 1,
        topic: 'Finalize Master Index Structure',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Alphabetize and Format Index',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Light Review of Books 1-3',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Light Review of Books 4-6',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'Take SANS Practice Test 1',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'Analyze Practice Test 1 Results',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Rest & Recover',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 8,
    title: 'Targeted Remediation (Review Weaknesses)',
    days: [
      {
        day: 1,
        topic: 'Remediate Weakest Domain (From Test 1)',
        thm: 'Re-do relevant labs',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Remediate 2nd Weakest Domain',
        thm: 'Re-do relevant labs',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Update Index based on Test 1 gaps',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Review SANS Cheat Sheets (CLI/Ports)',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'Take SANS Practice Test 2',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'Analyze Practice Test 2 Results',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Final Index Additions',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
  {
    week: 9,
    title: 'Exam Week (The Final Polish)',
    days: [
      {
        day: 1,
        topic: 'Print and Bind Master Index',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 2,
        topic: 'Print SANS Cheat Sheets',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 3,
        topic: 'Tab SANS Books (Red/Blue/Yellow)',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 4,
        topic: 'Mental Walkthrough of IR / Core Concepts',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 5,
        topic: 'Rest and Hydrate',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 6,
        topic: 'GSEC EXAM DAY!',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
      {
        day: 7,
        topic: 'Celebrate Certification',
        thm: 'N/A',
        read: false,
        lab: false,
        index: false,
        mastery: 0,
      },
    ],
  },
];

export default function App() {
  // 1. Initialize state by checking localStorage first
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('sans401-progress');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (err) {
        return INITIAL_CURRICULUM;
      }
    }
    return INITIAL_CURRICULUM;
  });

  const [expandedWeek, setExpandedWeek] = useState(1);
  const fileInputRef = useRef(null);

  // 2. Auto-save to localStorage whenever 'data' changes
  useEffect(() => {
    localStorage.setItem('sans401-progress', JSON.stringify(data));
  }, [data]);

  // Calculate Overall Progress
  const calculateProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;

    data.forEach((week) => {
      week.days.forEach((day) => {
        totalTasks += 3; // read, lab, index
        if (day.read) completedTasks++;
        if (day.lab) completedTasks++;
        if (day.index) completedTasks++;
      });
    });

    return Math.round((completedTasks / totalTasks) * 100);
  };

  // Toggle a specific task for a day
  const toggleTask = (weekIndex, dayIndex, taskType) => {
    const newData = [...data];
    newData[weekIndex].days[dayIndex][taskType] =
      !newData[weekIndex].days[dayIndex][taskType];
    setData(newData);
  };

  // Set mastery score (1-5)
  const setMastery = (weekIndex, dayIndex, score) => {
    const newData = [...data];
    newData[weekIndex].days[dayIndex].mastery = score;
    setData(newData);
  };

  // Export Data to JSON (Still useful as a permanent backup!)
  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `SANS401_Evolution_Tracker_${
      new Date().toISOString().split('T')[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import Data from JSON
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData) && importedData[0].week) {
          setData(importedData);
          alert('Progress loaded successfully!');
        } else {
          alert('Invalid file format.');
        }
      } catch (err) {
        alert('Error reading file.');
      }
    };
    reader.readAsText(file);
  };

  // Reset Progress function
  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all progress? This will clear your browser save.'
      )
    ) {
      setData(INITIAL_CURRICULUM);
      localStorage.removeItem('sans401-progress');
    }
  };

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header & Dashboard */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                SANS 401 Smart Evolution
              </h1>
              <p className="text-slate-500 mt-1">
                Track your GSEC journey, from Book 1 to Certification Day.
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                title="Reset All Progress"
              >
                <RotateCcw size={16} /> Reset
              </button>
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
              >
                <Upload size={16} /> Load Backup
              </button>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleImport}
                className="hidden"
              />
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Download size={16} /> Save Backup
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Overall Completion
              </span>
              <span className="text-2xl font-bold text-blue-600">
                {progress}%
              </span>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-indigo-500" /> SANS Book Reading
          </div>
          <div className="flex items-center gap-1.5">
            <FlaskConical size={14} className="text-emerald-500" /> THM Lab
            Practice
          </div>
          <div className="flex items-center gap-1.5">
            <ListTodo size={14} className="text-amber-500" /> Add to Master
            Index
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <AlertCircle size={14} className="text-red-500" /> Low Mastery
            (Focus on Week 8)
          </div>
        </div>

        {/* Curriculum List */}
        <div className="space-y-4">
          {data.map((weekData, wIndex) => (
            <div
              key={wIndex}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
            >
              {/* Week Header (Collapsible) */}
              <button
                onClick={() =>
                  setExpandedWeek(
                    expandedWeek === weekData.week ? null : weekData.week
                  )
                }
                className={`w-full flex items-center justify-between p-5 text-left transition-colors ${
                  expandedWeek === weekData.week
                    ? 'bg-slate-50 border-b border-slate-200'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Week {weekData.week}: {weekData.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">7 Days of Study</p>
                </div>
                <div className="text-slate-400 bg-white p-2 rounded-full border border-slate-200 shadow-sm">
                  {expandedWeek === weekData.week ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </button>

              {/* Days List */}
              {expandedWeek === weekData.week && (
                <div className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 font-semibold">
                            Day / Topic
                          </th>
                          <th className="px-6 py-3 font-semibold">THM Lab</th>
                          <th className="px-6 py-3 font-semibold text-center">
                            Tasks
                          </th>
                          <th className="px-6 py-3 font-semibold text-center">
                            Mastery Level
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {weekData.days.map((day, dIndex) => {
                          const needsReview =
                            day.mastery === 1 || day.mastery === 2;

                          return (
                            <tr
                              key={dIndex}
                              className={`hover:bg-slate-50/50 transition-colors ${
                                needsReview ? 'bg-red-50/30' : ''
                              }`}
                            >
                              <td className="px-6 py-4">
                                <div className="font-medium text-slate-900 flex items-center gap-2">
                                  <span className="text-slate-400 font-mono text-xs">
                                    D{day.day}
                                  </span>
                                  {day.topic}
                                  {needsReview && (
                                    <AlertCircle
                                      size={14}
                                      className="text-red-500"
                                      title="Review needed"
                                    />
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-600">
                                {day.thm}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-4">
                                  <button
                                    onClick={() =>
                                      toggleTask(wIndex, dIndex, 'read')
                                    }
                                    className="group flex flex-col items-center gap-1 outline-none"
                                    title="SANS Book Reading"
                                  >
                                    {day.read ? (
                                      <CheckCircle2
                                        className="text-indigo-500"
                                        size={20}
                                      />
                                    ) : (
                                      <Circle
                                        className="text-slate-300 group-hover:text-indigo-300 transition-colors"
                                        size={20}
                                      />
                                    )}
                                  </button>
                                  <button
                                    onClick={() =>
                                      toggleTask(wIndex, dIndex, 'lab')
                                    }
                                    className="group flex flex-col items-center gap-1 outline-none"
                                    title="TryHackMe Lab"
                                  >
                                    {day.lab ? (
                                      <CheckCircle2
                                        className="text-emerald-500"
                                        size={20}
                                      />
                                    ) : (
                                      <Circle
                                        className="text-slate-300 group-hover:text-emerald-300 transition-colors"
                                        size={20}
                                      />
                                    )}
                                  </button>
                                  <button
                                    onClick={() =>
                                      toggleTask(wIndex, dIndex, 'index')
                                    }
                                    className="group flex flex-col items-center gap-1 outline-none"
                                    title="Update Index"
                                  >
                                    {day.index ? (
                                      <CheckCircle2
                                        className="text-amber-500"
                                        size={20}
                                      />
                                    ) : (
                                      <Circle
                                        className="text-slate-300 group-hover:text-amber-300 transition-colors"
                                        size={20}
                                      />
                                    )}
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() =>
                                        setMastery(wIndex, dIndex, star)
                                      }
                                      className="outline-none focus:scale-110 transition-transform"
                                      title={
                                        star === 1
                                          ? 'Novice (Need serious review)'
                                          : star === 5
                                          ? 'Expert (GSEC Ready)'
                                          : `Level ${star}`
                                      }
                                    >
                                      <Star
                                        size={18}
                                        className={`${
                                          day.mastery >= star
                                            ? day.mastery <= 2
                                              ? 'text-red-400 fill-red-400'
                                              : 'text-yellow-400 fill-yellow-400'
                                            : 'text-slate-200'
                                        } transition-colors`}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
