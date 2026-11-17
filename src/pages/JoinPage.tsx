import React, { useState } from 'react';
import { Check, Copy, ExternalLink, MessageSquare } from 'lucide-react';
import { JOIN_STEPS, OFFICIAL_LINKS, SITE_ASSETS } from '../data/satoruData';
import {
  buildJoinMessage,
  validateJoinForm,
  type JoinFormInput,
} from '../utils/satoruLogic';
import { HeroBanner } from '../components/HeroBanner';

export function JoinPage() {
  const [form, setForm] = useState<JoinFormInput>({
    tiktokUsername: '',
    tiktokUrl: '',
    whatsappNumber: '',
    software: 'Alight Motion',
    editingStyle: 'Jedag-Jedug',
    timeline: '',
    followedOfficial: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof JoinFormInput, string>>>({});
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateJoinForm(form);
    if (!result.valid) {
      setErrors(result.errors);
      setGeneratedMessage(null);
      return;
    }
    setErrors({});
    setGeneratedMessage(buildJoinMessage(form));
  };

  const handleCopyMessage = async () => {
    if (!generatedMessage) return;
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <div>
      <HeroBanner
        title="Join Satoru Now!"
        subtitle="Seleksi Open Member Resmi Satoru Community"
        backgroundImage={SITE_ASSETS.heroWave}
      />

      {/* How Can I Join To Satoru */}
      <section className="bg-white border-b border-[#E5E3DD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#141318]">
              How Can I Join To Satoru?
            </h2>
            <p className="mt-4 text-base text-[#27252E]">
              Gampang! Kamu bisa ikut open member Satoru yang biasanya diadakan di WhatsApp melalui Grup.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {JOIN_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD]"
              >
                <span className="font-mono text-xs font-semibold text-[#4C00B0]">
                  Langkah 0{item.step}
                </span>
                <h3 className="mt-1 text-base font-bold text-[#141318]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#43404B] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Exact Requirements Note + Official Action Buttons */}
          <div className="mt-8 p-6 rounded-xl bg-[#F8F7F4] border border-[#E5E3DD] text-center">
            <p className="text-sm text-[#27252E] leading-relaxed italic">
              Syarat dan cara seleksi Satoru: Chat salah satu admin yang bersedia (open) entry, salam, kirim editan kamu (All Style), kirim timeline / waktu pengerjaan editan kamu (All Software), kasih nama akun TikTok + link akun TikTok + nomor WhatsApp kamu lewat admin yang kamu chat. Kamu hanya boleh menghubungi 1 admin! Jika adminnya tidak membalas selama 1,5 jam, kamu bisa chat admin lain.
            </p>
            <p className="mt-4 text-sm font-bold text-[#141318]">
              Kamu Harus Follow Akun TikTok Satoru Terlebih Dahulu!
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto">
              <a
                href={OFFICIAL_LINKS.tiktokOfficial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-md bg-[#8E7A55] hover:bg-[#7A6847] text-white transition-colors"
              >
                <span>Satoru Community Official TikTok Account</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>

              <a
                href={OFFICIAL_LINKS.whatsappSelectionGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-md bg-[#8E7A55] hover:bg-[#7A6847] text-white transition-colors"
              >
                <span>Satoru Community Selection Whatsapp Group</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Registration Message Formatter */}
      <section className="bg-[#F8F7F4] border-b border-[#E5E3DD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141318]">
              Siapkan Format Pesan Seleksi Admin
            </h2>
            <p className="mt-2 text-sm text-[#5E5B66]">
              Lengkapi data pendaftaran sesuai syarat Satoru agar siap disalin saat chat admin seleksi di WhatsApp.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8 rounded-xl bg-white border border-[#E5E3DD] space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tiktok-username" className="block text-xs font-semibold text-[#141318] mb-1.5">
                  Nama Akun TikTok
                </label>
                <input
                  id="tiktok-username"
                  type="text"
                  value={form.tiktokUsername}
                  onChange={(e) => setForm({ ...form, tiktokUsername: e.target.value })}
                  placeholder="@usernamekamu"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-[#F8F7F4] border border-[#D8D4CC] rounded-lg text-[#141318] focus:outline-none focus:border-[#4C00B0]"
                />
                {errors.tiktokUsername && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.tiktokUsername}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="whatsapp-number" className="block text-xs font-semibold text-[#141318] mb-1.5">
                  Nomor WhatsApp
                </label>
                <input
                  id="whatsapp-number"
                  type="tel"
                  value={form.whatsappNumber}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  placeholder="081234567890"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-[#F8F7F4] border border-[#D8D4CC] rounded-lg text-[#141318] focus:outline-none focus:border-[#4C00B0]"
                />
                {errors.whatsappNumber && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="tiktok-url" className="block text-xs font-semibold text-[#141318] mb-1.5">
                Link Akun TikTok
              </label>
              <input
                id="tiktok-url"
                type="url"
                value={form.tiktokUrl}
                onChange={(e) => setForm({ ...form, tiktokUrl: e.target.value })}
                placeholder="https://www.tiktok.com/@usernamekamu"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-[#F8F7F4] border border-[#D8D4CC] rounded-lg text-[#141318] focus:outline-none focus:border-[#4C00B0]"
              />
              {errors.tiktokUrl && (
                <p className="mt-1 text-xs text-red-700" role="alert">
                  {errors.tiktokUrl}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="software-select" className="block text-xs font-semibold text-[#141318] mb-1.5">
                  Software Editing
                </label>
                <select
                  id="software-select"
                  value={form.software}
                  onChange={(e) => setForm({ ...form, software: e.target.value })}
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-[#F8F7F4] border border-[#D8D4CC] rounded-lg text-[#141318] focus:outline-none focus:border-[#4C00B0]"
                >
                  <option value="Alight Motion">Alight Motion</option>
                  <option value="After Effects">After Effects</option>
                  <option value="CapCut">CapCut</option>
                  <option value="Blurr">Blurr</option>
                  <option value="Software Lainnya">Software Lainnya</option>
                </select>
                {errors.software && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.software}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="editing-style" className="block text-xs font-semibold text-[#141318] mb-1.5">
                  Style Editing
                </label>
                <input
                  id="editing-style"
                  type="text"
                  value={form.editingStyle}
                  onChange={(e) => setForm({ ...form, editingStyle: e.target.value })}
                  placeholder="Jedag-Jedug / Mograph / 3D"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-[#F8F7F4] border border-[#D8D4CC] rounded-lg text-[#141318] focus:outline-none focus:border-[#4C00B0]"
                />
              </div>

              <div>
                <label htmlFor="editing-timeline" className="block text-xs font-semibold text-[#141318] mb-1.5">
                  Timeline Pengerjaan
                </label>
                <input
                  id="editing-timeline"
                  type="text"
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  placeholder="Contoh: 2 Jam 30 Menit"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-[#F8F7F4] border border-[#D8D4CC] rounded-lg text-[#141318] focus:outline-none focus:border-[#4C00B0]"
                />
                {errors.timeline && (
                  <p className="mt-1 text-xs text-red-700" role="alert">
                    {errors.timeline}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm text-[#27252E] cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={form.followedOfficial}
                  onChange={(e) => setForm({ ...form, followedOfficial: e.target.checked })}
                  className="mt-0.5 w-5 h-5 accent-[#4C00B0] shrink-0"
                />
                <span>
                  Saya sudah follow akun TikTok resmi <strong>@SatoruClanOfc</strong> dan siap mengirim video editan + bukti timeline pengerjaan ke 1 admin seleksi.
                </span>
              </label>
              {errors.followedOfficial && (
                <p className="mt-1.5 text-xs text-red-700" role="alert">
                  {errors.followedOfficial}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-md bg-[#4C00B0] hover:bg-[#5E12C4] text-white transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buat Format Pesan Pendaftaran</span>
            </button>
          </form>

          {generatedMessage && (
            <div
              className="mt-6 p-6 rounded-xl bg-white border border-[#4C00B0]/40"
              aria-live="polite"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="text-sm font-bold text-[#141318]">
                  Format Pesan Siap Kirim ke Admin
                </h3>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#141318] text-white hover:bg-[#2E2B36] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Pesan</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-xs text-[#27252E] bg-[#F8F7F4] p-4 rounded-lg border border-[#E5E3DD]">
                {generatedMessage}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* GOODLUCK! Closing */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-display italic font-extrabold text-4xl sm:text-5xl tracking-tight text-[#141318]">
            GOODLUCK!
          </p>
        </div>
      </section>
    </div>
  );
}
