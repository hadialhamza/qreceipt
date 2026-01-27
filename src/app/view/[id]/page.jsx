"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Loader2, CheckCircle2, AlertCircle, Download } from "lucide-react";
import { ReceiptPDF } from "@/components/receiptPDF/ReceiptPDF";
import Logo from "@/components/logo/Logo";

export default function PublicViewPage() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await fetch(`/api/receipts/${params.id}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);
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

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-muted-foreground font-medium">
          Verifying Document...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-destructive/10 p-6 text-center">
        <div className="bg-destructive/20 p-4 rounded-full mb-4">
          <AlertCircle className="text-destructive" size={48} />
        </div>
        <h1 className="text-2xl font-bold text-destructive">
          Invalid or Expired Receipt
        </h1>
        <p className="text-destructive/80 mt-2">
          This document could not be verified in our system.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 py-10 px-4">
      <div className="max-w-xl mx-auto bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
        {/* Header Branding */}
        <div className="bg-primary p-6 text-center">
          <div className="flex justify-center mb-2">
            <Logo size="md" variant="inverted" />
          </div>
        </div>

        {/* Verification Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900 p-4 flex items-center justify-center gap-2">
          <CheckCircle2
            className="text-green-600 dark:text-green-400"
            size={24}
          />
          <span className="font-bold text-green-800 dark:text-green-300">
            Officially Verified Document
          </span>
        </div>

        {/* Receipt Details Card */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-sm text-muted-foreground uppercase tracking-wider">
              Receipt Amount
            </h2>
            <h1 className="text-4xl font-extrabold text-foreground mt-2">
              ৳ {data.amount}
            </h1>
            <span className="inline-block bg-muted text-foreground px-3 py-1 rounded-full text-xs font-mono mt-3">
              {data.receiptNo}
            </span>
          </div>

          <div className="space-y-4 border-t border-border pt-6">
            <Row label="Received From" value={data.clientName} />
            <Row
              label="Date"
              value={new Date(data.date).toLocaleDateString("en-GB")}
            />
            <Row label="Payment Mode" value={data.paymentMode} />
            <Row label="Purpose" value={data.purpose} />
          </div>

          {/* Download PDF Button */}
          <div className="mt-10">
            <PDFDownloadLink
              document={<ReceiptPDF data={data} />}
              fileName={`Receipt_${data.receiptNo}.pdf`}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              {({ loading }) =>
                loading ? (
                  "Generating PDF..."
                ) : (
                  <>
                    {" "}
                    <Download size={20} /> Download Official PDF{" "}
                  </>
                )
              }
            </PDFDownloadLink>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Global Insurance Limited • Internal Verification Tool
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-medium text-foreground text-right">
        {value || "N/A"}
      </span>
    </div>
  );
}
