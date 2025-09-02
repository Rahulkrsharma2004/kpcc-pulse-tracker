import { Button } from '@/components/ui/button';
import { RefreshCw, Calendar, Download, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DashboardHeader() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    to: new Date()
  });
  const [isKannada, setIsKannada] = useState(false);

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Sample data - in real app, this would come from your data source
    const sentimentData = [
      { Date: '2024-01-01', Positive: 45, Negative: 25, Neutral: 30 },
      { Date: '2024-01-02', Positive: 50, Negative: 20, Neutral: 30 },
      { Date: '2024-01-03', Positive: 40, Negative: 35, Neutral: 25 },
    ];
    
    const mentionsData = [
      { Source: 'BJP Leaders', Mentions: 150, 'Negative %': 70 },
      { Source: 'Journalists', Mentions: 89, 'Negative %': 45 },
      { Source: 'Influencers', Mentions: 234, 'Negative %': 60 },
      { Source: 'Newspapers', Mentions: 67, 'Negative %': 55 },
    ];

    const ws1 = XLSX.utils.json_to_sheet(sentimentData);
    const ws2 = XLSX.utils.json_to_sheet(mentionsData);
    
    XLSX.utils.book_append_sheet(wb, ws1, 'Sentiment Trends');
    XLSX.utils.book_append_sheet(wb, ws2, 'Mentions by Source');
    
    XLSX.writeFile(wb, 'KPCC_Media_Dashboard.xlsx');
  };

  const handleExportPDF = async () => {
    const dashboard = document.querySelector('.dashboard-content');
    if (dashboard) {
      const canvas = await html2canvas(dashboard as HTMLElement);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('KPCC_Media_Dashboard.pdf');
    }
  };

  return (
    <div className="bg-dashboard-header border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isKannada ? 'ಕೆಪಿಸಿಸಿ ಮಾಧ್ಯಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' : 'KPCC Media Dashboard'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isKannada ? 'ಮಾಧ್ಯಮ ಮಾನಿಟರಿಂಗ್ ಮತ್ತು ಭಾವನಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ' : 'Media monitoring and sentiment analysis'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="language-toggle" className="text-sm font-medium">
              {isKannada ? 'ಇಂ' : 'EN'}
            </Label>
            <Switch
              id="language-toggle"
              checked={isKannada}
              onCheckedChange={setIsKannada}
            />
            <Label htmlFor="language-toggle" className="text-sm font-medium">
              {isKannada ? 'ಕನ್ನಡ' : 'ಕನ್ನಡ'}
            </Label>
          </div>
          
          {/* Export Buttons */}
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <FileText className="h-4 w-4 mr-2" />
            {isKannada ? 'ಎಕ್ಸೆಲ್' : 'Excel'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            {isKannada ? 'ಪಿಡಿಎಫ್' : 'PDF'}
          </Button>
          
          <DateRangePicker 
            date={dateRange} 
            onDateChange={setDateRange}
          />
          <Select defaultValue="weekly">
            <SelectTrigger className="w-32">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">{isKannada ? 'ದೈನಂದಿನ' : 'Daily'}</SelectItem>
              <SelectItem value="weekly">{isKannada ? 'ಸಾಪ್ತಾಹಿಕ' : 'Weekly'}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            {isKannada ? 'ರಿಫ್ರೆಶ್' : 'Refresh'}
          </Button>
        </div>
      </div>
    </div>
  );
}