import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

// import { Query } from "./type";
import { updateCandidate } from "./mutations";
import { Examiners as ExaminerQry } from "./queries";
import { onUpdateCandidate } from "./subscriptions";

import { default as AWSAppSyncClient } from "aws-appsync";

import { ObservableQuery } from "apollo-client";

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
  observedQuery: ObservableQuery<any>;

  constructor() {
    // create client
    const newClient = new AWSAppSyncClient({
      url,
      region,
      auth: {
        type: authType,
        apiKey
      }
    });

    this.client = newClient.hydrated();
  }

  /**
   * Get Observable for all Examiners
   */
  getAllExaminers() {
    return Observable.fromPromise(this.client).mergeMap(client => {
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
  setTestResult(cId, pass) {
    this.client.then(client => {
      client.mutate({
        mutation: updateCandidate,
        variables: {
          id: cId,
          pass
        },
        refetchQueries: [
          {
            query: ExaminerQry
          }
        ]
      });
    });
  }
}
