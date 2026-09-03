"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface SizeChartModalProps {
  open: boolean;
  onClose: () => void;
}

const PRESET_SIZES = [
  {
    size: "XS",
    label: "Extra Small",
    recommended: "Very petite hands & narrow nail beds",
    measurements: { thumb: "14mm", index: "10mm", middle: "11mm", ring: "10mm", pinky: "8mm" },
  },
  {
    size: "S",
    label: "Small",
    recommended: "Petite to average hands",
    measurements: { thumb: "15mm", index: "11mm", middle: "12mm", ring: "11mm", pinky: "9mm" },
  },
  {
    size: "M",
    label: "Medium",
    badge: "Most Popular",
    recommended: "Universal average fit (Most Popular)",
    measurements: { thumb: "16mm", index: "12mm", middle: "13mm", ring: "12mm", pinky: "10mm" },
  },
  {
    size: "L",
    label: "Large",
    recommended: "Wider natural nail beds",
    measurements: { thumb: "17mm", index: "13mm", middle: "14mm", ring: "13mm", pinky: "11mm" },
  },
];

export default function SizeChartModal({ open, onClose }: SizeChartModalProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(2);
  const [chartSubTab, setChartSubTab] = useState<"standard" | "short-almond">("standard");

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            key="scrim"
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-xs border border-line bg-cream shadow-2xl text-ink"
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-cream/95 px-6 py-4 backdrop-blur-md">
              <div>
                <p className="eyebrow text-xs tracking-widest text-clay font-medium uppercase">
                  Accurate Fit Guide
                </p>
                <h2 id="size-guide-title" className="font-serif text-2xl md:text-3xl mt-0.5 text-ink">
                  How to Find Your Size
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-sm text-taupe transition-colors hover:border-ink hover:text-ink cursor-pointer"
                aria-label="Close size guide"
              >
                ✕
              </button>
            </div>

            {/* 3 Step Navigation Tabs */}
            <div className="grid grid-cols-3 border-b border-line bg-sand/30 text-xs font-medium uppercase tracking-wider text-center">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className={cn(
                  "py-3.5 px-2 transition-all border-b-2 cursor-pointer",
                  activeStep === 1
                    ? "border-ink text-ink bg-cream font-semibold"
                    : "border-transparent text-taupe hover:text-ink"
                )}
              >
                <span className="block text-[10px] text-clay">Step 01</span>
                <span>Measure</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className={cn(
                  "py-3.5 px-2 transition-all border-b-2 cursor-pointer",
                  activeStep === 2
                    ? "border-ink text-ink bg-cream font-semibold"
                    : "border-transparent text-taupe hover:text-ink"
                )}
              >
                <span className="block text-[10px] text-clay">Step 02</span>
                <span>Size Chart</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className={cn(
                  "py-3.5 px-2 transition-all border-b-2 cursor-pointer",
                  activeStep === 3
                    ? "border-ink text-ink bg-cream font-semibold"
                    : "border-transparent text-taupe hover:text-ink"
                )}
              >
                <span className="block text-[10px] text-clay">Step 03</span>
                <span>Shapes &amp; Lengths</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* ── STEP 1: MEASURE ── */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl text-ink">
                      Step 1: How to Measure Your Nails
                    </h3>
                    <p className="text-xs md:text-sm text-taupe leading-relaxed">
                      Hold a piece of paper or flexible measuring tape against your nail bed. Use a pen to mark the widest part of your nail. Then use a ruler to measure the distance between the two dots in millimeters (mm).
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white">
                      <Image
                        src="/sizing/ersa_T_1.png"
                        alt="Hold paper, mark widest part, measure with ruler"
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white">
                      <Image
                        src="/sizing/ersa_T.png"
                        alt="Sidewall to sidewall measurement illustration"
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>
                  </div>

                  <div className="rounded-xs border border-line bg-sand/30 p-4 space-y-2 text-xs">
                    <p className="font-medium text-ink">3-Step Technique:</p>
                    <ol className="list-decimal pl-4 space-y-1 text-taupe leading-relaxed">
                      <li>Wrap paper snugly around the widest section of your natural nail.</li>
                      <li>Mark the left and right sidewall boundaries with a fine-tip pen.</li>
                      <li>Lay the paper flat on a millimeter ruler and record the exact mm.</li>
                    </ol>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="w-full rounded-xs bg-ink py-3 text-xs tracking-widest font-semibold uppercase text-cream hover:bg-clay transition-colors cursor-pointer"
                  >
                    Continue to Step 2: Size Chart →
                  </button>
                </div>
              )}

              {/* ── STEP 2: SIZE CHART ── */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl text-ink">
                        Step 2: Choose The Right Size
                      </h3>
                      <p className="text-xs text-taupe">Measurements in millimeters (mm)</p>
                    </div>

                    {/* Sub-tabs for Standard vs Short Almond */}
                    <div className="flex rounded-xs border border-line/80 bg-sand/40 p-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setChartSubTab("standard")}
                        className={cn(
                          "px-3 py-1 rounded-xs transition-colors cursor-pointer",
                          chartSubTab === "standard"
                            ? "bg-ink text-cream font-medium shadow-xs"
                            : "text-taupe hover:text-ink"
                        )}
                      >
                        Standard Chart
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartSubTab("short-almond")}
                        className={cn(
                          "px-3 py-1 rounded-xs transition-colors cursor-pointer",
                          chartSubTab === "short-almond"
                            ? "bg-ink text-cream font-medium shadow-xs"
                            : "text-taupe hover:text-ink"
                        )}
                      >
                        Short Almond
                      </button>
                    </div>
                  </div>

                  {/* Standard Image Chart */}
                  {chartSubTab === "standard" ? (
                    <div className="space-y-4">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white">
                        <Image
                          src="/sizing/size_choosing_2.webp"
                          alt="Standard Size Chart: XS, S, M, L"
                          fill
                          priority
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 700px"
                        />
                      </div>

                      {/* Quick Interactive Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-line">
                          <thead className="bg-sand/60 text-taupe uppercase text-[10px] tracking-wider">
                            <tr>
                              <th className="p-2.5">Size</th>
                              <th className="p-2.5">Thumb</th>
                              <th className="p-2.5">Index</th>
                              <th className="p-2.5">Middle</th>
                              <th className="p-2.5">Ring</th>
                              <th className="p-2.5">Pinky</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-line">
                            {PRESET_SIZES.map((r) => (
                              <tr key={r.size} className="hover:bg-sand/20">
                                <td className="p-2.5 font-semibold text-ink flex items-center gap-1.5">
                                  {r.size}
                                  {r.badge && (
                                    <span className="text-[9px] bg-clay/20 text-clay px-1.5 py-0.5 rounded-xs">
                                      Popular
                                    </span>
                                  )}
                                </td>
                                <td className="p-2.5">{r.measurements.thumb}</td>
                                <td className="p-2.5">{r.measurements.index}</td>
                                <td className="p-2.5">{r.measurements.middle}</td>
                                <td className="p-2.5">{r.measurements.ring}</td>
                                <td className="p-2.5">{r.measurements.pinky}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white">
                        <Image
                          src="/sizing/short_almond_size_choosing_2.webp"
                          alt="Short Almond Size Chart"
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 700px"
                        />
                      </div>
                    </div>
                  )}

                  {/* Golden Rules Box */}
                  <div className="rounded-xs border border-clay/30 bg-clay/5 p-4 text-xs space-y-1 text-taupe leading-relaxed">
                    <p className="font-semibold text-ink">Important Tips:</p>
                    <p>• Please select the size that fits <strong>MOST</strong> of your fingers.</p>
                    <p>• Consider <strong>SIZING UP</strong> if you are between two sizes or have flatter nail beds.</p>
                    <p>• <strong>Short Almond</strong> tips run slightly smaller; sizing up is recommended.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="w-full rounded-xs bg-ink py-3 text-xs tracking-widest font-semibold uppercase text-cream hover:bg-clay transition-colors cursor-pointer"
                  >
                    Explore Step 3: Shapes &amp; Lengths →
                  </button>
                </div>
              )}

              {/* ── STEP 3: SHAPES & LENGTHS ── */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl text-ink">
                      Step 3: Nail Shapes &amp; Lengths
                    </h3>
                    <p className="text-xs text-taupe">
                      Select your desired silhouette from short natural squovals to dramatic long almonds.
                    </p>
                  </div>

                  {/* Shape Matrix Graphic */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xs border border-line/60 bg-white">
                    <Image
                      src="/sizing/nail_shapes_lengths.jpg"
                      alt="Nail shapes: Long Oval, Long Almond, Medium Almond, Short Almond, Long Coffin, Medium Coffin, Short Coffin, Short Squoval"
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>

                  {/* Real Hand Photo Guide */}
                  <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full overflow-hidden rounded-xs border border-line/60 bg-white">
                    <Image
                      src="/sizing/Ersa_shape_Guide2.jpg"
                      alt="Shape guide worn on hands"
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Link to Full Page */}
            <div className="border-t border-line bg-sand/20 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <Link
                href="/sizing"
                onClick={onClose}
                className="text-clay hover:underline font-medium"
              >
                View Complete Dedicated Sizing Page →
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xs bg-ink px-6 py-2.5 text-cream font-medium tracking-wider uppercase hover:bg-clay transition-colors cursor-pointer"
              >
                Got It, Thanks!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
