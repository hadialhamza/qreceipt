import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 12 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
    borderColor: "#e5e7eb",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#2563EB" },
  row: { flexDirection: "row", marginBottom: 10 },
  label: { width: 100, color: "#6b7280", fontSize: 10 },
  value: { flex: 1, fontSize: 12, fontWeight: "medium" },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 10,
    borderTop: 1,
    paddingTop: 10,
    borderColor: "#e5e7eb",
  },
  badge: {
    color: "#059669",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "#d1fae5",
    padding: 5,
    borderRadius: 5,
  },
});

export const ReceiptPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>MONEY RECEIPT</Text>
          <Text style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>
            Global Insurance Ltd.
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 10, color: "#6b7280" }}>Receipt No:</Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {data.receiptNo}
          </Text>
        </View>
      </View>

      {/* Body Content */}
      <View style={{ marginTop: 20 }}>
        <View style={styles.row}>
          <Text style={styles.label}>Received From:</Text>
          <Text style={styles.value}>{data.clientName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={[styles.value, { fontSize: 16, fontWeight: "bold" }]}>
            {data.amount} BDT
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment Mode:</Text>
          <Text style={styles.value}>{data.paymentMode}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.value}>{data.purpose || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(data.date).toLocaleDateString("en-GB")}
          </Text>
        </View>
      </View>

      {/* Verified Badge inside PDF */}
      <View style={{ marginTop: 30 }}>
        <Text style={styles.badge}>✅ Digitally Verified via QReceipt</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          This is a computer-generated document. No signature is required.
        </Text>
        <Text>Powered by QReceipt System</Text>
      </View>
    </Page>
  </Document>
);
