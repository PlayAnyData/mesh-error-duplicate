import http from 'http';

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write('{"data": {"myQuery": {"id": 1}}}')
    res.end()
    console.log('answered');
  }).listen(8084)