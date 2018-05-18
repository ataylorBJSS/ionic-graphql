import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";

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
  client$: Observable<any>;
  examiners$: ObservableQuery<any>;

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

    this.client$ = fromPromise(this.client);
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
        optimisticResponse: {
          __typename: "Mutation",
          updateCandidate: {
            id: cId,
            __typename: "Candidate",
            pass
          }
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
