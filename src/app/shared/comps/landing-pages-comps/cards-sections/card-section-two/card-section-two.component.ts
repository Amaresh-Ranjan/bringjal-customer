import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-section-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-section-two.component.html',
  styleUrl: './card-section-two.component.scss'
})
export class CardSectionTwoComponent {
  faqs = [
    {
      title: 'Excel Essentials: Get Started Right',
      content: 'Dive into Excel with confidence in this foundational workshop. Learn essential skills like navigation, formatting, and data entry to kickstart your Excel journey on the right foot.'
    },
    {
      title: 'Another FAQ Title',
      content: 'Content for another FAQ goes here.'
    },
    {
      title: 'What is Excel?',
      content: 'Excel is a spreadsheet application developed by Microsoft that allows users to organize, format, and calculate data using formulas and functions.'
    },
    {
      title: 'How do I create a new workbook in Excel?',
      content: 'To create a new workbook, open Excel and select "New" from the File menu, then choose "Blank workbook" or select a template.'
    },
    {
      title: 'How can I format cells in Excel?',
      content: 'To format cells, select the cells you want to format, right-click and choose "Format Cells," then select the desired formatting options like font, number, or alignment.'
    },
    {
      title: 'What are Excel formulas?',
      content: 'Formulas in Excel are expressions used to perform calculations or operations on data, starting with an equal sign (=), such as =SUM(A1:A10).'
    },
    {
      title: 'How do I use functions in Excel?',
      content: 'Functions are predefined formulas in Excel. You can use them by typing the function name followed by arguments in parentheses, like =AVERAGE(B1:B10).'
    },
    {
      title: 'What is conditional formatting?',
      content: 'Conditional formatting allows you to apply formatting to cells based on certain criteria or conditions, such as highlighting cells that meet specific rules.'
    },
    {
      title: 'How do I create a chart in Excel?',
      content: 'To create a chart, select the data you want to chart, go to the "Insert" tab, and choose the type of chart you wish to create from the Charts group.'
    },
    {
      title: 'What is a pivot table?',
      content: 'A pivot table is a powerful tool in Excel that allows you to summarize, analyze, and explore data in various ways by dragging and dropping fields into different areas.'
    },
    {
      title: 'How can I protect my Excel workbook?',
      content: 'To protect a workbook, go to the "Review" tab and select "Protect Workbook." You can set a password to prevent unauthorized changes.'
    },
    {
      title: 'What are named ranges?',
      content: 'Named ranges are a way to assign a name to a specific range of cells, making it easier to refer to them in formulas and functions.'
    },
    {
      title: 'How do I use data validation?',
      content: 'Data validation allows you to set rules for data entry in cells, such as restricting entries to a certain list or range of values. You can find it under the "Data" tab.'
    },
    {
      title: 'How can I merge cells?',
      content: 'To merge cells, select the cells you want to combine, go to the "Home" tab, and click "Merge & Center" or choose a different merge option from the dropdown.'
    },
    {
      title: 'What is a macro in Excel?',
      content: 'A macro is a set of instructions that automates repetitive tasks in Excel. You can record or write macros using VBA (Visual Basic for Applications).'
    },
    {
      title: 'How do I filter data in Excel?',
      content: 'To filter data, select the range you want to filter, go to the "Data" tab, and click "Filter." You can then use the drop-down arrows to select criteria for filtering.'
    },
    {
      title: 'How do I use VLOOKUP in Excel?',
      content: 'The VLOOKUP function searches for a value in the first column of a table and returns a value in the same row from a specified column. Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]).'
    },
    {
      title: 'How can I freeze panes in Excel?',
      content: 'To freeze panes, go to the "View" tab, click "Freeze Panes," and choose the option to freeze the top row, first column, or custom panes based on your selection.'
    },
    {
      title: 'What is a cell reference?',
      content: 'A cell reference is the identifier for a cell in Excel, such as A1 or B2, used to refer to the cell’s contents in formulas and functions.'
    },
    {
      title: 'How do I sort data in Excel?',
      content: 'To sort data, select the range you want to sort, go to the "Data" tab, and click "Sort." Choose the column and sorting order you prefer, then apply the sort.'
    },
    {
      title: 'What are Excel shortcuts?',
      content: 'Excel shortcuts are keyboard combinations that perform actions quickly, such as Ctrl+C for copy, Ctrl+V for paste, and Ctrl+Z for undo.'
    },
    {
      title: 'How do I add comments to cells?',
      content: 'To add a comment, right-click the cell, select "Insert Comment," and type your comment in the box that appears. Comments can be useful for providing additional information or notes.'
    }
  ];

  selectedFAQIndex: number | null = null;
  toggleFAQ(index: number) {
    if (this.selectedFAQIndex === index) {
      this.selectedFAQIndex = null;
    } else {
      this.selectedFAQIndex = index;
    }
  }
}
