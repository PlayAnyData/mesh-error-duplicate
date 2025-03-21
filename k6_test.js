import http from 'k6/http';
import { check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js';


const url = __ENV.API ? __ENV.API : 'http://localhost:8080/graphql';

const query = `
query test {
    myQuery {
      id
    }
}
`;

export const options = {
  insecureSkipTLSVerify: true,
  scenarios: {
    batched: {
      executor: 'constant-vus',
      exec: 'batched',
      vus: 30,
      duration: '40m',
    },
    // standard: {
    //   executor: 'constant-vus',
    //   exec: 'standard',
    //   vus: 3,
    //   startTime: '2m',
    //   duration: '2m',
    // },
    // batched2: {
    //   executor: 'constant-vus',
    //   exec: 'batched',
    //   vus: 10,
    //   startTime: '4m',
    //   duration: '2m',
    // },
    // standard2: {
    //   executor: 'constant-vus',
    //   exec: 'standard',
    //   vus: 10,
    //   startTime: '6m',
    //   duration: '2m',
    // },
  },
};


export function batched() {
  const result = http.post(
    url,
    JSON.stringify({
      query: query,
      operationName: 'test',
    }),
    {
      headers: {
        'content-type': 'application/json',
        'x-transmission-id': uuidv4()
      },
    }
  );
}
