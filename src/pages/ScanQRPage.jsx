// src/pages/ScanQRPage.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Camera, X } from 'lucide-react';
import Card from '../components/atoms/Card.jsx';
import { Html5Qrcode } from 'html5-qrcode';

export default function ScanQRPage({ onBack, onScanSuccess }) {
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    // Inisialisasi scanner
    const scannerId = "qr-reader";
    html5QrCodeRef.current = new Html5Qrcode(scannerId);

    const startScanning = async () => {
      try {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" }, // pake kamera belakang
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText, decodedResult) => {
            // Berhasil scan
            if (decodedText && isScanning) {
              setIsScanning(false);
              html5QrCodeRef.current.stop();
              onScanSuccess({ type: 'qr', data: decodedText });
            }
          },
          (errorMessage) => {
            // Error scan (abaikan, ini cuma log)
            // console.log(errorMessage);
          }
        );
      } catch (err) {
        setError('Gagal mengakses kamera. Pastikan izin kamera diberikan.');
        console.error(err);
      }
    };

    startScanning();

    // Cleanup
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        html5QrCodeRef.current.stop();
      }
    };
  }, []);

  return (
    <motion.section
      className="px-4 py-6 sm:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="mx-auto max-w-md space-y-6">
        <Card className="rounded-3xl p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
                  html5QrCodeRef.current.stop();
                }
                onBack();
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-dana-blue hover:text-dana-dark transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Scan QR</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Scan Code</h1>
              <p className="mt-2 text-sm text-gray-600">Arahkan kamera ke QR code</p>
            </div>
          </div>

          {/* QR Scanner Container */}
          <div className="relative mb-6 overflow-hidden rounded-2xl bg-black">
            <div id="qr-reader" style={{ width: '100%' }} />
            
            {/* Overlay bingkai */}
            <div className="absolute inset-0 border-2 border-dana-blue/50 rounded-2xl pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 border-2 border-dana-blue rounded-xl pointer-events-none" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-700 flex items-center gap-2">
                <X className="h-4 w-4" />
                {error}
              </p>
            </div>
          )}

          {/* Info */}
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
            <p className="text-xs text-amber-900">
              📷 Pastikan ruangan cukup terang dan QR code tidak buram.
            </p>
            <p className="text-xs text-amber-800 mt-2">
              💡 Tips: Gunakan kamera belakang untuk hasil terbaik.
            </p>
          </div>
        </Card>
      </div>
    </motion.section>
  );
}