import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";

import { Query } from "./type";
import { ResultMutation as ResultMut } from "./mutations";
import { Examiners as ExaminerQry } from "./queries";

@Injectable()
export class JournalProvider {
  constructor(private apollo: Apollo) {}

  /**
   * Get Observable for all Examiners
   */
  getAllExaminers() {
    return this.apollo
      .watchQuery<Query>({ query: ExaminerQry })
      .valueChanges.pipe(map(result => result.data.examiners));
  }

  /**
   * Set result for a given test
   * @param Object containing ids for reference (might be a better way to do this!)
   * @param testResult Boolean
   */
  setTestResult({ eId, sId, cId }, testResult) {
    this.apollo
      .mutate({
        mutation: ResultMut,
        variables: {
          cId,
          testResult
        },
        update: (store, { data: { setResult: result } }) => {
          this.updateStore(store, result, sId, eId);
        }
      })
      .subscribe(
        ({ data }) => {
          console.log("got data", data);
        },
        error => {
          console.log("there was an error sending the query", error);
        }
      );
  }

  /**
   * Update cache store with new updates
   * this fires off a new examiner query that updates the UI with results
   * @param store   cache store
   * @param updates candidate test updates
   * @param sId     slot Id
   * @param eId     examiner Id
   */
  updateStore(store, updates, sId, eId) {
    const data = store.readQuery({
      query: ExaminerQry
    });

    const candidate = data.examiners
      .find(examiner => examiner.id === eId)
      .slots.find(slot => slot.id === sId).candidate;

    candidate.pass = updates.pass;

    store.writeQuery({ query: ExaminerQry, data });
  }
}
