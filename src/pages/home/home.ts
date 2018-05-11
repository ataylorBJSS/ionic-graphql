import { JournalProvider } from "./../../providers/journal/journal";
import { Examiner } from "./../../app/type";
import { Component } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  examiners: Observable<Examiner[]>;
  constructor(private journal: JournalProvider) {}

  ngOnInit() {
    this.examiners = this.journal.getAllExaminers();
  }

  setTestResult(eId, slot, result: boolean) {
    const {
      id: sId,
      candidate: { id: cId }
    } = slot;
    this.journal.setTestResult({ eId, sId, cId }, result);
  }
}
