import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { BehaviorSubject, Observable, of } from "rxjs";
import { throttle, throttleTime, mergeMap, scan, map } from "rxjs/operators";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { getRandomString } from "selenium-webdriver/safari";
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  properties: any[] = [];
  filteredData: any[] = [];

  pageSize: number = 20;
  scrollLabel = "Scroll to bottom";
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  cdk: CdkVirtualScrollViewport;

  constructor(public dialog: MatDialog,
    private userService: UserService,
    private authService: AuthenticationService) {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      function generateProperties(len = 10000) {
        return {
          id: generateRandomNumbers(len),
          name: generateString(20),
          address1: generateString(30),
          address2: generateString(30),
          price: generatePriceValue(),
          type: generatePropertyType()
        }
      }

      function generateRandomNumbers(len = 100) {
        return Math.ceil(Math.random() * len);
      }

      function generatePriceValue() {
        return Math.floor(3000000 + Math.random() * 5000000);
      }

      function generatePropertyType() {
        let types: any[] = ['2BHK', '1BHK', '3BDIV', '4BDIV', '6BDIV'];
        return types[Math.ceil(Math.random() * types.length)];
      }

      function generateString(len) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
      }

      for (let i = 0; i < 10000; i++) {
        this.properties.push(generateProperties());
      }
      this.filteredData = this.properties;
    });
  }

  ngOnInit() {
  }

  onScrollTClick() {
    if (this.scrollLabel === "Scroll to bottom") {
      this.scrollLabel = "Scroll to top";
      this.cdk.scrollToIndex(this.properties.length - 1);
    } else {
      this.scrollLabel = "Scroll to bottom";
      this.cdk.scrollToIndex(0);
    }
  }

  nextBatch(event, offset) {
    console.log(offset);
  }

  searchText(event) {
    console.log(event.target.value);
    const searchText = event.target.value;
    this.filteredData = this.properties.filter(
      ele =>
        ele.name.toLowerCase().includes(searchText.toLowerCase()) ||
        ele.id.toLowerCase().includes(searchText.toLowerCase()) ||
        ele.address1.toLowerCase().includes(searchText.toLowerCase()) ||
        ele.address2.toLowerCase().includes(searchText.toLowerCase()) ||
        ele.price.toLowerCase().includes(searchText.toLowerCase()) ||
        ele.type.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "dialog-overview-dialog",
  templateUrl: "dialog-overview-dialog.html"
})
export class DialogOverviewDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
