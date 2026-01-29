"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

interface AnalysisResult {
  success: boolean;
  analysis?: {
    platforms?: Record<string, any>;
    exclusivity?: Record<string, any>;
    license_terms?: Record<string, any>;
    duration?: Record<string, any>;
    eligibility?: {
      is_eligible: boolean;
      score: number;
      factors: string[];
    };
    text_preview?: string;
    total_characters?: number;
  };
  error?: string;
  file_info?: {
    filename: string;
    size: number;
  };
  message?: string;
}

const licenses = [
  {
    id: "LIC-1024",
    content: "Movie Trailer A",
    territory: "Global",
    exclusivity: "Exclusive",
    status: "active",
    expires: "2025-06-30",
  },
  {
    id: "LIC-1025",
    content: "Web Series Episode 3",
    territory: "India",
    exclusivity: "Non-Exclusive",
    status: "expired",
    expires: "2024-12-01",
  },
  {
    id: "LIC-1026",
    content: "Music Track X",
    territory: "US, EU",
    exclusivity: "Exclusive",
    status: "violation",
    expires: "2025-01-15",
  },
];

const statusStyles: Record<string, string> = {
  active: "text-emerald-400 bg-emerald-400/10",
  expired: "text-amber-400 bg-amber-400/10",
  violation: "text-red-400 bg-red-400/10",
};

