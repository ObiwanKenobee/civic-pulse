import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface ExportPanelProps {
  lastUpdate: Date;
}

export const ExportPanel = ({ lastUpdate }: ExportPanelProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      const dashboardElement = document.querySelector('.max-w-\\[1800px\\]');
      if (!dashboardElement) {
        throw new Error('Dashboard element not found');
      }

      const canvas = await html2canvas(dashboardElement as HTMLElement, {
        scale: 1,
        useCORS: true,
        logging: false,
        backgroundColor: '#0a0a0f',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`atlas-sentiment-report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success('Report exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export report');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      lastDataUpdate: lastUpdate.toISOString(),
      regions: [
        { id: 'nairobi', name: 'Nairobi', sentiment: 'frustration', stressIndex: 0.72 },
        { id: 'mombasa', name: 'Mombasa', sentiment: 'dissatisfaction', stressIndex: 0.58 },
        { id: 'kisumu', name: 'Kisumu', sentiment: 'dissatisfaction', stressIndex: 0.55 },
        { id: 'nakuru', name: 'Nakuru', sentiment: 'stable', stressIndex: 0.49 },
        { id: 'eldoret', name: 'Eldoret', sentiment: 'optimistic', stressIndex: 0.38 },
        { id: 'turkana', name: 'Turkana', sentiment: 'frustration', stressIndex: 0.63 },
        { id: 'garissa', name: 'Garissa', sentiment: 'dissatisfaction', stressIndex: 0.61 },
        { id: 'machakos', name: 'Machakos', sentiment: 'stable', stressIndex: 0.44 },
      ],
      trustMetrics: [
        { institution: 'Healthcare System', percentage: 68 },
        { institution: 'County Government', percentage: 52 },
        { institution: 'Police', percentage: 34 },
        { institution: 'Judiciary', percentage: 61 },
        { institution: 'National Government', percentage: 48 },
      ],
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas-sentiment-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Data exported as JSON');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Export Report</h4>
          <p className="text-xs text-muted-foreground">
            Download current dashboard state
          </p>
          <div className="space-y-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={exportToPDF}
              disabled={isExporting}
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              Export as PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={exportToJSON}
            >
              <FileText className="w-4 h-4" />
              Export as JSON
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
