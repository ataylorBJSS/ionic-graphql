import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

// import { Query } from "./type";
import { updateCandidate } from "./mutations";
import { Examiners as ExaminerQry } from "./queries";

import { default as AWSAppSyncClient } from "aws-appsync";

import AWSConfig from "../../app/aws-config";

const {
  graphqlEndpoint: url,
  region,
  authenticationType: authType,
  apiKey
} = AWSConfig;

@Injectable()
export class JournalProvider {
  client: any;

  constructor() {
    // create client
    this.client = new AWSAppSyncClient({
      url,
      region,
      auth: {
        type: authType,
        apiKey
      }
    });
  }

  /**
   * Get Observable for all Examiners
   */
  getAllExaminers(): Observable<any> {
    return Observable.fromPromise(this.client.hydrated()).mergeMap(client => {
      return client
        .query({ query: ExaminerQry })
        .then(result => {
          console.log("data", result.data);

          return result.data.listExaminers.examiners;
        })
        .catch(err => console.log("err", err));
    });
  }

  /**
   * Set result for a given test
   * @param Object containing ids for reference (might be a better way to do this!)
   * @param testResult Boolean
   */
  setTestResult({ eId, sId, cId }, pass) {
    this.client.hydrated().then(client => {
      client.mutate({
        mutation: updateCandidate,
        variables: {
          id: cId,
          pass
        }
      });
    });
  }
}
