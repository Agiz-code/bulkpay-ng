import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import Papa from "papaparse";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { COLORS, FONT, RADIUS, SPACING } from "../../constants/theme";

export default function ValidateScreen() {
  const [fileName, setFileName] = useState("");
  const [validCount, setValidCount] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const pickAndValidate = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
      });
      if (!result.assets) return;

      const file = result.assets[0];
      setFileName(file.name);
      setLoading(true);

      const text = await fetch(file.uri).then((res) => res.text());

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as any[];
          let errorList: string[] = [];
          let valid = 0;
          let total = 0;

          data.forEach((row, index) => {
            if (
              !row.fullName ||
              !row.salary ||
              !row.bankAccount ||
              !row.bankCode
            ) {
              errorList.push(`Row ${index + 2}: Missing required fields`);
            } else {
              valid++;
              total += parseFloat(row.salary) || 0;
            }
          });

          setValidCount(valid);
          setTotalAmount(total);
          setErrors(errorList);
          setLoading(false);
        },
      });
    } catch (e) {
      Alert.alert("Error", "Failed to process CSV file");
      setLoading(false);
    }
  };

  const proceedToPayout = () => {
    if (validCount === 0) return;

    router.push({
      pathname: "/payroll/success",
      params: {
        reference: `BP-${Date.now()}`,
        amount: totalAmount,
        employeeCount: validCount,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Validate Payroll CSV</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={pickAndValidate}>
        <Text style={styles.uploadText}>
          {fileName ? `📄 ${fileName}` : "Tap to upload CSV file"}
        </Text>
      </TouchableOpacity>

      {errors.length > 0 && (
        <Card>
          <Text style={styles.errorTitle}>
            Validation Errors ({errors.length})
          </Text>
          {errors.map((err, i) => (
            <Text key={i} style={styles.errorText}>
              {err}
            </Text>
          ))}
        </Card>
      )}

      {validCount > 0 && (
        <Card>
          <Text style={styles.successText}>
            ✅ {validCount} employees validated successfully
          </Text>
          <Text style={styles.totalAmount}>
            Total Payout: ₦{totalAmount.toLocaleString()}
          </Text>

          <Button
            title="Confirm & Send Bulk Payout"
            onPress={proceedToPayout}
          />
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.accent,
    borderRadius: RADIUS.xl,
    padding: 60,
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  uploadText: { fontSize: 16, color: COLORS.accent, fontFamily: FONT.semibold },
  errorTitle: {
    color: COLORS.destructive,
    fontFamily: FONT.bold,
    marginBottom: 8,
  },
  errorText: { color: COLORS.destructive, fontSize: 13, marginVertical: 2 },
  successText: {
    fontSize: 18,
    fontFamily: FONT.semibold,
    color: COLORS.success,
    textAlign: "center",
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: FONT.bold,
    color: COLORS.payroll,
    textAlign: "center",
    marginVertical: SPACING.lg,
  },
});
