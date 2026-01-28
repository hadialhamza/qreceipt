"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlobProvider } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { Loader2, Download } from "lucide-react";
import Image from "next/image";
import { ReceiptPDF } from "@/components/receiptPDF/ReceiptPDF";

export default function PublicViewPage() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await fetch(`/api/receipts/${params.id}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);

          // Generate QR for PDF
          const qrDataUrl = await QRCode.toDataURL(
            `${window.location.origin}/view/${params.id}`,
            {
              width: 100,
              margin: 1,
            },
          );
          setQrCodeUrl(qrDataUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchReceipt();
  }, [params.id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  if (error || !data)
    return (
      <div className="h-screen flex items-center justify-center text-red-600 font-bold">
        Invalid Receipt ID
      </div>
    );

  return (
    <div className="bg-[#f1f1f1] py-10 flex justify-center print:bg-white min-h-screen">
      {/* A4 Paper */}
      <div
        className="bg-white text-black shadow-xl print:shadow-none relative"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm 18mm",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Header Logo */}
        <div className="text-center">
          <img src="/global-logo.png" alt="Logo" style={{ width: "100%" }} />
        </div>

        {/* Address */}
        <div
          className="text-center mt-2"
          style={{ fontSize: "12px", lineHeight: "1.4" }}
        >
          Head Office: Al-Razi Complex (12th Floor), 166-167, Shaheed Syed
          Nazrul Islam Sarani, Purana Paltan, Dhaka- 1000. Tel: PABX:
          55111601-3, 9570147, 9570450 Fax: 88-02-9556103, email:
          globalho2000@gmail.com web: www.globalinsurancebd.com
        </div>

        {/* BIN + Download */}
        <div className="flex justify-between mt-6" style={{ fontSize: "13px" }}>
          <span>BIN : 002085888-0208</span>
          <span className="text-blue-600 underline cursor-pointer">
            {/* Placeholder for future links if needed */}
          </span>
        </div>

        {/* Title */}
        <div className="text-center mt-6">
          <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
            MONEY RECEIPT
          </h2>
          <p style={{ fontSize: "12px" }}>MUSHAK : 6.3</p>
        </div>

        {/* QR Code (Absolute Position) */}
        <div className="absolute top-40 right-10 w-16 h-16">
          {qrCodeUrl && (
            <img src={qrCodeUrl} alt="QR" className="w-full h-full" />
          )}
        </div>

        {/* Top Info */}
        <div className="flex justify-between mt-8" style={{ fontSize: "13px" }}>
          <div>
            <div>Issuing Office : Rangpur Branch</div>
            <div>Money Receipt No. : {data.receiptNo}</div>
            <div>Class of Insurance : Fire</div>
          </div>
          <div>
            Date : {new Date(data.date).toLocaleDateString("en-GB")}
          </div>
        </div>

        {/* Body Lines */}
        <div className="mt-10 space-y-4" style={{ fontSize: "13px" }}>
          <div className="flex">
            <span style={{ width: "210px" }} className="font-semibold">
              Received with thanks from
            </span>
            <span className="flex-1 border-b border-black pb-1">
              {data.clientName}
            </span>
          </div>

          <div className="flex">
            <span style={{ width: "90px" }}>The sum of</span>
            <span className="flex-1 border-b border-black pb-1">
              Tk. {data.amount}
            </span>
          </div>

          <div className="flex items-end">
            <span style={{ width: "150px" }}>Mode of Payment</span>
            <span className="w-[240px] border-b border-black pb-1">
              {data.paymentMode} {data.chequeNo ? `; ${data.chequeNo}` : ""}
            </span>
            <span className="ml-8 mr-2">Dated</span>
            <span className="flex-1 border-b border-black pb-1">
              {new Date(data.date).toLocaleDateString("en-GB")}
            </span>
          </div>

          <div className="flex">
            <span style={{ width: "90px" }}>Drawn on</span>
            <span className="flex-1 border-b border-black pb-1">
              {data.bankName || "Mercantile Bank PLC"}
            </span>
          </div>

          <div className="flex">
            <span style={{ width: "100px" }}>Issued against</span>
            <span className="flex-1 border-b border-black pb-1">
              {data.policyNo || "GIL/RNP/FC-00194/12/2025"}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="mt-10" style={{ width: "320px", fontSize: "13px" }}>
          <table className="w-full border border-black border-collapse">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1">Premium</td>
                <td className="border border-black px-2 text-center">BDT</td>
                <td className="border border-black px-2 text-right">
                  {(data.amount * 0.87).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1">Vat</td>
                <td className="border border-black text-center">BDT</td>
                <td className="border border-black text-right px-2">
                  {(data.amount * 0.13).toFixed(2)}
                </td>
              </tr>
              <tr style={{ background: "#e5e5e5" }}>
                <td className="border border-black px-2 py-1">Total</td>
                <td className="border border-black text-center">BDT</td>
                <td className="border border-black text-right px-2">
                  {data.amount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          className="text-center mt-16"
          style={{ fontSize: "12px", color: "gray" }}
        >
          This RECEIPT is computer generated, authorized signature is not
          required.
        </div>

        <div
          className="text-center mt-2 py-1"
          style={{ background: "#e0e0e0", fontSize: "13px" }}
        >
          Receipt valid subject to encashment of cheque/P.O./D.D.
        </div>

        <div className="mt-2 text-red-600" style={{ fontSize: "12px" }}>
          * Note: If have any complain about Insurance, call 16130.
        </div>
      </div>

      {/* Download Button */}
      <div className="fixed bottom-8 right-8 print:hidden z-50">
        <BlobProvider document={<ReceiptPDF data={data} qrCodeUrl={qrCodeUrl} />}>
          {({ url, loading }) => {
            if (loading) {
              return (
                <button
                  disabled
                  className="flex items-center gap-2 bg-blue-400 text-white px-6 py-3 rounded-full shadow-lg font-bold transition-all cursor-wait"
                >
                  Preparing PDF...
                </button>
              );
            }
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-bold transition-all"
              >
                <Download size={20} /> View & Print Official PDF
              </a>
            );
          }}
        </BlobProvider>
      </div>
    </div>
  );
}