export default function LicensesPage() {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validExtensions = ['pdf', 'docx', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(fileExtension || '')) {
      alert('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    setIsLoading(true);
    setUploadedFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/contracts/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);

      if (data.success) {
        console.log('Contract analyzed successfully:', data);
      } else {
        console.error('Analysis failed:', data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setAnalysisResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to upload and analyze contract',
      });
    } finally {
      setIsLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("licenses")}
          </h1>
          <p className="mt-2 text-foreground/70 max-w-xl">
            {t("licensesDescription")}
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <button
            onClick={handleUploadClick}
            disabled={isLoading}
            className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition disabled:bg-emerald-500/50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Analyzing..." : t("uploadLicense")}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            disabled={isLoading}
            className="hidden"
          />
        </div>
      </div>

      {/* Analysis Results Section */}
      {analysisResult && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              📋 Contract Analysis Results
            </h2>
            {uploadedFileName && (
              <p className="text-sm text-foreground/70 mb-4">
                File: <span className="text-emerald-400">{uploadedFileName}</span>
              </p>
            )}
          </div>

          {analysisResult.success && analysisResult.analysis ? (
            <div className="space-y-6">
              {/* Eligibility Status */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold mb-3">Eligibility Status</h3>
                <div className="flex items-center gap-4">
                  <div
                    className={`text-2xl font-bold ${
                      analysisResult.analysis.eligibility?.is_eligible
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {analysisResult.analysis.eligibility?.is_eligible
                      ? "✓ ELIGIBLE"
                      : "✗ NOT ELIGIBLE"}
                  </div>
                  <div className="text-foreground/70">
                    Score: <span className="text-white font-semibold">{analysisResult.analysis.eligibility?.score}</span>
                  </div>
                </div>
                {analysisResult.analysis.eligibility?.factors && (
                  <div className="mt-4 space-y-2">
                    {analysisResult.analysis.eligibility.factors.map((factor, idx) => (
                      <p key={idx} className="text-sm text-foreground/70">
                        {factor}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Platforms */}
              {analysisResult.analysis.platforms &&
                Object.keys(analysisResult.analysis.platforms).length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-lg font-semibold mb-3">📱 Platforms</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        analysisResult.analysis.platforms as Record<string, any>
                      ).map(([key, values]: [string, any]) => (
                        <div key={key}>
                          <p className="text-sm font-medium text-emerald-400 capitalize">
                            {key.replace(/_/g, " ")}:
                          </p>
                          <p className="text-sm text-foreground/70">
                            {Array.isArray(values)
                              ? values.join(", ")
                              : JSON.stringify(values)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Exclusivity Terms */}
              {analysisResult.analysis.exclusivity &&
                Object.keys(analysisResult.analysis.exclusivity).length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-lg font-semibold mb-3">🔒 Exclusivity</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        analysisResult.analysis.exclusivity as Record<string, any>
                      ).map(([key, values]: [string, any]) => (
                        <div key={key}>
                          <p className="text-sm font-medium text-emerald-400 capitalize">
                            {key.replace(/_/g, " ")}:
                          </p>
                          <p className="text-sm text-foreground/70">
                            {Array.isArray(values)
                              ? values.join(", ")
                              : JSON.stringify(values)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* License Terms */}
              {analysisResult.analysis.license_terms &&
                Object.keys(analysisResult.analysis.license_terms).length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-lg font-semibold mb-3">📅 License Terms</h3>
                    <div className="space-y-2">
                      {Object.entries(
                        analysisResult.analysis.license_terms as Record<string, any>
                      ).map(([key, values]: [string, any]) => (
                        <div key={key}>
                          <p className="text-sm font-medium text-emerald-400 capitalize">
                            {key.replace(/_/g, " ")}:
                          </p>
                          <p className="text-sm text-foreground/70">
                            {Array.isArray(values)
                              ? values.join(", ")
                              : JSON.stringify(values)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Duration Details */}
              {analysisResult.analysis.duration && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold mb-3">⏱️ Duration Details</h3>
                  <div className="space-y-2">
                    {analysisResult.analysis.duration.dates_found &&
                      analysisResult.analysis.duration.dates_found.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-emerald-400">
                            Dates Found:
                          </p>
                          <p className="text-sm text-foreground/70">
                            {analysisResult.analysis.duration.dates_found.join(", ")}
                          </p>
                        </div>
                      )}
                    {analysisResult.analysis.duration.durations_found &&
                      analysisResult.analysis.duration.durations_found.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-emerald-400">
                            Durations Found:
                          </p>
                          <p className="text-sm text-foreground/70">
                            {analysisResult.analysis.duration.durations_found
                              .map((d: any[]) => `${d[0]} ${d[1]}(s)`)
                              .join(", ")}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Text Preview */}
              {analysisResult.analysis.text_preview && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold mb-3">📄 Preview</h3>
                  <p className="text-sm text-foreground/70 line-clamp-4">
                    {analysisResult.analysis.text_preview}
                  </p>
                  <p className="text-xs text-foreground/50 mt-2">
                    Total characters: {analysisResult.analysis.total_characters}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-red-400 font-medium">
                {analysisResult.error || "Analysis failed"}
              </p>
              <p className="text-sm text-foreground/70 mt-2">
                {analysisResult.message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Licenses Table */}
      <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-foreground/70">
            <tr>
              <th className="px-6 py-4 text-left">{t("contractId")}</th>
              <th className="px-6 py-4 text-left">{t("content")}</th>
              <th className="px-6 py-4 text-left">{t("territory")}</th>
              <th className="px-6 py-4 text-left">{t("exclusivity")}</th>
              <th className="px-6 py-4 text-left">{t("status")}</th>
              <th className="px-6 py-4 text-left">{t("expires")}</th>
              <th className="px-6 py-4 text-left">{t("action")}</th>
            </tr>
          </thead>

          <tbody>
            {licenses.map((lic) => (
              <tr
                key={lic.id}
                className="border-t border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4">{lic.id}</td>
                <td className="px-6 py-4">{lic.content}</td>
                <td className="px-6 py-4">{lic.territory}</td>
                <td className="px-6 py-4">
                  {t(lic.exclusivity.toLowerCase())}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[lic.status]}`}
                  >
                    {t(lic.status)}
                  </span>
                </td>
                <td className="px-6 py-4">{lic.expires}</td>
                <td className="px-6 py-4">
                  <button className="text-emerald-400 hover:text-emerald-300 transition text-xs font-medium">
                    {t("view")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
