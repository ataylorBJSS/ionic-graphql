import { JournalProvider } from "./../../providers/journal/journal";
import { Examiner } from "./../../providers/journal/type";
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ObservableQuery } from "apollo-client";

import { Examiners as ExaminerQry } from "../../providers/journal/queries";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  examiners: Examiner[];

  constructor(private journal: JournalProvider) {}

  ngOnInit() {
    //this.examiners = this.journal.getAllExaminers();

    this.journal.client.then(client => {
      const observable: ObservableQuery<any> = client.watchQuery({
        query: ExaminerQry
      });

      observable.subscribe(({ data }) => {
        if (!data || !data.listExaminers) {
          return console.log("get examiners: no data");
        }
        this.examiners = data.listExaminers.examiners;
      });
    });
  }

  setTestResult(cId: number, result: boolean) {
    this.journal.setTestResult(cId, result);
  }
}
