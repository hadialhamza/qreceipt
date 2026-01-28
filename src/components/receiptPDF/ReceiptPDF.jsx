import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingHorizontal: 35,
    paddingBottom: 25,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#000",
  },

  headerImage: {
    width: "100%",
    height: 65, // slimmer like original
    marginBottom: 4,
  },

  address: {
    textAlign: "center",
    fontSize: 8,
    lineHeight: 1.2,
    marginBottom: 8,
  },

  binRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  titleBlock: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 12, fontWeight: "bold" },
  mushak: { fontSize: 8, marginTop: 2 },

  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 12,
  },
  infoLeft: { width: "65%" },
  infoRight: { width: "30%", alignItems: "flex-end" },
  infoRow: { flexDirection: "row", marginBottom: 2 },
  label: { width: 105 },

  line: {
    flexDirection: "row",
    marginBottom: 7,
    alignItems: "flex-end",
  },
  lineLabel: { marginRight: 5, fontWeight: "bold" },
  lineValue: {
    flex: 1,
    borderBottomWidth: 0.7,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },

  splitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  table: {
    width: 250,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    height: 20,
    alignItems: "center",
  },
  lastRow: {
    flexDirection: "row",
    height: 20,
    alignItems: "center",
    backgroundColor: "#e6e6e6",
  },
  col1: { width: "35%", borderRightWidth: 1, paddingLeft: 5 },
  col2: { width: "20%", borderRightWidth: 1, textAlign: "center" },
  col3: { width: "45%", textAlign: "right", paddingRight: 5 },

  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  grayBar: {
    backgroundColor: "#d9d9d9",
    width: "100%",
    padding: 4,
    marginTop: 4,
    alignItems: "center",
  },
  note: {
    marginTop: 6,
    fontSize: 8,
    color: "red",
    alignSelf: "flex-start",
  },

  qr: {
    position: "absolute",
    top: 105,
    right: 35,
    width: 55,
    height: 55,
  },
});

export const ReceiptPDF = ({ data, qrCodeUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src="/global-logo.png" style={styles.headerImage} />

      <Text style={styles.address}>
        Head Office: Al-Razi Complex (12th Floor), 166-167, Shaheed Syed Nazrul
        Islam Sarani,{"\n"}
        Purana Paltan, Dhaka- 1000. Tel: PABX: 55111601-3, 9570147, 9570450 Fax:
        88-02-9556103,{"\n"}
        email: globalho2000@gmail.com web: www.globalinsurancebd.com
      </Text>

      <View style={styles.binRow}>
        <Text>BIN : 002085888-0208</Text>
      </View>

      {qrCodeUrl && <Image src={qrCodeUrl} style={styles.qr} />}

      <View style={styles.titleBlock}>
        <Text style={styles.title}>MONEY RECEIPT</Text>
        <Text style={styles.mushak}>MUSHAK : 6.3</Text>
      </View>

      <View style={styles.topInfo}>
        <View style={styles.infoLeft}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Issuing Office</Text>
            <Text>: Rangpur Branch</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Money Receipt No.</Text>
            <Text>: {data.receiptNo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Class of Insurance</Text>
            <Text>: Fire</Text>
          </View>
        </View>
        <View style={styles.infoRight}>
          <Text>Date : {new Date(data.date).toLocaleDateString("en-GB")}</Text>
        </View>
      </View>

      <View style={styles.line}>
        <Text style={styles.lineLabel}>Received with thanks from</Text>
        <Text style={styles.lineValue}>{data.clientName}</Text>
      </View>

      <View style={styles.line}>
        <Text style={styles.lineLabel}>The sum of</Text>
        <Text style={styles.lineValue}>
          Tk. {data.amount} (One Lakh Two Thousand Six Hundred Ninety Five taka)
        </Text>
      </View>

      <View style={styles.splitRow}>
        <View style={{ flexDirection: "row", width: "60%" }}>
          <Text style={styles.lineLabel}>Mode of Payment</Text>
          <Text style={styles.lineValue}>
            {data.paymentMode}; {data.chequeNo || "2530860"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "35%" }}>
          <Text style={styles.lineLabel}>Dated</Text>
          <Text style={styles.lineValue}>
            {new Date(data.date).toLocaleDateString("en-GB")}
          </Text>
        </View>
      </View>

      <View style={styles.line}>
        <Text style={styles.lineLabel}>Drawn on</Text>
        <Text style={styles.lineValue}>
          {data.bankName || "Mercantile Bank PLC"}
        </Text>
      </View>

      <View style={styles.line}>
        <Text style={styles.lineLabel}>Issued against</Text>
        <Text style={styles.lineValue}>{data.policyNo}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.col1}>Premium</Text>
          <Text style={styles.col2}>BDT</Text>
          <Text style={styles.col3}>{(data.amount * 0.87).toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.col1}>VAT</Text>
          <Text style={styles.col2}>BDT</Text>
          <Text style={styles.col3}>{(data.amount * 0.13).toFixed(2)}</Text>
        </View>
        <View style={styles.lastRow}>
          <Text style={styles.col1}>Total</Text>
          <Text style={styles.col2}>BDT</Text>
          <Text style={styles.col3}>{data.amount}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={{ fontSize: 9, color: "#555" }}>
          This RECEIPT is computer generated, authorized signature is not
          required.
        </Text>
        <View style={styles.grayBar}>
          <Text style={{ fontSize: 9 }}>
            Receipt valid subject to encashment of cheque/P.O./D.D.
          </Text>
        </View>
        <Text style={styles.note}>
          * Note: If have any complain about Insurance, call 16130.
        </Text>
      </View>
    </Page>
  </Document>
);
