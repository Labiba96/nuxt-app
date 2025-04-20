export function useTableUtilities() {
  const printTable = (elementId: string) => {
    const content = document.getElementById(elementId)?.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");

    if (printWindow && content) {
      printWindow.document.write("<html><head><title>Print</title></head><body>");
      printWindow.document.write(content);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  const exportTable = (data: any[], headers: string[], filename = "table.csv") => {
    const csv = [headers, ...data.map((row) => row.map((value: any) => value ?? ""))]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    printTable,
    exportTable,
  };
}
