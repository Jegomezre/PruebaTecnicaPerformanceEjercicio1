import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const users = new SharedArray('login_users', function () {
  const lines = open('../data/users.csv').trim().split('\n').slice(1);
  return lines.map((line) => {
    const [user, passwd] = line.trim().split(',');
    return {
      username: user,
      password: passwd,
    };
  });
});

export const options = {
  scenarios: {
    login_load: {
      executor: 'constant-arrival-rate',
      rate: 22,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 30,
      maxVUs: 60,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.03'],
  },
};

export default function () {
  const credentials = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    username: credentials.username,
    password: credentials.password,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: '60s',
  };

  const response = http.post('https://fakestoreapi.com/auth/login', payload, params);

  check(response, {
    'status es 200 o 201': (r) => r.status === 200 || r.status === 201,
    'respuesta incluye token': (r) => r.json('token') !== undefined,
    'tiempo de respuesta menor a 1.5s': (r) => r.timings.duration <= 1500,
  });
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    'reports/console-output.txt': textSummary(data, { indent: ' ', enableColors: false }),
    'reports/summary.json': JSON.stringify(data, null, 2),
    'reports/summary.html': htmlReport(data),
  };
}