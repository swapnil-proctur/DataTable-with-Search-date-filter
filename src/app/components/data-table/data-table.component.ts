import { Component, OnInit } from '@angular/core';
// import data from './table-data.json';
import * as data from './table-data.json';
import * as moment from 'moment';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  // Global
  searchInput: any;
  headers = [
      {headerName: "Username"},
      {headerName: "Mobile"},
      {headerName: "2-Factor Status"},
      {headerName: "Maker"},
      {headerName: "Approval Status"},
      {headerName: "Comments"},
      {headerName: "User Status"},
      {headerName: "Full Name"},
      {headerName: "Created At"},
      {headerName: "Modified At"},
      {headerName: "Chekers Comments"},
      {headerName: "Action Type"},
  ];
  tableData : any = (data as any).default;
  tempValues = [];
  dataValues = [];

  // Date Filter
  fromDate: any;
  toDate: any;

  // FOR PAGINATION
  pageIndex: number = 1;
  displayBatchSize: number = 25;
  totalCount: number = 0;
  sizeArr: any[] = [25, 50, 100, 150, 200, 500];
  startindex: number = 0;


  constructor() { }

  ngOnInit(): void {
    this.totalCount = this.tableData.length;
    this.getRecords(this.startindex);
  }

  getRecords(index){
    this.dataValues = this.tableData.slice(index, index + this.displayBatchSize);
    this.tempValues = this.dataValues;
  }

  searchDatabase(){
    // This Seach only work on Current 25 records
    this.dataValues = this.tempValues;
    if (!!this.searchInput) {
      let searchData = this.tempValues.filter(v => v.mobile.toString().includes(this.searchInput));
      this.dataValues = searchData;
      this.totalCount = this.dataValues.length;
    }
    else{
      this.totalCount = this.tableData.length;
    }
  }

  filterUsingDate(){
    let fromDate = new Date(this.fromDate).getTime();
    let toDate = new Date(this.toDate).getTime();
    let searchData = this.tempValues.filter(v => v.dateTimeCreated >= fromDate/1000 &&  v.dateTimeModified <= toDate/1000);
    this.dataValues = searchData;
    this.tempValues = this.dataValues
  }



  /*** pagination functions */
  /* Fetch next set of data from server and update table */
  fetchNext() {
    this.pageIndex++;
    this.fectchTableDataByPage(this.pageIndex);
  }

  /* Fetch previous set of data from server and update table */
  fetchPrevious() {
    this.pageIndex--;
    this.fectchTableDataByPage(this.pageIndex);
  }

  /* Fetch table data by page index */
  fectchTableDataByPage(index) {
    this.pageIndex = index;
    let startindex = this.displayBatchSize * (index - 1);
    this.getRecords(startindex);
  }

  /* Fetches Data as per the user selected batch size */
  updateTableBatchSize(num) {
    this.pageIndex = 1;
    this.displayBatchSize = parseInt(num);
    this.getRecords(this.startindex);
  }

}

//  Used this function to create 500 records

// let arr = [];
// for(let i = 1; i < 500; i++){
//   let id = 2000 + i;
//   let username = "SKC0100"+i;
//   let userId = 1400 + i;
//   let mb = 9111119265 + i;
//   let created = Math.floor(Math.random() * (1425168000 - 1298937600)) + 1298937600;
//   let modified = Math.floor(Math.random() * (1580515200 - 1427846400)) + 1427846400;
//   let obj = {
//     "id": id,
//     "username":username,
//     "mobile": mb,
//     "twoFactorStatus":"DISABLED",
//     "userId": userId,
//     "maker":"AZC0055000",
//     "approvalStatus":"APPROVED_BY_CHECKER",
//     "comments":"disabled",
//     "userStatus":"ACTIVE",
//     "fullName":"SKC0106163 SKC0106163",
//     "dateTimeCreated": created,
//     "dateTimeModified":modified,
//     "actionType":"UPDATE"
//   }
//   arr.push(obj)
// }
// console.log(arr)
