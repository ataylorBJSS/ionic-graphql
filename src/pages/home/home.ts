import { JournalProvider } from "./../../providers/journal/journal";
import { Examiner } from "./../../providers/journal/type";
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Examiners as ExaminerQry } from "../../providers/journal/queries";
import { onUpdateCandidate } from "./../../providers/journal/subscriptions";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  examiners: Examiner[];
  examiners$: Observable<any>;
  subscription: () => void;

  constructor(private journal: JournalProvider) {}

  ngOnInit() {
    this.journal.client$.subscribe(client => {
      const qryObservable = client.watchQuery({
        query: ExaminerQry,
        fetchPolicy: "cache-and-network"
      });

      qryObservable.subscribe(({ data }) => {
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
